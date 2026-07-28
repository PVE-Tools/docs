---
title: CPU 性能调优
description: 了解 Proxmox VE 9 中 CPU 调速器、intel_pstate、性能模式、节能模式与 PVE Tools Pro 持久化调优方案。
---

# CPU 性能调优

PVE 装完之后 CPU 频率乱跳、或者空载时功耗还是压不下来，多半是调速器（Governor）没配对。

## 五种调速器

调速器是内核里的一个模块，决定 CPU 频率怎么跟着负载升降。

| 模式 | 行为 | 适合 |
| :--- | :--- | :--- |
| `performance` | 锁在最高频率 | 追求极致响应，比如游戏、高频交易 |
| `powersave` | 锁在最低频率 | 纯挂机，对延迟不敏感 |
| `ondemand` | 有任务瞬间拉满，闲时降频 | 大部分 Linux 发行版的默认选择 |
| `conservative` | 频率平滑上升，不像 ondemand 那么激进 | 想省电又不想太迟钝 |
| `schedutil` | 由内核调度器直接控制频率 | 较新的方案，响应更精准 |

## 选了没生效？

这是 Issue 里问得最多的一个问题，原因基本都一样：**现代 Intel CPU（尤其 12 代之后）用的是 `intel_pstate` 驱动，它通常只认 `performance` 和 `powersave` 两种模式。** 你选 `ondemand`，系统会默默回退到默认设置。

想知道自己的机器支持哪几种，看这个文件：

```bash
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors
```

PVE Tools Pro 也是读这里的输出来生成菜单的，列表里没有的模式选了也不会生效。

## 脚本做了什么

- **一键切换**：菜单选完直接写入系统策略。
- **持久化**：装 `cpupower-gui` 或改系统服务，保证重启后设置还在。
- **微码更新**：自动检测并安装最新的 CPU Microcode，修掉已知的安全漏洞和性能缺陷。

## 两个实用建议

追求省电，硬件支持的话可以试试 `conservative`。虚拟机里编译软件特别慢，临时切到 `performance` 会有明显改善，编译完再切回去。

::: tip
调频率不会烧硬件，但 `performance` 模式的发热量是实打实的——前提是你的散热器不是个样子货。
:::
