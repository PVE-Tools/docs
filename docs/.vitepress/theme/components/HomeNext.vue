<script setup lang="ts">
import { iconArrowRight, iconBook, iconGraduationCap, iconLifeBuoy } from "../icons";

const entries = [
  {
    icon: iconBook,
    title: "使用指南",
    desc: "运行要求、高风险功能提醒与推荐运维路径。",
    link: "/guide/",
  },
  {
    icon: iconGraduationCap,
    title: "高级教程",
    desc: "GPU 直通、SR-IOV、跨版本升级、数据恢复等 10 篇专题。",
    link: "/tutorial/",
  },
  {
    icon: iconLifeBuoy,
    title: "遇到问题",
    desc: "常见问题速查，以及社群与付费支持入口。",
    link: "/guide/faq",
  },
];
</script>

<template>
  <section class="home-extra home-next">
    <h2 class="next-title">接下来</h2>

    <div class="next-grid">
      <a v-for="entry in entries" :key="entry.link" class="next-card" :href="entry.link">
        <span class="next-icon" v-html="entry.icon" />
        <span class="next-name">{{ entry.title }}</span>
        <span class="next-desc">{{ entry.desc }}</span>
        <span class="next-more">
          查看
          <span class="next-arrow" v-html="iconArrowRight" />
        </span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.home-next {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 48px;
}

.next-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.next-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.next-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
  transition: border-color 0.25s;
}

.next-card:hover {
  border-color: var(--vp-c-brand-1);
}

.next-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.next-name {
  margin-top: 14px;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.next-desc {
  flex: 1;
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.next-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.next-arrow {
  display: flex;
  transition: transform 0.2s;
}

.next-card:hover .next-arrow {
  transform: translateX(3px);
}
</style>
