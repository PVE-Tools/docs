---
title: 宿主机网络、防火墙与 IPv6
description: 了解 PVE Tools Pro 的 Proxmox VE 宿主机 bridge、Bond、VLAN、IPv4、IPv6、防火墙和网络诊断配置流程。
---

# 宿主机网络 / 防火墙 / IPv6

这篇对应脚本里的"宿主机网络配置向导"，覆盖 PVE 9 宿主机的 bridge、Bond、VLAN、防火墙、IPv6 和诊断。

::: warning 这些操作直接动管理面
网络、路由或防火墙改错，SSH、WebUI、集群通信、VM 网络会同时中断。**强烈建议在控制台、IPMI、iKVM 或其他带外环境下执行。**
:::

## 向导能做什么

- 列出当前网卡、地址、路由、bridge、Bond、VLAN 子接口
- 交互式创建 / 删除 bridge
- 给接口配静态 IPv4 / IPv6、DHCPv4、DHCPv6、SLAAC
- 创建 / 删除 VLAN 子接口
- 创建 / 删除 Bond（模式 0 / 1 / 4 / 6）
- 管理 PVE 防火墙开关、安全组、规则集导入导出
- IPv6 透传 / NAT6 助手，以及网络诊断工具箱

## 配置是怎么写进去的

脚本不会直接覆盖宿主机网络配置，而是走四步：

1. 读当前的 `/etc/network/interfaces`
2. 生成候选配置，写到 `/etc/network/interfaces.new`
3. 展示差异摘要，要求高风险确认
4. 按环境选择 `pvenetcommit` 或 `ifreload -a` 应用

这和 PVE 官方的网络修改流程一致——你可以先审 staged 文件，再决定要不要立即生效。

## 三种典型拓扑

**单网卡宿主机：**

```text
物理口 eno1
  -> 创建 vmbr0
  -> bridge-ports eno1
  -> 在 vmbr0 上配置管理口 IPv4 / IPv6
```

**Trunk + VLAN 子接口：**

```text
eno1
  -> eno1.20
  -> vmbr20 (bridge-ports eno1.20)
```

**双口聚合 + Bridge：**

```text
eno1 + eno2
  -> bond0 (mode 1 或 4)
  -> vmbr0 (bridge-ports bond0)
```

## 防火墙与安全组

脚本支持数据中心、节点、VM、CT 四个级别的防火墙开关，安全组规则的查看、追加、删除，以及规则集导出成 JSON 或原生 CLI 文本、再从这两种格式导回去。

::: tip 总开关只是其中一层
VM / CT 的防火墙总开关打开之后，PVE 还可能要求对应网卡上设置 `firewall=1`，那一层不开，流量实际不会被过滤。
:::

## IPv6 助手

三类能力：

- 检测宿主机有没有拿到全局 IPv6、默认路由，以及基础连通性
- 通过 Guest Agent 读取 VM 的 IPv6 地址，粗略判断 VM 是否就绪
- 给指定 bridge 写入 IPv6 透传（SLAAC）或 NAT6 所需的配置

**选透传**，如果上游二层网络本来就能把 IPv6 RA 送到 bridge，而且你希望 VM 直接拿到全局 IPv6。

**选 NAT6**，如果你只想先让 VM 有个 IPv6 出口，并且接受宿主机来跑 `ip6tables` NAT 与转发。

## 诊断工具箱

内置 `traceroute`、`mtr`、`nmap`、`tcpdump`，以及针对宿主机、VM、自定义目标的端口连通性检查。

常用来查这几类问题：宿主机默认路由错了、VM 端口没监听或被防火墙挡了、IPv6 有地址但没默认路由、Bond / VLAN / Bridge 改完之后业务链路异常。

## 回滚原则

- 宿主机网络改动，一律先看 staged 配置再应用。
- 有带外管理才点应用。没有的话，别在远程 SSH 会话里硬上。
- 改完失联，优先走控制台恢复 `/etc/network/interfaces` 的最近备份。
- 防火墙导入之前先把当前规则集导出来——别让"回滚"只停留在脑子里。
