---
title: PVE 8 升级 PVE 9 全攻略
description: 查看 Proxmox VE 8 跨版本升级到 PVE 9 的检查项、备份策略、软件源调整、升级步骤、回滚与验证建议。
---

# PVE 8 升级到 PVE 9

PVE 9.0 基于 Debian 13（Trixie）构建，性能和特性都有提升。但跨大版本升级是系统级操作，衡量它稳不稳只有三条标准：**过程可控、失败可回退、结果可验证**。

这篇把升级前自检、两条升级路线、常见翻车点和回滚方案都过一遍。

## PVE 9 变了什么

核心组件全部跟着 Debian 13 升了一轮（具体版本号随官方发布可能微调）：

| 组件 | 版本 |
| :--- | :--- |
| 存储系统 | ZFS 2.3.3 |
| 虚拟化引擎 | QEMU 10.0.2 |
| 容器管理 | LXC 6.0.4 |
| 分布式存储 | Ceph Squid 19.2.3 |

值得关注的新特性：

- **快照**：厚置备 LVM 共享存储（含 iSCSI / 光纤通道 SAN）上的虚拟机现在也能打快照了。
- **SDN Fabrics**：简化弹性拓扑的搭建，支持 OSPF 动态路由。
- **HA 资源亲和性规则**：可以精细控制工作负载分布在哪些节点。
- **移动端管理界面**：用 Rust 框架重写，操作明显跟手。

## 升级前必须做的三件事

::: tip 把不可控变量降到最低
控制台入口、备份、检查项——这三样在动手前就要落实。**备份务必自己也留一份。** 脚本会自动备份配置，但手里攥一份"救命钱"是基本素养。
:::

**一、跑完自检。** 动任何东西之前先确认环境是健康的：

```bash
# 当前版本与包信息
pveversion -v

# 官方升级检查器（full 至少跑一次，重点看有没有 FAIL）
pve8to9 --full

# 有没有被锁定的包（hold 会卡住升级）
apt-mark showhold

# 磁盘空间（/boot 和根分区不足是最常见的翻车点）
df -h
```

**二、备份核心数据。** PVE 的存储信息、虚拟机信息、集群设置全都在 `/var/lib/pve-cluster/` 里：

```bash
# 核心数据库
cp -r /var/lib/pve-cluster /path/to/your/backup/

# 整个 /etc（系统配置）
tar -czvf pve8_etc_backup_$(date +%Y%m%d).tar.gz /etc
```

**三、想好停机策略。** 单节点要确保有本地显示器或 iDRAC/IPMI，防止网络一断就彻底失联。集群和 HA 环境必须逐节点升级，提前把工作负载迁走或停掉。

## 两条路线，选一条

**在线升级（in-place）** 适合单节点、历史改动少、第三方 DKMS 和驱动不多的环境。风险集中在第三方驱动、历史遗留源、bootloader 相关包上——这几样都可能让升级中途卡死。

**重装还原** 适合历史配置漂移大、改动多的环境，或者你就是想让系统回到干净可维护的状态。思路是：装 PVE 9 → 还原配置、存储、备份 → 业务迁回。

一句经验：**当在线升级链路里出现了你控制不了的变量，重装加还原配置往往才是成本最低、结果最可预期的那条路。**

## 路线 A：在线升级

脚本已经把这套流程自动化了。下面是它背后做的事，方便你知道每一步在改什么。

**环境检查与微码安装。** 脚本先把系统升到 PVE 8.4.8+，再跑官方 `pve8to9`。出现 **WARN** 一般可以继续，只要没有红色 **FAIL**。之后自动识别 CPU 类型，装 `intel-microcode` 或 `amd64-microcode`。

**引导配置。** UEFI 启动的机器，脚本会执行这条命令防止引导丢失，顺带解决 systemd-boot 相关问题：

```bash
echo 'grub-efi-amd64 grub2/force_efi_extra_removable boolean true' | debconf-set-selections -v -u
```

**换 Trixie 源。** 把 `/etc/apt/sources.list` 里的 `bookworm` 换成 `trixie`，同时生成 PVE 9 标准的 DEB822 格式源文件：`/etc/apt/sources.list.d/proxmox.sources` 和 `/etc/apt/sources.list.d/ceph.sources`。

**执行升级。** 用 `DEBIAN_FRONTEND=noninteractive` 跑 `apt dist-upgrade`。中途弹出一大串文本提示时按 `q` 退出即可；配置文件冲突默认保留旧版（`force-confold`），保证系统服务不中断。

## 路线 B：重装还原

在线升级翻车了，或者你追求一个干净的系统，走这条：

1. **备份**：按上面的方法把 `config.db` 备出来。
2. **重装**：直接装最新的 PVE 9.0 ISO。
3. **还原**：装完之后**主机名必须和原系统一致**，然后把文件拷回去。

```bash
cp config.db /var/lib/pve-cluster/
cp config.db-shm /var/lib/pve-cluster/
cp config.db-wal /var/lib/pve-cluster/
reboot
```

重启之后，所有虚拟机和配置都会原样回来。第一次这么干的人多半会觉得有点神奇。

## 升级后检查清单

不管走的哪条路线，都逐条跑一遍：

```bash
# 版本确认
pveversion -v

# 网络（重点看接口命名和桥接）
ip a
cat /etc/network/interfaces

# 存储
pvesm status
cat /etc/pve/storage.cfg

# 内核与引导
uname -r
```

::: tip
升级完记得跑一次脚本里的"一键优化"，重新适配 PVE 9 的温度显示和界面微调。
:::

## 排障

| 提示或现象 | 什么意思 | 怎么处理 |
| :--- | :--- | :--- |
| `pve8to9` 提示 `systemd-boot meta-package installed...` | 某些安装路径会带上 systemd-boot 元包，升级时可能影响 boot 相关包更新 | 如果你的 bootloader 根本不是 systemd-boot，按提示移除，然后确认实际启动方式 |
| 找不到 `intel-microcode` / `amd64-microcode` | APT 源缺 `non-free-firmware` 组件 | 按检查器提示补齐源组件，再装 microcode |
| DKMS 模块报错导致内核包 postinst 失败 | 多见于装过显卡、网卡等额外 DKMS 驱动的机器 | 先临时卸载或禁用相关 DKMS，让升级跑完，再按新内核重装驱动 |

**升级后网卡不通。** Debian 13 可能改变网卡命名规则。重启后连不上，接显示器或走控制台改 `/etc/network/interfaces`。

**清理旧内核。** 升完可以用脚本的"内核管理"删掉不再需要的 PVE 8 系列内核（比如 6.8 系列），给 `/boot` 腾空间。

## 参考

Proxmox 官方 Upgrade Wiki 在部分地区访问受限，这里补两份社区实践记录，包含 `pve8to9` 输出和 systemd-boot、microcode、DKMS 等常见错误的处理过程，可以交叉验证：

- 集群升级记录（含 `pve8to9 --full` 与 systemd-boot 提示处理）：<https://blog.vezpi.com/en/post/proxmox-cluster-upgrade-8-to-9-ceph/>
- 多节点升级记录（含源切换与排障）：<https://fredrickb.com/2025/11/11/upgrade-proxmox-from-8-to-9/>
