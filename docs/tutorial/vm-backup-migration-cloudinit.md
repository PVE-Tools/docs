---
title: VM 备份、迁移与 Cloud-Init
description: 学习 PVE Tools Pro 的 VM 备份恢复、模板克隆、Cloud-Init、磁盘快照、网络管理与集群内迁移工作流。
---

# VM 备份 / 迁移 / Cloud-Init

这篇对应脚本里的"虚拟机高级运维工具箱"，覆盖备份恢复、模板克隆、Cloud-Init、磁盘快照网络、集群内迁移。

## 备份与恢复

优先用脚本的 **VM 备份与恢复** 菜单，它是对官方 `vzdump` / `qmrestore` 的交互式封装：

- 单 VM、多 VM、全部 VM 备份
- `zstd` / `gzip` / `lzo` 三种压缩
- 选择 `backup` 内容类型的存储
- 用 `keep-last=N` 生成保留策略
- 恢复成新 VMID，可选 `--unique 1` 重建 MAC 和唯一标识

三条经验：日常备份用 `snapshot` 模式；VM 挂了大盘或者对 IO 敏感的，动手前先确认目标存储的空间和吞吐；恢复成新 VM 时保留 `--unique 1`，否则网络标识会撞车。

## 配置导入 / 导出

导出的配置文件本质上是带元信息头的 `qm config` 快照。导入时脚本不直接覆盖 `/etc/pve/qemu-server/<VMID>.conf`，而是先 `qm create` 建空白 VM，再用 `qm set` 逐项回放。

绕这一圈有三个好处：不动集群配置文件、符合 PVE 9 集群环境下的操作习惯、出错时能精确定位到是哪一项失败的。

两种导入模式：

- `config` —— 只重建配置，不碰磁盘引用
- `rebind-disks` —— 尝试回放原磁盘引用，前提是目标节点能访问同名卷或相同存储

## 模板 / 克隆 / Cloud-Init

云镜像模板的推荐流程：

1. 准备 `.qcow2` / `.raw` / `.img` cloud image
2. 在"导入云镜像并生成模板"里创建基础 VM
3. 导入系统盘，挂上 Cloud-Init 盘
4. 设置 `ciuser`、`sshkeys`、`ipconfig0`、`nameserver`
5. 启用 `serial0 + vga serial0`——多数 Linux cloud image 靠这个才能正常输出控制台
6. 转成模板，之后用完整克隆或链接克隆交付新 VM

有三条约束要记住：`cicustom` 依赖支持 `snippets` 内容类型的存储；链接克隆只建议对模板用，且通常要求共享或可克隆的存储；Windows 场景一般需要 Cloudbase-Init，脚本目前主打的是 Linux Cloud-Init 流程。

## 磁盘 / 快照 / 启动 / 网络

| 类别 | 能做的操作 |
| :--- | :--- |
| 磁盘 | 在线/离线扩容、添加磁盘、删除磁盘插槽、迁移到其他存储 |
| 快照 | 批量创建、查看指定 VM 的快照、删除、回滚 |
| 启动 | 开机自启 `onboot`、启动顺序 `boot order=...`、启动延迟 `startup=...` |
| 网络 | 网卡增删、bridge 与 VLAN 修改 |

## 集群内迁移

脚本封装的是**集群内 `qm migrate`**，不是跨集群的远程迁移。

迁移前确认四件事：目标节点在线、目标存储存在或能用 `--targetstorage` 正确映射、要不要带本地磁盘一起走、VM 有没有 PCI / GPU / NVMe 直通这类硬件绑定。

**为什么没做 `remote-migrate`：** 在当前 PVE 9 的官方文档语境里，`qm remote-migrate` 还不适合当脚本的默认自动化入口。先把集群内迁移和备份恢复型迁移做扎实，比急着上远程迁移更稳妥。

## 三套组合拳

**模板化交付**：cloud image → Cloud-Init → 模板 → 链接克隆

**保险型迁移**：`vzdump` 备份 → `qmrestore` 到新 VMID → 验证业务 → 切换流量

**日常运维**：快照 → 改磁盘/网络/启动策略 → 验证 → 不对就回滚

## 误操作了怎么办

在备份恢复、配置导入、模板克隆、Cloud-Init、磁盘、快照、迁移这些环节动错了对象，第一反应不该是继续修正，而是**停止写入**。

- 停掉相关 VM，暂停后续自动任务，别让新的 clone/restore/move/rollback 覆盖现场
- 立即导出 `qm config`、任务日志、存储状态、集群状态，把证据留下
- 再看 [误操作后的数据恢复](./data-recovery-after-mistake.md)，评估数据存活概率，判断要不要升级到专业恢复
