/**
 * 赞助者名单 — 仅用于鸣谢展示
 * 新增赞助者在数组开头追加一条记录即可（按时间倒序排列）
 */
export type Sponsor = {
  name: string;
  date: string;
  note?: string;
};

export const sponsors: Sponsor[] = [
  { name: "叶俊", date: "2026-07-01", note: "感谢分享，差点放弃了" },
  {
    name: "哈哈",
    date: "2026-06-01",
    note: "感谢群主提供这么好的QQ群平台，入群快一个月了学习了不少知识",
  },
  { name: "爱发电用户_c5059", date: "2026-06-01" },
  { name: "爱发电用户_tBmq", date: "2026-05-31", note: "群主辛苦了" },
  { name: "爱发电用户_XYaS", date: "2026-05-29", note: "感谢老铁！" },
  { name: "群聊(9)", date: "2026-05-18", note: "微信赞助" },
  { name: "匿名微信赞助", date: "2026-05-18" },
  {
    name: "爱发电用户_c5059",
    date: "2026-05-17",
    note: "全栈软件开发工作者，你的 PVE 工具很好用！忽略恶意的声音，坚持做正确的事情，加油！",
  },
  { name: "爱发电用户_ada9c", date: "2026-05-15", note: "自选发电" },
  { name: "爱发电用户_tBmq", date: "2026-05-15", note: "自选发电" },
  { name: "哈哈", date: "2026-05-15", note: "微信赞助" },
  { name: "哈哈", date: "2026-05-11", note: "微信赞助" },
  { name: "QQing", date: "2026-05-02", note: "微信赞助" },
  { name: "得得", date: "2026-05-01", note: "微信赞助" },
  { name: "美髯", date: "2026-04-29", note: "自选发电" },
];

/** 赞助渠道 */
export const sponsorChannels = [
  { name: "微信赞赏", icon: "/icons/wechat.svg", qr: "/sponsor/wechat.svg" },
  { name: "支付宝", icon: "/icons/alipay.svg", qr: "/sponsor/alipay.svg" },
  { name: "爱发电", icon: "/icons/afdian.svg", qr: "/sponsor/ifadian.svg" },
];

/** 赞助档位与权益 */
export const sponsorTiers = [
  {
    name: "基础支持",
    amount: "¥5 / 月",
    benefits: "纯粹的精神支持，助力项目持续更新。",
    audience: "使用过脚本并希望表示鼓励的用户",
  },
  {
    name: "进阶支持",
    amount: "¥28.88 / 月",
    benefits: "群内专属头衔，新功能**优先内测推送权**。",
    audience: "重度使用者，希望第一时间体验新特性",
  },
  {
    name: "核心支持者",
    amount: "¥50 / 月",
    benefits: "ID **永久刻入** GitHub README 赞助者名单。",
    audience: "希望在开源项目中留下印记的支持者",
  },
  {
    name: "自定义赞助",
    amount: "自选金额",
    benefits: "金额自由，全部用于服务器与运维开销。",
    audience: "希望灵活表达支持的用户",
  },
];

/** 付费技术支持定价 */
export const pricingPlans = [
  {
    name: "按次咨询",
    price: "¥9.9 / 次",
    desc: "一次性解答一个具体问题（如某条命令怎么写、某个报错的含义）。不含远程操作。",
  },
  {
    name: "按时长远程",
    price: "¥99 / 30 分钟",
    desc: "通过 ToDesk / AnyDesk / SSH 远程操作，按实际时长计费（不足 30 分钟按 30 分钟算）。",
  },
  {
    name: "全流程代配",
    price: "¥299 起",
    desc: "从安装 PVE、换源、直通、创建虚拟机到网络配置，一条龙完成。具体报价根据硬件和需求协商。",
  },
  {
    name: "紧急救砖",
    price: "¥199 / 次",
    desc: "系统无法启动、Web UI 打不开、内核 panic 等紧急情况，优先处理。",
  },
];

export const paymentMethods = "支持微信 / 支付宝 / 爱发电 / PayPal / Stripe";
