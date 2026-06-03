---
title: 高级教程
description: PVE Tools Pro 高级教程，覆盖 GPU 直通、SR-IOV、CPU 调优、PVE 8 升级 9、存储管理、网络防火墙与数据恢复。
---

# 高级功能深度解析

本章节将深入探讨 PVE Tools Pro 提供的部分高级功能，包括它们的底层原理、配置要点以及使用中的注意事项。这些功能通常涉及系统内核和底层驱动的修改，建议在充分理解后再进行操作。

## 教程列表

### 1. Intel 核显直通 (GVT-d / 强刷 ROM)
适用于 Intel 6代至 14代 CPU，解决 Windows 虚拟机直通核显后的“代码 43”报错或黑屏问题。
- [点击阅读教程](./gpu-passthrough)

### 2. 核显虚拟化 (SR-IOV / GVT-g)
在一台宿主机上虚拟出多个核显，分配给多个虚拟机同时使用。支持 6代至 15代 Intel CPU。
- [点击阅读教程](./gpu-virtualization)

### 3. CPU 调速器与性能调优
解析 CPU 频率跳动的原理，教你如何在性能与功耗之间取得平衡。
- [点击阅读教程](./cpu-optimization)

### 4. PVE 8 跨版本升级 PVE 9
跨大版本升级不再心惊肉跳，掌握核心逻辑与救砖技巧。
- [点击阅读教程](./pve-upgrade)

### 5. 存储架构深度解析
搞懂 local 与 local-lvm 的区别，掌握合并存储与硬盘休眠的精髓。
- [点击阅读教程](./storage-management)

### 6. NVIDIA vGPU 驱动安装说明
解释为何不建议自动化安装驱动，并给出手工安装与版本匹配建议。
- [点击阅读教程](./nvidia-vgpu-driver-notes)

### 7. VM 备份、迁移与 Cloud-Init
涵盖虚拟机备份策略、在线/离线迁移、Cloud-Init 配置与模板制作，保障业务连续性。
- [点击阅读教程](./vm-backup-migration-cloudinit)

### 8. 宿主机网络、防火墙与 IPv6
深入理解 Linux 网桥、iptables/nftables 防火墙规则，以及 IPv6 在 PVE 中的配置与实践。
- [点击阅读教程](./host-network-firewall-ipv6)

### 9. 误操作后的数据恢复
当误删虚拟机、误格式化存储或配置出错时的应急恢复方案与止损思路。
- [点击阅读教程](./data-recovery-after-mistake)

### 10. 如何连接到 PVE 主机 SSH
从 Windows、macOS、Linux、Android、iOS 等平台连接 PVE 主机 SSH 的完整指南。
- [点击阅读教程](./how-to-connect-ssh)

---

> [!CAUTION]
> **危险操作声明**：高级功能涉及对系统引导（GRUB）、驱动黑名单和内核模块的深度修改。虽然脚本提供了自动化备份与恢复工具，但仍存在系统无法启动的风险。**操作前请务必备份重要数据！**
