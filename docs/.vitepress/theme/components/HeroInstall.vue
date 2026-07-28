<script setup lang="ts">
import { ref } from "vue";
import { iconCheck, iconCopy, iconTerminal } from "../icons";

const command = "bash <(curl -sSL https://pve.u3u.icu/PVE-Tools.sh)";

const copied = ref(false);

const copy = async () => {
  await navigator.clipboard.writeText(command);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
  <div class="hero-install">
    <div class="cmd">
      <span class="cmd-icon" v-html="iconTerminal" />
      <code>{{ command }}</code>
      <button
        class="cmd-copy"
        :class="{ copied }"
        type="button"
        :title="copied ? '已复制' : '复制命令'"
        :aria-label="copied ? '已复制' : '复制命令'"
        @click="copy"
      >
        <span v-html="copied ? iconCheck : iconCopy" />
      </button>
    </div>
    <p class="cmd-note">在 PVE 终端粘贴执行 · 需要 Proxmox VE 9.0 以上并以 root 运行</p>
  </div>
</template>

<style scoped>
.hero-install {
  margin-top: 24px;
}

.cmd {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px 12px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-alt);
  text-align: left;
}

.cmd-icon {
  display: flex;
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

.cmd code {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  white-space: nowrap;
  font-family: var(--vp-font-family-mono);
  font-size: 13.5px;
  line-height: 24px;
  color: var(--vp-c-text-1);
  background-color: transparent;
  /* 滚动条不占位，避免命令框在窄屏抖动 */
  scrollbar-width: none;
}

.cmd code::-webkit-scrollbar {
  display: none;
}

.cmd-copy {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: color 0.2s, border-color 0.2s;
}

.cmd-copy:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.cmd-copy.copied {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.cmd-note {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

@media (max-width: 959px) {
  .hero-install {
    max-width: 592px;
    margin: 24px auto 0;
  }

  .cmd-note {
    text-align: center;
  }
}

@media (max-width: 640px) {
  .cmd {
    padding: 10px 10px 10px 12px;
  }

  .cmd code {
    font-size: 12.5px;
  }
}
</style>
