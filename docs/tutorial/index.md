---
title: 高级教程
description: PVE Tools Pro 高级教程，覆盖 GPU 直通、SR-IOV、CPU 调优、PVE 8 升级 9、存储管理、网络防火墙与数据恢复。
---

# 高级教程

本章节深入探讨 PVE Tools Pro 部分高级功能的底层原理、配置要点与注意事项。这些功能通常涉及系统内核和底层驱动的修改，建议在充分理解后再操作。

::: warning 危险操作声明
高级功能涉及对系统引导（GRUB）、驱动黑名单和内核模块的深度修改。虽然脚本提供了自动化备份与恢复工具，但仍存在系统无法启动的风险。**操作前请务必备份重要数据。**
:::

## GPU 与虚拟化

| 教程 | 适用场景 |
|:---|:---|
| [Intel 核显直通](./gpu-passthrough.md) | Intel 6~14 代 CPU，解决 Windows 虚拟机直通核显后的「代码 43」或黑屏 |
| [核显虚拟化 SR-IOV / GVT-g](./gpu-virtualization.md) | 一个核显切分给多个虚拟机同时使用，支持 6~15 代 Intel CPU |
| [NVIDIA vGPU 驱动说明](./nvidia-vgpu-driver-notes.md) | 为何不建议自动化安装驱动，以及手工安装与版本匹配建议 |

## 系统与存储

| 教程 | 适用场景 |
|:---|:---|
| [PVE 8 升级 PVE 9](./pve-upgrade.md) | 跨大版本升级的检查项、备份策略、升级步骤与回滚方案 |
| [存储管理](./storage-management.md) | 搞懂 local 与 local-lvm 的区别，掌握合并存储与硬盘休眠 |
| [CPU 性能调优](./cpu-optimization.md) | 解析 CPU 频率跳动原理，在性能与功耗之间取得平衡 |

## 网络与运维

| 教程 | 适用场景 |
|:---|:---|
| [宿主机网络 / 防火墙 / IPv6](./host-network-firewall-ipv6.md) | Linux 网桥、Bond、VLAN、PVE 防火墙规则与 IPv6 配置实践 |
| [VM 备份 / 迁移 / Cloud-Init](./vm-backup-migration-cloudinit.md) | 备份策略、集群内迁移、Cloud-Init 配置与模板制作 |
| [误操作后的数据恢复](./data-recovery-after-mistake.md) | 误删虚拟机、误格式化存储、配置出错后的止损与应急恢复 |
| [如何连接 PVE SSH](./how-to-connect-ssh.md) | Windows、macOS、Linux、Android、iOS 各平台的 SSH 连接方式 |
