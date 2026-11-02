---
title: 域名迁移公告
description: PVE Tools Pro 官方域名由 pve.u3u.icu 迁移至 pve.ciriu.com；旧域名即将释放，请删除旧书签并检查 hosts、DNS、反向代理与自动化脚本。
---

# 域名迁移公告

> **生效日期：2026-11-02**
>
> **旧域名 `pve.u3u.icu` 已废弃，唯一官方域名迁移至 <https://pve.ciriu.com>。**

## 结论

| 项目 | 地址 | 状态 |
|:---|:---|:---|
| 旧官网 | `https://pve.u3u.icu` | **已废弃，即将释放** |
| 新官网 | <https://pve.ciriu.com> | **唯一官方域名** |
| 新安装命令 | `bash <(curl -sSL https://pve.ciriu.com/PVE-Tools.sh)` | 推荐 |
| 支持邮箱 | `Support@ciriu.com` / `contact@ciriu.com` | 已启用 |

旧域名不再作为项目的官方入口。文档、安装命令、赞助页、用户协议与联系方式均以新域名为准。

## 立即行动

### 1. 删除或替换书签

打开浏览器书签管理器，搜索 `u3u.icu`，删除所有指向旧域名的条目，然后重新收藏 <https://pve.ciriu.com>。

- Chrome / Edge：`Ctrl + Shift + O`（macOS：`Cmd + Option + B`）
- Firefox：`Ctrl + Shift + O`（macOS：`Cmd + Shift + O`）
- Safari：`Cmd + Option + B`
- 手机浏览器：在书签列表中长按旧条目，选择编辑或删除

### 2. 检查本机与业务域名配置

**请自己仔细检查业务域名，因旧域名即将释放，释放后可能会被有心之人利用。**

重点检查以下位置是否仍写死了 `pve.u3u.icu` 或 `u3u.icu`：

- 本机 hosts 文件
  - Linux / macOS：`/etc/hosts`
  - Windows：`C:\Windows\System32\drivers\etc\hosts`
- 路由器、AdGuard Home、Pi-hole、dnsmasq 等自定义 DNS 解析
- Nginx / Caddy / Traefik 等反向代理的 `server_name`、upstream 与跳转规则
- 监控探针、Uptime Kuma、拨测任务与告警模板
- 部署脚本、CI/CD 变量、快捷方式、二维码与内部文档
- 密码管理器、RSS 阅读器、笔记与收藏夹中的旧地址

### 3. 更新安装命令

```bash
bash <(curl -sSL https://pve.ciriu.com/PVE-Tools.sh)
```

已经安装为 `pvetools` 的用户，建议重新执行一次安装，覆盖旧副本：

```bash
bash <(curl -sSL https://pve.ciriu.com/PVE-Tools.sh) --install
```

### 4. 更新联系方式

旧域名邮箱 `@u3u.icu` 将随域名一并停用，请改用：

- 支持与付费咨询：`Support@ciriu.com`
- 项目联系：`contact@ciriu.com`

## 风险说明

旧域名即将停止续费并释放。域名释放后，任何人都可以重新注册它，并可能用于：

- 仿冒本项目文档站，发布篡改过的安装命令
- 托管恶意脚本、镜像或“加速源”
- 钓鱼收集 PVE 主机地址、账号或其他敏感信息
- 冒充项目方发布虚假公告、赞助或技术支持信息

**请自己仔细检查业务域名，因旧域名即将释放，释放后可能会被有心之人利用。**

项目不会通过旧域名发布任何新内容。如果你仍看到旧域名上的“最新版”“官方镜像”“赞助入口”，请不要信任，并从新域名重新获取。

## 脚本侧的防护

为避免用户继续运行指向旧域名的脚本，新版本已加入以下检查：

- 启动器下载主程序后，若发现升级脚本仍包含旧域名，将中止启动并提示重新获取
- 主程序启动时若发现当前脚本仍引用旧域名，将中止运行并给出新域名
- 菜单 8 的本地脚本快捷更新，在替换前会校验下载到的新脚本，发现旧域名则保持本地脚本不变

脚本的版本检查与下载链路使用 GitHub Releases 与 CNB 镜像，不依赖旧官网域名；因此域名迁移不会影响正常的更新能力。

## 旧域名保留说明

旧域名是否继续保留，取决于社区是否愿意共同承担续费成本。

- 续费目标：**¥100 / 年**
- 如果目标达成：旧域名将继续续费，并仅作为跳转到新站的过渡页，不再承载文档内容
- 如果目标未达成：旧域名将按计划释放，本项目不再对其内容负责

如果你喜欢旧域名，或担心它被他人抢注用于仿冒，可以通过爱发电支持：

- 爱发电：<https://afdian.com/a/cyrenenight>
- 请备注「旧域名续费」，便于单独统计

> 赞助完全自愿。无论是否支持，新域名下的文档与脚本都会继续免费提供。

## 官方入口

- 文档站：<https://pve.ciriu.com>
- 安装命令：`bash <(curl -sSL https://pve.ciriu.com/PVE-Tools.sh)`
- GitHub：<https://github.com/PVE-Tools/PVE-Tools-9>
- 爱发电：<https://afdian.com/a/cyrenenight>
- QQ 群：`1031976463`（入群密码：`PVE Tools Pro`）
- Telegram：<https://t.me/pvetools233>
