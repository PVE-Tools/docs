<template>
  <aside class="domain-migration-notice" role="note">
    <span class="dm-mark" aria-hidden="true">!</span>
    <div class="dm-body">
      <p class="dm-title">域名已迁移：旧域名即将释放</p>
      <p class="dm-text">
        旧域名 <code>pve.u3u.icu</code> 已废弃，请使用
        <a href="https://pve.ciriu.com">pve.ciriu.com</a>。请删除旧书签，并检查
        hosts、DNS、反向代理与自动化脚本中的旧域名。
      </p>
    </div>
    <a class="dm-link" href="/about/domain-migration">查看公告 →</a>
  </aside>
</template>

<style scoped>
.domain-migration-notice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 592px;
  margin: 20px auto 0;
  padding: 14px 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-warning-1) 45%, transparent);
  border-radius: 10px;
  background-color: color-mix(in srgb, var(--vp-c-warning-1) 8%, var(--vp-c-bg));
  text-align: left;
}

.dm-mark {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border-radius: 50%;
  background-color: var(--vp-c-warning-1);
  color: var(--vp-c-bg);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.dm-body {
  flex: 1;
  min-width: 0;
}

.dm-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.dm-text {
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.dm-text code {
  padding: 1px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-default-soft);
  font-size: 12px;
}

.dm-text a {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: none;
}

.dm-text a:hover {
  text-decoration: underline;
}

.dm-link {
  flex-shrink: 0;
  margin-top: 1px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
  text-decoration: none;
}

.dm-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .domain-migration-notice {
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
  }

  .dm-link {
    margin-left: 34px;
  }
}
</style>
