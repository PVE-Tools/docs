---
title: 核显虚拟化 SR-IOV 与 GVT-g
description: 比较 Intel 核显 SR-IOV 与 GVT-g 的适用范围，整理 PVE Tools Pro 的虚拟核显配置、自检、排障和回滚建议。
---

# 核显虚拟化：SR-IOV 还是 GVT-g

一个核显同时喂给多个虚拟机——OpenWrt 拿去做硬解，Windows 拿去当日常桌面——这就是核显虚拟化要解决的事。相比整块直通，它性能更稳定、资源分配更可控，长期维护也更省心。

选哪条路线，看你的 CPU 代际，没有第二个判断依据：

| CPU 代际 | 走哪条路 | 关键取舍 |
| :--- | :--- | :--- |
| 6 ~ 10 代 | **GVT-g** | 成熟稳定，支持 2D/3D 加速，社区踩坑记录多；但资源分配比较死，且 10 代封顶 |
| 11 代及以后 | **SR-IOV** | 性能损耗极低，最多切 7 个 VF；但配置复杂，要装 DKMS 驱动 |

::: warning SR-IOV 是一套需要长期维护的驱动栈
它的"稳定"建立在内核版本、headers、DKMS 驱动、kernel cmdline 参数、VF 自动生成机制这五项长期一致的前提上。别把它当成配一次就永久生效的东西——任何一项变了，虚拟核显都可能整体消失。
:::

还有一点要先说明：**虚拟出来的核显没有物理输出接口**，插显示器是没有画面的。正常用法是 RDP、Parsec 或其他远程桌面，这不是配置失败。

## 脚本做了什么

**11 代及以上（SR-IOV）**，脚本会：

1. 装 `i915-sriov-dkms` 驱动
2. 改 GRUB 引导参数，加上 `i915.enable_guc=3` 和 `i915.max_vfs=7`
3. 配 `sysfs` 规则，让虚拟核显开机自动生成

**6 ~ 10 代（GVT-g）**，脚本会：

1. 开启 IOMMU 和内核模块 `kvmgt`、`vfio-mdev`
2. 引导你到 PVE 网页端"硬件 → 添加 → PCI 设备"里手动选 MDEV 类型

## 配完怎么验证

先做基础检查：

```bash
# 设备和它绑定的驱动
lspci -nnk | grep -A3 -E "VGA|Display"

# 驱动日志（i915/xe）
dmesg | grep -E "i915|xe" -n | tail -n 120
```

SR-IOV 还要单独确认 PF / VF 状态。把 `0000:00:02.0` 换成你实际的核显 BDF：

```bash
# PF 有没有暴露 SR-IOV 能力
ls -la /sys/bus/pci/devices/0000:00:02.0/ | grep sriov
cat /sys/bus/pci/devices/0000:00:02.0/sriov_totalvfs 2>/dev/null
cat /sys/bus/pci/devices/0000:00:02.0/sriov_numvfs 2>/dev/null

# VF 有没有生成（正常会多出若干个 Display controller）
lspci | grep -E "VGA|Display"
```

## 排障

::: warning 升级内核前先想好
SR-IOV 死死依赖内核头文件。**升级 PVE 内核之后必须重跑脚本或重新编译 DKMS 驱动，否则虚拟核显会全部消失。**
:::

另外注意显存：虚拟核显要占一部分系统内存当显存，宿主机内存不够会直接影响其他 VM。

| 现象 | 常见原因 | 先查什么 | 怎么处理 |
| :--- | :--- | :--- | :--- |
| 内核升级后 **VF 全消失** | DKMS 没重编译 / headers 不匹配 / 参数丢了 | `dkms status`、`uname -r`、对应 headers 在不在 | 先让 DKMS 和目标内核对上；实在不行回退到验证过的内核版本 |
| `sriov_numvfs` 设置后卡死 | 驱动或固件组合有问题；参数不完整 | `dmesg` 里有没有 hang；cmdline 参数对不对 | 降低 VF 数量，校正参数。先跑通，别一上来就切满 7 个 |
| VF 生成了但 Guest 里用不了 | Guest 驱动不匹配、没装，或被错误驱动绑定 | Guest 内 `lspci -nnk` | 先确认传进去的是 VF 不是 PF，再按 Guest 系统装对应驱动 |
| PF 直通后全局崩溃 | 把 PF 整个丢进了 VM，牵连所有 VF | VM 配置里 hostpci 指向哪个设备 | 原则只有一条：**只给 VM 传 VF，永远别传 PF**，尤其在 VF 已生成的系统上 |

## 回滚

**SR-IOV 恢复成宿主机单核显：**

1. `sriov_numvfs` 设回 `0`，停止生成 VF
2. 移除 kernel cmdline 里的 SR-IOV 相关参数（`i915.max_vfs`、`xe.max_vfs`、驱动黑名单切换项）
3. 装过 DKMS 驱动包的，按它自己的方式卸载，然后重建 initramfs，重启验证

**GVT-g 回滚：**

1. 移除 VM 里的 mdev 配置
2. 停用相关模块加载项
3. 重启后确认宿主机 iGPU 正常工作

## 参考

- i915 SR-IOV DKMS 项目说明（内核适配范围、参数、i915/xe 切换、VF 生成方式）：<https://github.com/strongtz/i915-sriov-dkms>

配好之后，一块核显能同时供几台虚拟机使用，这大概是 PVE 上性价比最高的一项折腾。
