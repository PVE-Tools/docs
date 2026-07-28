<script setup lang="ts">
import { sponsorChannels, sponsors } from "../../data/sponsors";
</script>

<template>
  <div class="sponsor">
    <h2 id="赞助方式" tabindex="-1">
      赞助方式 <a class="header-anchor" href="#赞助方式" aria-label="赞助方式 的链接">&ZeroWidthSpace;</a>
    </h2>

    <div class="channels">
      <div v-for="channel in sponsorChannels" :key="channel.name" class="channel">
        <div class="channel-head">
          <img class="channel-icon" :src="channel.icon" alt="" aria-hidden="true" />
          <span class="channel-name">{{ channel.name }}</span>
        </div>
        <div class="qr-frame">
          <img class="qr" :src="channel.qr" :alt="`${channel.name}收款码`" loading="lazy" />
        </div>
      </div>
    </div>

    <h2 id="部分支持者" tabindex="-1">
      部分支持者 <a class="header-anchor" href="#部分支持者" aria-label="部分支持者 的链接">&ZeroWidthSpace;</a>
    </h2>

    <p class="sponsor-hint">感谢每一位支持者，以下名单按赞助时间倒序排列。</p>

    <ul class="sponsor-grid">
      <li v-for="(sponsor, index) in sponsors" :key="`${sponsor.name}-${index}`" class="sponsor-card">
        <div class="sponsor-meta">
          <span class="sponsor-name">{{ sponsor.name }}</span>
          <time class="sponsor-date">{{ sponsor.date }}</time>
        </div>
        <p v-if="sponsor.note" class="sponsor-note">{{ sponsor.note }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.channels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 20px 0 8px;
}

.channel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  padding: 16px;
}

.channel-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.channel-icon {
  width: 20px;
  height: 20px;
}

.channel-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.qr-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 10px;
}

.qr {
  width: 100%;
  max-width: 180px;
  height: auto;
}

.sponsor-hint {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.sponsor-card {
  margin: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  padding: 12px 14px;
  transition: border-color 0.2s;
}

.sponsor-card:hover {
  border-color: var(--vp-c-brand-1);
}

.sponsor-meta {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.sponsor-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sponsor-date {
  flex-shrink: 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.sponsor-note {
  margin: 8px 0 0;
  border-left: 2px solid var(--vp-c-divider);
  padding-left: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
