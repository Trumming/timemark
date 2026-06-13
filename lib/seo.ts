/**
 * Structured data + citable editorial content for SEO and GEO
 * (Generative Engine Optimization — being cited by ChatGPT, Perplexity,
 * Google AI Overviews, etc.).
 *
 * The FAQ items below are written as plain, factual, self-contained statements
 * that a generative engine can quote directly. They are mirrored exactly in the
 * visible FAQ section (components/sections/FAQ.tsx) so the on-page prose and the
 * JSON-LD never disagree.
 */

import { siteConfig, SiteLocale } from './site'

export interface FaqItem {
  q: Record<SiteLocale, string>
  a: Record<SiteLocale, string>
}

/**
 * Frequently asked questions. Keep answers concise, factual and quotable.
 * Order matters for both the visible list and the JSON-LD array.
 */
export const faqItems: FaqItem[] = [
  {
    q: {
      zh: '什么是年度进度条？',
      en: 'What is a year progress bar?',
      ja: '年間進捗バーとは何ですか？',
    },
    a: {
      zh: '年度进度条是一种可视化工具，用来显示当前日历年已经过去了多少。时光印记（TimeMark）将「今年第几天」换算成百分比，让你直观地看到一年、一月、一周乃至人生的进度。',
      en: 'A year progress bar is a visual tool that shows how much of the current calendar year has elapsed. TimeMark converts the day of the year into a percentage so you can see, at a glance, how far through the year, month, week or even your lifetime you are.',
      ja: '年間進捗バーとは、現在の暦年がどれくらい進んだかを視覚化するツールです。時の刻印（TimeMark）は「今年で何日目か」をパーセンテージに換算し、年・月・週、さらに人生の進み具合をひと目で把握できます。',
    },
  },
  {
    q: {
      zh: '年度进度百分比是如何计算的？',
      en: 'How is the year progress percentage calculated?',
      ja: '年間進捗のパーセンテージはどのように計算されますか？',
    },
    a: {
      zh: '计算公式为：（今年已过天数 ÷ 今年总天数）× 100。其中「已过天数」从 1 月 1 日算起，并包含今天；「总天数」在平年为 365 天、闰年为 366 天。例如 7 月 2 日（平年第 183 天）约为 50.1%。',
      en: 'The formula is: (days elapsed in the year ÷ total days in the year) × 100. Days elapsed are counted from January 1st and include today; the total is 365 days in a common year and 366 in a leap year. For example, July 2nd (day 183 in a common year) is about 50.1%.',
      ja: '計算式は（今年の経過日数 ÷ 今年の総日数）× 100 です。経過日数は1月1日から数え、今日を含みます。総日数は平年で365日、閏年で366日です。例えば7月2日（平年の183日目）は約50.1%になります。',
    },
  },
  {
    q: {
      zh: '时光印记会上传或保存我的个人数据吗？',
      en: 'Does TimeMark upload or store my personal data?',
      ja: '時の刻印は個人のデータをアップロードや保存しますか？',
    },
    a: {
      zh: '不会。时光印记是纯前端应用，所有设置（包括出生日期）都只保存在你浏览器的 localStorage 中，不会上传到任何服务器。清除浏览器数据即可彻底删除。',
      en: 'No. TimeMark is a fully client-side application. All of your settings — including your birthdate — are stored only in your browser’s localStorage and are never uploaded to any server. Clearing your browser data removes them completely.',
      ja: 'いいえ。時の刻印は完全にクライアント側で動くアプリで、出生日を含むすべての設定はブラウザのlocalStorageにのみ保存され、サーバーへ送信されることはありません。ブラウザのデータを消去すれば完全に削除できます。',
    },
  },
  {
    q: {
      zh: '人生进度是如何计算的？',
      en: 'How is the lifetime progress calculated?',
      ja: '人生の進捗はどのように計算されますか？',
    },
    a: {
      zh: '人生进度以你填写的出生日期为起点，默认按 80 年预期寿命计算：（出生至今的天数 ÷ 80 年总天数）× 100。这只是一个温和的参照，用来提醒你时间珍贵，而非精确预测。',
      en: 'Lifetime progress starts from your birthdate and uses a default 80-year life expectancy: (days since birth ÷ total days in 80 years) × 100. It is a gentle reminder that time is precious, not a precise prediction.',
      ja: '人生の進捗は入力した生年月日を起点とし、既定の80年の平均寿命で計算します：（生まれてからの日数 ÷ 80年間の総日数）× 100。これは時間の尊さを思い出すための穏やかな目安であり、厳密な予測ではありません。',
    },
  },
  {
    q: {
      zh: '时光印记是免费的吗？需要注册吗？',
      en: 'Is TimeMark free? Do I need to sign up?',
      ja: '時の刻印は無料ですか？登録は必要ですか？',
    },
    a: {
      zh: '完全免费，也无需注册或登录。打开网页即可使用，支持中文、英文、日文三种界面，以及浅色 / 深色主题。源代码已在 GitHub 开源。',
      en: 'It is completely free, with no sign-up or login required. Just open the page and start using it. The interface supports Chinese, English and Japanese, plus light and dark themes, and the source code is open on GitHub.',
      ja: '完全に無料で、登録やログインは不要です。ページを開けばすぐに使えます。中国語・英語・日本語の3言語とライト／ダークテーマに対応し、ソースコードはGitHubで公開しています。',
    },
  },
]

/** About / “what is this” editorial copy — long-form, citable prose for GEO. */
export const aboutCopy: Record<SiteLocale, string[]> = {
  zh: [
    '时光印记（TimeMark）是一个极简的时间进度可视化工具。它把抽象的「时间」换算成你能一眼看懂的百分比：今年走完了多少、这个月还剩几天、这一周过了几分之几，甚至——你的人生已经走过了多少。',
    '我们相信，看见时间，才会珍惜时间。一个安静的数字，胜过千言万语的说教。所以这里没有花哨的弹窗、没有账号、没有追踪——只有你和此刻。',
    '所有数据都只存在你的浏览器里。随时清除，随时归零。',
  ],
  en: [
    'TimeMark is a minimal time-progress visualizer. It turns the abstract idea of “time” into a percentage you can read at a glance: how much of this year is gone, how many days remain this month, what fraction of the week has passed — and even how much of your lifetime has elapsed.',
    'We believe that seeing time is the first step to cherishing it. A single quiet number can say more than a thousand words of advice. So there are no flashy pop-ups, no accounts, no tracking — only you and this moment.',
    'Every setting lives only in your browser. Clear it any time and start fresh.',
  ],
  ja: [
    '時の刻印（TimeMark）は、ミニマルな時間進捗の可視化ツールです。「時間」という抽象的なものを、ひと目で分かるパーセンテージに変換します。今年はどれくらい進んだか、今月はあと何日か、今週は何分のいくつか——さらには人生がどれくらい過ぎたかまで。',
    '時間を見つめることこそ、時間を大切にする第一歩だと私たちは信じています。静かなひとつの数字が、千の言葉よりも多くを語ります。だから派手なポップアップも、アカウントも、追跡もありません——あるのはあなたと、この瞬間だけです。',
    'すべての設定はブラウザの中にだけ存在します。いつでも消して、いつでもリセットできます。',
  ],
}

/** “How it works” steps — factual, citable. */
export const howItWorks: Record<SiteLocale, { title: string; steps: string[] }> = {
  zh: {
    title: '它是如何工作的',
    steps: [
      '选择进度类型：年度、月度、周或人生。',
      '应用根据今天的日期，用 date-fns 计算已过天数与总天数。',
      '百分比 =（已过天数 ÷ 总天数）× 100，结果保留两位小数。',
      '你可以自定义颜色、形状与显示选项，设置保存在本地浏览器。',
    ],
  },
  en: {
    title: 'How it works',
    steps: [
      'Choose a progress type: year, month, week or lifetime.',
      'The app uses today’s date with date-fns to compute days elapsed and total days.',
      'Percentage = (days elapsed ÷ total days) × 100, rounded to two decimals.',
      'Customize colors, shape and display options — your settings are saved locally in the browser.',
    ],
  },
  ja: {
    title: '仕組み',
    steps: [
      '進捗タイプを選びます：年・月・週・人生。',
      '今日の日付をもとに、date-fns で経過日数と総日数を計算します。',
      'パーセンテージ =（経過日数 ÷ 総日数）× 100、小数第2位まで表示。',
      '色・形状・表示オプションを自由に設定でき、設定はブラウザに保存されます。',
    ],
  },
}

/** Editorial section labels (kicker + heading) for the on-page content. */
export const sectionLabels: Record<
  SiteLocale,
  { about: { kicker: string; title: string }; faq: { kicker: string; title: string } }
> = {
  zh: {
    about: { kicker: '关于', title: '一个安静的数字，胜过千言万语' },
    faq: { kicker: '常见问题', title: '关于时间进度，你可能想知道' },
  },
  en: {
    about: { kicker: 'About', title: 'One quiet number says more than a thousand words' },
    faq: { kicker: 'FAQ', title: 'Things you might want to know about time progress' },
  },
  ja: {
    about: { kicker: 'について', title: '静かなひとつの数字が、千の言葉に勝る' },
    faq: { kicker: 'よくある質問', title: '時間の進捗について、知りたいこと' },
  },
}

/** WebApplication JSON-LD — tells search/AI engines what this product is. */
export function webAppJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${siteConfig.name} · ${siteConfig.nameEn}`,
    alternateName: [siteConfig.name, siteConfig.nameEn],
    url: siteConfig.url,
    description: siteConfig.description.zh,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (web browser)',
    browserRequirements: 'Requires JavaScript. Requires an HTML5 compatible browser.',
    inLanguage: ['zh-CN', 'en', 'ja'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Year / month / week / lifetime progress',
      'Linear, circular and arc visualizations',
      'Light and dark themes',
      'Chinese, English and Japanese interface',
      'Local-only storage — no account, no tracking',
    ],
    author: { '@type': 'Person', name: siteConfig.author, url: siteConfig.social.github },
    publisher: { '@type': 'Person', name: siteConfig.author, url: siteConfig.social.github },
    isAccessibleForFree: true,
  }
}

/** FAQPage JSON-LD — highly cited by generative engines. Uses zh as canonical. */
export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q.zh,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a.zh,
      },
    })),
  }
}
