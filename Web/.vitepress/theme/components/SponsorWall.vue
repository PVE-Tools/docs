<script setup>
import { ref, computed } from 'vue'
import { Heart } from 'lucide-vue-next'
import sponsorData from '../../../sponsor-data.json'

const showAll = ref(false)

const topSponsors = computed(() => sponsorData.top_sponsors || [])
const recentSponsors = computed(() => {
  const list = sponsorData.recent_sponsors || []
  return showAll.value ? list : list.slice(0, 8)
})

const sponsorLink = computed(() => sponsorData.sponsor_link || '#')
const qqGroup = computed(() => sponsorData.qq_group || '')
const hasMore = computed(() => (sponsorData.recent_sponsors || []).length > 8)

function formatAmount(amount) {
  return `¥ ${amount.toFixed(2)}`
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<template>
  <div class="sponsor-wall">
    <!-- 标题 -->
    <div class="wall-header">
      <div class="header-icon"><Heart :size="20" /></div>
      <h2 class="wall-title">感谢投喂</h2>
    </div>

    <!-- 最高赞助 -->
    <div v-if="topSponsors.length > 0" class="section">
      <div v-for="(s, i) in topSponsors" :key="'top-' + i" class="top-card">
        <div class="top-badge">TOP</div>
        <div class="top-info">
          <div class="top-name">{{ s.name }}</div>
          <div v-if="s.message" class="top-msg">{{ s.message }}</div>
        </div>
        <div class="top-amount">{{ formatAmount(s.amount) }}</div>
      </div>
    </div>

    <!-- 投喂列表 -->
    <div class="feed-list">
      <div v-for="(s, i) in recentSponsors" :key="'feed-' + i" class="feed-item">
        <div class="feed-avatar">{{ s.name.charAt(0) }}</div>
        <div class="feed-info">
          <span class="feed-name">{{ s.name }}</span>
          <span class="feed-meta">{{ s.channel }} · {{ formatDate(s.date) }}</span>
        </div>
        <div class="feed-amount">{{ formatAmount(s.amount) }}</div>
      </div>
    </div>

    <button v-if="hasMore && !showAll" class="show-more" @click="showAll = true">
      查看全部 →
    </button>

    <!-- 赞助入口 -->
    <div class="wall-footer">
      <a :href="sponsorLink" target="_blank" rel="noopener" class="cta-btn">
        ☕ 请作者喝咖啡
      </a>
    </div>
  </div>
</template>

<style scoped>
.sponsor-wall {
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-bg-soft);
  padding: 20px;
}

.wall-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand);
}

.wall-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  background: none;
  -webkit-text-fill-color: initial;
}

/* 最高赞助 */
.section {
  margin-bottom: 16px;
}

.top-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px;
}

.top-badge {
  font-size: 0.65rem;
  font-weight: 700;
  color: #fff;
  background: var(--vp-c-brand);
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.top-info {
  flex: 1;
  min-width: 0;
}

.top-name {
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-msg {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-amount {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-brand);
  flex-shrink: 0;
}

/* 投喂列表 */
.feed-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feed-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.feed-item:hover {
  background-color: var(--vp-c-bg);
}

.feed-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.feed-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.feed-name {
  font-size: 0.85rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feed-meta {
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
}

.feed-amount {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  flex-shrink: 0;
}

/* 查看全部 */
.show-more {
  display: block;
  width: 100%;
  margin-top: 12px;
  padding: 8px;
  background: transparent;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.show-more:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

/* 赞助入口 */
.wall-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.cta-btn {
  display: block;
  text-align: center;
  padding: 10px;
  background: var(--vp-c-brand);
  color: #fff;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s;
}

.cta-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(100, 108, 255, 0.3);
}
</style>
