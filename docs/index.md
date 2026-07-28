---
layout: home
title: PVE Tools Pro
titleTemplate: Proxmox VE 一站式运维工具箱
description: PVE Tools Pro — 面向 Proxmox VE 9.x 的一键运维脚本，覆盖换源、系统维护、虚拟机生命周期、宿主机网络、防火墙、IPv6、GPU 与 PCI 直通。

hero:
  name: PVE Tools Pro
  text: 用于 Proxmox VE 的  新一代运维工具箱
  tagline: 一行命令，全部就绪。休息一下，很快就好。
  image:
    light: /pve-logo.svg
    dark: /pve-logo-dark.svg
    alt: PVE Tools Pro
  actions:
    - theme: brand
      text: 阅读使用指南
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/PVE-Tools/PVE-Tools-9
    - theme: alt
      text: QQ官方交流群
      link: https://qun.qq.com/universal-share/share?ac=1&authKey=omiwlG%2FG4HoxR32Clam3Cl5soFWeYxbHJg3NaYLzssgSY9djqNkbN4eVO%2BoiQGv2&busi_data=eyJncm91cENvZGUiOiIxMDMxOTc2NDYzIiwidG9rZW4iOiJoalhDUFY1Zmw1Rk1xbVdLVEpkMjY4WmNCQ2hxZUh5QU1jRjVkNnNmSzREY2JUeFBtK2xhMWdGajdLY1prQ2NWIiwidWluIjoiMTUyMDk0MjYyMSJ9&data=hhy_K0L8933lbB3NDNVy1O20H7zXedtX9gYBLuqqrkiyl2rxlY9_-eAaLlDkPkeJbahv28TERacHwkeVY2W1qg&svctype=4&tempid=h5_group_info

features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg>'
    title: 系统维护
    details: 源管理、内核管理、订阅管理、电源管理、温度监控、漏洞修复、Grub 与 Ceph 维护，一键初始化装机。
    link: /guide/features#_1-软件源与系统维护
    linkText: 查看细节
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="6" height="6" x="16" y="16" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="9" y="2" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3m-7-4V8"/></g></svg>'
    title: 网络配置
    details: Bridge / Bond / VLAN 管理、PVE 防火墙与安全组、IPv6 助手与网络诊断工具箱。
    link: /guide/features#_3-宿主机网络、防火墙与-ipv6
    linkText: 查看细节
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8m-4-4v4"/></g></svg>'
    title: GPU 直通
    details: IOMMU 管理与 Intel / NVIDIA / AMD 全家桶直通，含核显虚拟化、磁盘与控制器直通。
    link: /guide/features#_4-gpu-pci-直通
    linkText: 查看细节
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><path d="M6 6h.01M6 18h.01"/></g></svg>'
    title: 虚拟机运维
    details: 备份恢复、克隆迁移、快照管理、定时任务、Cloud-Init、磁盘管理与镜像导入的完整链路。
    link: /guide/features#_2-虚拟机与容器运维
    linkText: 查看细节
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 16h.01m-7.798-4.423a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11zm19.734.436H2.054M6 16h.01"/></svg>'
    title: 存储管理
    details: 存储列表与合并、Ceph 管理、Swap 管理、硬盘休眠，从本地磁盘到分布式存储全覆盖。
    link: /tutorial/storage-management
    linkText: 深度解析
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12l2 2l4-4"/></g></svg>'
    title: 安全边界
    details: 高风险操作双重确认、操作前自动备份到 /var/backups/pve-tools/、审计日志与回滚引导。
    link: /guide/features#_5-安全与风险控制
    linkText: 查看细节
---

<HomeNext />
