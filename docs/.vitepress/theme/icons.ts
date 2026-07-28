/**
 * 站内图标（Lucide，MIT）
 * 统一走 currentColor，跟随主题色，不使用 emoji
 */
const svg = (body: string, size = 16) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;

const stroke = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"';

export const iconArrowRight = svg(`<path ${stroke} d="M5 12h14m-7-7l7 7l-7 7"/>`);

export const iconCopy = svg(
  `<g ${stroke}><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></g>`
);

export const iconCheck = svg(`<path ${stroke} d="M20 6L9 17l-5-5"/>`);

export const iconTerminal = svg(`<path ${stroke} d="M12 19h8M4 17l6-6l-6-6"/>`);

export const iconBook = svg(
  `<path ${stroke} d="M12 7v14m-9-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3z"/>`,
  20
);

export const iconGraduationCap = svg(
  `<g ${stroke}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></g>`,
  20
);

export const iconLifeBuoy = svg(
  `<g ${stroke}><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93l4.24 4.24m5.66 0l4.24-4.24m-4.24 9.9l4.24 4.24m-9.9-4.24l-4.24 4.24"/><circle cx="12" cy="12" r="4"/></g>`,
  20
);
