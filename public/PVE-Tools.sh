#!/bin/bash

# SPDX-License-Identifier: GPL-3.0-only
# Copyright (C) 2026 Ciriu Networks
#
# PVE Tools Pro launcher. This file is intended to be hosted at:
# https://pve.oowo.cc/PVE-Tools.sh

set -u

APP_NAME="PVE Tools Pro"
VERSION="0.1.0-beta"
RELEASE_CODE="Jee"


CF_TRACE_URL="https://www.cloudflare.com/cdn-cgi/trace"
GITHUB_PROXY_PREFIX="https://ghfast.top/"
SHELL_SCRIPT_URL="https://raw.githubusercontent.com/PVE-Tools/PVE-Tools-9/main/PVE-Tools.sh"
GO_RELEASES_API_URL="https://api.github.com/repos/PVE-Tools/PVE-Tools-Go/releases"
GO_RELEASE_BASE_URL="https://github.com/PVE-Tools/PVE-Tools-Go/releases/latest/download"

COUNTRY_CODE=""
USE_GITHUB_PROXY=0
SELECTED_VERSION=""
TMP_DIR=""

ASCII_ART=$(cat <<'EOF'
    ____ _    ________   ______            __        ____           
   / __ \ |  / / ____/  /_  __/___  ____  / /____   / __ \_________ 
  / /_/ / | / / __/      / / / __ \/ __ \/ / ___/  / /_/ / ___/ __ \
 / ____/| |/ / /___     / / / /_/ / /_/ / (__  )  / ____/ /  / /_/ /
/_/ __  |___/_____/    /_/  \____/\____/_/____/  /_/   /_/   \____/ 
   / /   ____ ___  ______  _____/ /_  ___  _____                    
  / /   / __ `/ / / / __ \/ ___/ __ \/ _ \/ ___/                    
 / /___/ /_/ / /_/ / / / / /__/ / / /  __/ /                        
/_____/\__,_/\__,_/_/ /_/\___/_/ /_/\___/_/                                                                                        
EOF
)

setup_colors() {
    if [[ -t 1 && -z "${NO_COLOR:-}" ]]; then
        RED=$(printf '\033[0;31m')
        GREEN=$(printf '\033[0;32m')
        YELLOW=$(printf '\033[1;33m')
        CYAN=$(printf '\033[0;36m')
        WHITE=$(printf '\033[1;37m')
        NC=$(printf '\033[0m')
    else
        RED='' GREEN='' YELLOW='' CYAN='' WHITE='' NC=''
    fi
}

log_info() {
    echo -e "${CYAN}INFO${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}WARN${NC} $1"
}

log_error() {
    echo -e "${RED}ERROR${NC} $1" >&2
}

cleanup() {
    if [[ -n "$TMP_DIR" && -d "$TMP_DIR" ]]; then
        rm -rf "$TMP_DIR"
    fi
}

usage() {
    cat <<'EOF'
PVE Tools Pro 官网入口脚本

用法:
  bash <(curl -sSL https://pve.oowo.cc/PVE-Tools.sh)

启动后会直接进入版本选择菜单。

环境变量:
  PVE_TOOLS_GITHUB_PROXY=auto|1|0
EOF
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            --force-github-proxy)
                USE_GITHUB_PROXY=1
                export PVE_TOOLS_GITHUB_PROXY="1"
                ;;
            --no-github-proxy)
                USE_GITHUB_PROXY=0
                export PVE_TOOLS_GITHUB_PROXY="0"
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            *)
                log_error "未知参数: $1"
                usage
                exit 2
                ;;
        esac
        shift
    done
}

require_downloader() {
    if command -v curl >/dev/null 2>&1; then
        echo "curl"
        return 0
    fi

    if command -v wget >/dev/null 2>&1; then
        echo "wget"
        return 0
    fi

    log_error "未检测到 curl 或 wget，无法下载安装脚本。"
    echo "请先执行: apt update && apt install -y curl" >&2
    return 1
}

fetch_stdout() {
    local url="$1"
    local timeout="${2:-6}"

    if command -v curl >/dev/null 2>&1; then
        curl -fsSL --connect-timeout "$timeout" --max-time "$timeout" "$url" 2>/dev/null
        return $?
    fi

    if command -v wget >/dev/null 2>&1; then
        wget -q --timeout="$timeout" -O - "$url" 2>/dev/null
        return $?
    fi

    return 1
}

fetch_github_stdout() {
    local url="$1"
    local timeout="${2:-10}"
    local download_url=""

    download_url="$(github_url "$url")"
    if fetch_stdout "$download_url" "$timeout"; then
        return 0
    fi

    if [[ "$download_url" != "$url" ]]; then
        fetch_stdout "$url" "$timeout"
        return $?
    fi

    return 1
}

download_file() {
    local url="$1"
    local output="$2"

    if command -v curl >/dev/null 2>&1; then
        curl -fL --connect-timeout 10 --max-time 180 -o "$output" "$url"
        return $?
    fi

    if command -v wget >/dev/null 2>&1; then
        wget -O "$output" --timeout=180 "$url"
        return $?
    fi

    return 1
}

detect_country() {
    local trace_output=""
    local loc=""

    trace_output="$(fetch_stdout "$CF_TRACE_URL" 5 || true)"
    loc="$(printf '%s\n' "$trace_output" | awk -F= '/^loc=/{print toupper($2); exit}')"

    if [[ "$loc" =~ ^[A-Z][A-Z]$ ]]; then
        COUNTRY_CODE="$loc"
    fi
}

detect_github_proxy() {
    case "${PVE_TOOLS_GITHUB_PROXY:-auto}" in
        1|true|TRUE|yes|YES)
            USE_GITHUB_PROXY=1
            return
            ;;
        0|false|FALSE|no|NO)
            USE_GITHUB_PROXY=0
            return
            ;;
    esac

    detect_country
    if [[ "$COUNTRY_CODE" == "CN" ]]; then
        USE_GITHUB_PROXY=1
    else
        USE_GITHUB_PROXY=0
    fi
}

github_url() {
    local url="$1"

    if [[ "$USE_GITHUB_PROXY" -eq 1 ]]; then
        printf '%s%s' "$GITHUB_PROXY_PREFIX" "$url"
    else
        printf '%s' "$url"
    fi
}

show_header() {
    echo
    echo -e "${WHITE}----------------------------------------${NC}"
    echo -e "${WHITE}${ASCII_ART}${WHITE}${NC}"
    echo -e "${WHITE}Version: ${VERSION}${WHITE} | Release Code: ${RELEASE_CODE}${NC}"
    echo -e "${WHITE}----------------------------------------${NC}"

    if [[ -n "$COUNTRY_CODE" ]]; then
        echo "当前地区: $COUNTRY_CODE"
    else
        echo "当前地区: 未识别，默认直连 GitHub"
    fi

    if [[ "$USE_GITHUB_PROXY" -eq 1 ]]; then
        echo "GitHub 下载: 使用加速源"
    else
        echo "GitHub 下载: 直连"
    fi
    echo
}

show_version_diff() {
    cat <<'EOF'
请选择要启动的版本:

1) Go 版本 [暂未上线]
   - 新一代重构版本，模块化架构，交互和环境校验更清晰。
   - 适合体验后续主线、TUI/CLI 新交互和更长期的维护方向。
   - 仍处于重构迭代期，部分 Shell 版功能可能尚未完全覆盖。

2) Shell 版本
   - 经典单文件脚本，功能覆盖更完整，适合继续使用现有成熟流程。
   - 推荐生产服务器使用已经受到时间验证的版本。

0) 退出
EOF
}

select_version() {
    local choice=""

    if [[ ! -t 0 ]]; then
        log_error "当前不是交互式终端，无法显示版本选择菜单。"
        echo "请使用: bash <(curl -sSL https://pve.oowo.cc/PVE-Tools.sh)" >&2
        exit 1
    fi

    while true; do
        show_version_diff
        echo
        read -r -p "请输入选项 [1/2/0]: " choice
        case "$choice" in
            1|go|Go|GO)
                SELECTED_VERSION="go"
                return
                ;;
            2|shell|Shell|SHELL|"")
                SELECTED_VERSION="shell"
                return
                ;;
            0|q|Q|quit|exit)
                echo "已退出。"
                exit 0
                ;;
            *)
                log_warn "无效选择，请输入 1、2 或 0。"
                ;;
        esac
    done
}

detect_go_arch() {
    local machine=""

    machine="$(uname -m 2>/dev/null || true)"
    case "$machine" in
        x86_64|amd64)
            echo "amd64"
            ;;
        aarch64|arm64)
            echo "arm64"
            ;;
        riscv64)
            echo "riscv64"
            ;;
        *)
            return 1
            ;;
    esac
}

detect_shell_rc_file() {
    local home_dir="${HOME:-}"
    local shell_name=""

    if [[ -z "$home_dir" || ! -d "$home_dir" ]]; then
        return 1
    fi

    shell_name="$(basename "${SHELL:-bash}")"
    case "$shell_name" in
        zsh)
            printf '%s/.zshrc' "$home_dir"
            ;;
        *)
            printf '%s/.bashrc' "$home_dir"
            ;;
    esac
}

install_shell_alias() {
    local source_script="$1"
    local home_dir="${HOME:-}"
    local install_dir=""
    local install_path=""
    local rc_file=""
    local alias_line=""

    if [[ -z "$home_dir" || ! -d "$home_dir" ]]; then
        log_warn "未识别到有效 HOME，跳过本地保存。"
        return 1
    fi

    if ! rc_file="$(detect_shell_rc_file)"; then
        log_warn "未找到 shell 配置文件路径，跳过 alias 写入。"
        return 1
    fi

    install_dir="${home_dir}/.local/share/pve-tools"
    install_path="${install_dir}/PVE-Tools.sh"
    alias_line="alias pvetools='bash \"${install_path}\"'"

    mkdir -p "$install_dir"
    cp "$source_script" "$install_path"
    chmod +x "$install_path"

    touch "$rc_file"
    if grep -Fxq "$alias_line" "$rc_file"; then
        log_info "pvetools alias 已存在，无需重复写入。"
    else
        if grep -Eq '^[[:space:]]*alias[[:space:]]+pvetools=' "$rc_file"; then
            log_warn "检测到已有 pvetools alias，将在文件末尾追加新的 alias 使其生效。"
        fi
        {
            printf '\n# PVE Tools Pro\n'
            printf '%s\n' "$alias_line"
        } >> "$rc_file"
        log_info "已写入 alias: $rc_file"
    fi

    log_info "Shell 脚本已保存到: $install_path"
    log_info "重新登录终端，或执行 source \"$rc_file\" 后，可直接输入 pvetools 启动。"
}

prompt_shell_alias_install() {
    local script_path="$1"
    local answer=""

    if [[ ! -t 0 ]]; then
        return
    fi

    echo
    read -r -p "是否保存 Shell 版本到本地并添加 pvetools alias？[y/N]: " answer
    case "$answer" in
        y|Y|yes|YES)
            install_shell_alias "$script_path" || true
            ;;
        *)
            log_info "已跳过本地保存。"
            log_info "即将启动程序...请稍候..."
            ;;
    esac
}

resolve_go_asset_url() {
    local arch="$1"
    local releases_json=""
    local asset_urls=""
    local asset_name=""
    local match=""

    releases_json="$(fetch_github_stdout "$GO_RELEASES_API_URL" 10 || true)"
    if [[ -n "$releases_json" ]]; then
        asset_urls="$(printf '%s\n' "$releases_json" | sed -nE 's/.*"browser_download_url":[[:space:]]*"([^"]+)".*/\1/p')"

        for asset_name in \
            "pve-tools-linux-${arch}" \
            "pve-tools-beta-linux-${arch}" \
            "pve-tools-preview-linux-${arch}"; do
            match="$(printf '%s\n' "$asset_urls" | grep "/${asset_name}$" | head -n 1 || true)"
            if [[ -n "$match" ]]; then
                printf '%s' "$match"
                return 0
            fi
        done
    fi

    printf '%s/pve-tools-linux-%s' "$GO_RELEASE_BASE_URL" "$arch"
}

run_go_version() {
    local arch=""
    local asset_url=""
    local download_url=""
    local target=""
    local status=0

    if [[ "$(uname -s 2>/dev/null)" != "Linux" ]]; then
        log_error "Go 版本当前仅提供 Linux 二进制。"
        exit 1
    fi

    if ! arch="$(detect_go_arch)"; then
        log_error "暂不支持当前 CPU 架构: $(uname -m 2>/dev/null || echo unknown)"
        exit 1
    fi

    TMP_DIR="$(mktemp -d /tmp/pve-tools-launcher.XXXXXX)"
    target="${TMP_DIR}/pve-tools"
    asset_url="$(resolve_go_asset_url "$arch")"
    download_url="$(github_url "$asset_url")"

    log_info "正在下载 Go 版本: $(basename "$asset_url")"
    if ! download_file "$download_url" "$target"; then
        log_error "Go 版本下载失败。请尝试手动下载。"
        echo "原始地址: $asset_url" >&2
        if [[ "$USE_GITHUB_PROXY" -eq 1 ]]; then
            echo "加速地址: $download_url" >&2
        fi
        exit 1
    fi

    chmod +x "$target"
    log_info "启动 Go 版本..."
    "$target"
    status=$?
    exit "$status"
}

run_shell_version() {
    local script_path=""
    local download_url=""
    local status=0

    TMP_DIR="$(mktemp -d /tmp/pve-tools-launcher.XXXXXX)"
    script_path="${TMP_DIR}/PVE-Tools.sh"
    download_url="$(github_url "$SHELL_SCRIPT_URL")"

    log_info "正在下载 Shell 版本..."
    if ! download_file "$download_url" "$script_path"; then
        log_error "Shell 版本下载失败。"
        echo "原始地址: $SHELL_SCRIPT_URL" >&2
        if [[ "$USE_GITHUB_PROXY" -eq 1 ]]; then
            echo "加速地址: $download_url" >&2
        fi
        exit 1
    fi

    log_info "启动 Shell 版本..."
    prompt_shell_alias_install "$script_path"
    bash "$script_path"
    status=$?
    exit "$status"
}

main() {
    setup_colors
    trap cleanup EXIT
    parse_args "$@"
    if ! require_downloader >/dev/null; then
        exit 1
    fi
    detect_github_proxy
    show_header

    if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
        log_error "本脚本必须以 root 用户直接运行，不支持普通用户或 sudo 提权。"
        exit 1
    fi

    select_version
    case "$SELECTED_VERSION" in
        go)
            run_go_version
            ;;
        shell)
            run_shell_version
            ;;
        *)
            log_error "内部错误: 未知版本选择 $SELECTED_VERSION"
            exit 1
            ;;
    esac
}

main "$@"
