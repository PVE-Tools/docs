<script setup lang="ts">
import { sponsorTiers } from "../../data/sponsors";

/** 档位权益里只用到加粗，内容来自本地常量，直接转成 <strong> 即可 */
const renderBold = (text: string) => text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
</script>

<template>
  <div class="tiers">
    <div v-for="tier in sponsorTiers" :key="tier.name" class="tier">
      <div class="tier-head">
        <span class="tier-name">{{ tier.name }}</span>
        <span class="tier-amount">{{ tier.amount }}</span>
      </div>
      <p class="tier-benefits" v-html="renderBold(tier.benefits)" />
      <p class="tier-audience">{{ tier.audience }}</p>
    </div>
  </div>
</template>

<style scoped>
.tiers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.tier {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  padding: 18px;
  transition: border-color 0.2s;
}

.tier:hover {
  border-color: var(--vp-c-brand-1);
}

.tier-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.tier-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tier-amount {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.tier-benefits {
  flex: 1;
  margin: 14px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.tier-benefits :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.tier-audience {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}
</style>
