<script setup lang="ts">
import { paymentMethods, pricingPlans } from "../../data/sponsors";
</script>

<template>
  <div class="pricing">
    <div class="plans">
      <div v-for="plan in pricingPlans" :key="plan.name" class="plan">
        <div class="plan-head">
          <span class="plan-name">{{ plan.name }}</span>
          <span class="plan-price">{{ plan.price }}</span>
        </div>
        <p class="plan-desc">{{ plan.desc }}</p>
      </div>
    </div>

    <p class="pay-methods">{{ paymentMethods }}</p>
  </div>
</template>

<style scoped>
.plans {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.plan {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  padding: 18px;
  transition: border-color 0.2s;
}

.plan:hover {
  border-color: var(--vp-c-brand-1);
}

.plan-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 12px;
}

.plan-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.plan-price {
  flex-shrink: 0;
  font-size: 15px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
}

.plan-desc {
  margin: 14px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.pay-methods {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}
</style>
