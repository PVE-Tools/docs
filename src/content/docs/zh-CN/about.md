---
title: 关于网站
description: PVE Tools Pro 文档站点技术栈与基础设施信息
head:
  - tag: style
    content: |
      .hero-bg { display: none !important; }
      .content-panel { max-width: 70rem !important; margin: auto; padding: 1.5rem 2rem !important; }
      #_top { text-align: center; font-size: 4rem; padding-bottom: 3rem; }
      .cf-protected { display: flex; justify-content: center; margin: 3rem 0; }
      .cf-protected img { height: 80px; width: auto; }
      .sl-markdown-content h2 { text-align: center; display: block !important; }
      .tech-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
      .tech-grid > * { margin-top: 0; }
      .tech-card { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; background: color-mix(in srgb, var(--sl-color-gray-6) 10%, transparent); border-radius: 0.75rem; border: 1px solid color-mix(in srgb, var(--sl-color-gray-6) 20%, transparent); transition: all 0.2s ease; }
      .tech-card:hover { border-color: var(--sl-color-gray-4); transform: translateY(-2px); }
      .tech-card svg { width: 36px; height: 36px; flex-shrink: 0; fill: currentColor; color: var(--sl-color-white); }
      .tech-card .tech-info { flex: 1; }
      .tech-card .tech-name { font-weight: 600; color: var(--sl-color-white); font-size: 1rem; display: block; margin-bottom: 0.25rem; }
      .tech-card .tech-desc { color: var(--sl-color-gray-3); font-size: 0.875rem; line-height: 1.4; }
      .infra-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
      .infra-grid > * { margin-top: 0; }
      .infra-card { padding: 1.5rem; background: color-mix(in srgb, var(--sl-color-gray-6) 10%, transparent); border-radius: 0.75rem; border: 1px solid color-mix(in srgb, var(--sl-color-gray-6) 20%, transparent); }
      .infra-card h3 { margin: 0 0 0.75rem 0; font-size: 1rem; color: var(--sl-color-white); display: flex; align-items: center; gap: 0.5rem; }
      .infra-card h3 svg { color: var(--sl-color-white); }
      .infra-card p { margin: 0; color: var(--sl-color-gray-3); font-size: 0.875rem; line-height: 1.6; }
      .infra-card a { color: var(--sl-color-text-accent); text-decoration: none; }
      .infra-card a:hover { text-decoration: underline; }
      [data-theme="light"] .tech-card { background: #f8fafc; border-color: #e2e8f0; }
      [data-theme="light"] .tech-card:hover { border-color: #cbd5e1; }
      [data-theme="light"] .tech-card svg { color: #0f172a; }
      [data-theme="light"] .tech-card .tech-name { color: #0f172a; }
      [data-theme="light"] .tech-card .tech-desc { color: #475569; }
      [data-theme="light"] .infra-card { background: #f8fafc; border-color: #e2e8f0; }
      [data-theme="light"] .infra-card h3 { color: #0f172a; }
      [data-theme="light"] .infra-card h3 svg { color: #0f172a; }
      [data-theme="light"] .infra-card p { color: #475569; }
---

## 技术栈

<div class="tech-grid">
  <div class="tech-card">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z"/></svg>
    <div class="tech-info">
      <span class="tech-name">Astro 6</span>
      <span class="tech-desc">静态站点生成框架，构建高性能内容站点</span>
    </div>
  </div>
  <div class="tech-card">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 19.5h20L12 2zm0 4l7 13.5H5L12 6z"/></svg>
    <div class="tech-info">
      <span class="tech-name">Starlight</span>
      <span class="tech-desc">Astro 官方文档主题，提供完整组件系统</span>
    </div>
  </div>
  <div class="tech-card">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>
    <div class="tech-info">
      <span class="tech-name">Tailwind CSS 4</span>
      <span class="tech-desc">原子化 CSS 工具类，快速构建响应式界面</span>
    </div>
  </div>
  <div class="tech-card">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z"/></svg>
    <div class="tech-info">
      <span class="tech-name">Vite 7</span>
      <span class="tech-desc">下一代前端构建工具，极速开发体验</span>
    </div>
  </div>
  <div class="tech-card">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>
    <div class="tech-info">
      <span class="tech-name">TypeScript</span>
      <span class="tech-desc">类型安全的开发语言，提升代码质量</span>
    </div>
  </div>
  <div class="tech-card">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M10.715 14.32H5.442l-.64-1.203L13.673 0l1.397.579-1.752 9.112h5.24l.648 1.192L10.719 24l-1.412-.54ZM4.091 5.448a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.543 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm1.544 0a.5787.5787 0 1 1 0-1.1574.5787.5787 0 0 1 0 1.1574zm8.657-2.7h5.424l.772.771v16.975l-.772.772h-7.392l.374-.579h6.779l.432-.432V3.758l-.432-.432h-4.676l-.552 2.85h-.59l.529-2.877.108-.552ZM2.74 21.265l-.772-.772V3.518l.772-.771h7.677l-.386.579H2.98l-.432.432v16.496l.432.432h5.586l-.092.579zm1.157-1.93h3.28l-.116.58h-3.55l-.192-.193v-3.473l.578 1.158zm13.117 0 .579.58H14.7l.385-.58z"/></svg>
    <div class="tech-info">
      <span class="tech-name">Cloudflare Pages</span>
      <span class="tech-desc">全球边缘网络静态托管，自动 CI/CD</span>
    </div>
  </div>
</div>

## 基础设施

本项目由以下服务提供支撑：

<div class="infra-grid">
  <div class="infra-card">
    <h3>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
      托管与部署
    </h3>
    <p><a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a> - 全球边缘网络静态托管，自动 CI/CD，毫秒级全球访问</p>
  </div>
  <div class="infra-card">
    <h3>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
      源代码
    </h3>
    <p><a href="https://github.com/PVE-Tools/PVE-Tools-9" target="_blank">GitHub</a> - 开源代码托管，版本控制与协作开发</p>
  </div>
  <div class="infra-card">
    <h3>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      域名与 DNS
    </h3>
    <p><a href="https://www.cloudflare.com" target="_blank">Cloudflare</a> - 全球 DNS 解析，DDoS 防护，安全加速</p>
  </div>
  <div class="infra-card">
    <h3>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      搜索服务
    </h3>
    <p><a href="https://pagefind.app" target="_blank">Pagefind</a> - 客户端全文搜索，构建时生成索引，零运行时依赖</p>
  </div>
</div>

<div class="cf-protected">
  <img src="/src/assets/BDES-5287_ProtectedByCloudflareBadge_web_badges_5.png" alt="Protected by Cloudflare" />
</div>
