/**
 * Single source of truth for site-wide identity, URLs and social links.
 *
 * Used by SEO metadata, JSON-LD structured data, sitemap, robots and llms.txt
 * so every crawler, social scraper and generative engine reads the same facts.
 *
 * `basePath` ("/timemark") mirrors next.config.js — the static export is served
 * from a sub-path (GitHub Pages). Absolute canonical URLs include it.
 */

export const siteConfig = {
  name: '时光印记',
  nameEn: 'TimeMark',
  /** Canonical origin, including the basePath the static export is served from. */
  url: 'https://trumming.github.io/timemark',
  /** Sub-path from next.config.js — used to prefix asset/sitemap URLs. */
  basePath: '/timemark',
  tagline: {
    zh: '温柔记录时光流转 — 年度、月度、周与人生进度可视化',
    en: 'Gracefully track the flow of time — year, month, week & lifetime progress',
    ja: '時の流れを優しく記録 — 年・月・週・人生の進捗を可視化',
  },
  description: {
    zh: '时光印记是一个极简的时间进度可视化工具：实时计算今年、本月、本周以及人生的进度百分比，提醒你珍惜每一刻。所有数据保存在本地浏览器，保护隐私。',
    en: 'TimeMark is a minimal time-progress visualizer. It calculates in real time how much of this year, month, week and your lifetime has elapsed, reminding you to cherish every moment. All data stays in your browser — fully private.',
    ja: '時の刻印（TimeMark）は、今年・今月・今週・そして人生の進み具合をリアルタイムで計算するミニマルな時間進捗ツールです。すべてのデータはブラウザにローカル保存され、プライバシーを守ります。',
  },
  author: 'Trumming',
  locale: 'zh-CN',
  locales: ['zh-CN', 'en', 'ja'] as const,
  social: {
    github: 'https://github.com/Trumming/timemark',
    x: 'https://x.com/xcm0215',
  },
} as const

export type SiteLocale = 'zh' | 'en' | 'ja'
