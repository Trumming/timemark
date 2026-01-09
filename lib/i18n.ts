export type Locale = 'zh' | 'en' | 'ja'

export interface Translations {
  // Header
  appName: string
  appTagline: string
  toggleTheme: string

  // Progress Types
  progressTypes: {
    year: string
    month: string
    week: string
    lifetime: string
  }

  // Shapes
  shapes: {
    linear: string
    circular: string
    arc: string
  }

  // Messages
  messages: {
    beginning: string
    earlyStage: string
    goodStart: string
    quarterWay: string
    halfWay: string
    threeQuarter: string
    finalStretch: string
    almostThere: string
    complete: string
    setBirthdate: string
  }

  // Settings
  settings: {
    title: string
    description: string
    progressType: string
    shape: string
    colorTheme: string
    primaryColor: string
    backgroundColor: string
    showPercentage: string
    showDaysRemaining: string
    birthdate: string
  }

  // Panels
  panels: {
    settings: string
    notifications: string
    share: string
    history: string
  }

  // Days
  daysPassed: string
  daysRemaining: string
  day: string

  // Milestones
  milestoneStart: string
  milestone10: string
  milestone25: string
  milestone50: string
  milestone75: string
  milestone90: string
  milestone99: string
  milestone100: string

  // Footer
  privacyNote: string
  builtWith: string

  // Common
  close: string
  save: string
  cancel: string
  test: string
}

export const translations: Record<Locale, Translations> = {
  zh: {
    appName: '时光印记',
    appTagline: '温柔记录时光流转',
    toggleTheme: '切换主题',

    progressTypes: {
      year: '年度',
      month: '本月',
      week: '本周',
      lifetime: '人生',
    },

    shapes: {
      linear: '线性',
      circular: '圆形',
      arc: '弧形',
    },

    messages: {
      beginning: '新的旅程，温柔开始',
      earlyStage: '起步阶段，保持从容',
      goodStart: '美好的开始，继续前行',
      quarterWay: '四分之一已过，稳步前进',
      halfWay: '时光过半，依然从容',
      threeQuarter: '旅程丰富，继续探索',
      finalStretch: '最后一段，享受此刻',
      almostThere: '即将完成，珍惜当下',
      complete: '周期圆满，新的开始',
      setBirthdate: '请设置出生日期',
    },

    settings: {
      title: '个性化设置',
      description: '调整您的时光记录',
      progressType: '进度类型',
      shape: '显示形状',
      colorTheme: '颜色主题',
      primaryColor: '主色调',
      backgroundColor: '背景色',
      showPercentage: '显示百分比',
      showDaysRemaining: '显示天数',
      birthdate: '出生日期',
    },

    panels: {
      settings: '设置',
      notifications: '提醒',
      share: '分享',
      history: '历史',
    },

    daysPassed: '已过',
    daysRemaining: '剩余',
    day: '天',

    milestoneStart: '🌱 旅程开启',
    milestone10: '🌿 已达一成，继续从容',
    milestone25: '🍃 四分之一，稳步前行',
    milestone50: '🌳 时光过半，依然优雅',
    milestone75: '🌾 四分之三，收获满满',
    milestone90: '🌙 接近圆满，享受此刻',
    milestone99: '✨ 即将完成，珍惜当下',
    milestone100: '🎊 圆满完成，新的开始',

    privacyNote: '数据保存在本地，保护您的隐私',
    builtWith: '用心构建',

    close: '关闭',
    save: '保存',
    cancel: '取消',
    test: '测试',
  },

  en: {
    appName: 'Time Gentle',
    appTagline: 'Gracefully tracking time\'s flow',
    toggleTheme: 'Toggle Theme',

    progressTypes: {
      year: 'Yearly',
      month: 'Monthly',
      week: 'Weekly',
      lifetime: 'Lifetime',
    },

    shapes: {
      linear: 'Linear',
      circular: 'Circular',
      arc: 'Arc',
    },

    messages: {
      beginning: 'A new journey begins gently',
      earlyStage: 'Early stage, stay composed',
      goodStart: 'Beautiful start, keep flowing',
      quarterWay: 'Quarter passed, moving steadily',
      halfWay: 'Halfway through, still graceful',
      threeQuarter: 'Journey rich, keep exploring',
      finalStretch: 'Final stretch, enjoy this moment',
      almostThere: 'Almost there, cherish now',
      complete: 'Cycle complete, new beginning',
      setBirthdate: 'Please set your birthdate',
    },

    settings: {
      title: 'Personalize',
      description: 'Adjust your time tracking',
      progressType: 'Progress Type',
      shape: 'Display Shape',
      colorTheme: 'Color Theme',
      primaryColor: 'Primary Color',
      backgroundColor: 'Background',
      showPercentage: 'Show Percentage',
      showDaysRemaining: 'Show Days',
      birthdate: 'Birthdate',
    },

    panels: {
      settings: 'Settings',
      notifications: 'Notifications',
      share: 'Share',
      history: 'History',
    },

    daysPassed: 'Passed',
    daysRemaining: 'Remaining',
    day: 'days',

    milestoneStart: '🌱 Journey begins',
    milestone10: '🌿 10% complete, stay peaceful',
    milestone25: '🍃 Quarter done, steady flow',
    milestone50: '🌳 Halfway there, still graceful',
    milestone75: '🌾 Three quarters, abundant journey',
    milestone90: '🌙 Near completion, enjoy now',
    milestone99: '✨ Almost complete, cherish this',
    milestone100: '🎊 Complete, new beginning',

    privacyNote: 'Data stored locally, privacy respected',
    builtWith: 'Built with care',

    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    test: 'Test',
  },

  ja: {
    appName: '時の流れ',
    appTagline: '時の流れを優しく記録',
    toggleTheme: 'テーマ変更',

    progressTypes: {
      year: '年間',
      month: '月間',
      week: '週間',
      lifetime: '人生',
    },

    shapes: {
      linear: 'リニア',
      circular: 'サークル',
      arc: 'アーク',
    },

    messages: {
      beginning: '新しい旅の優しい始まり',
      earlyStage: '初期段階、落ち着いて',
      goodStart: '美しい始まり、流れに乗って',
      quarterWay: '四分の一、着実に前進',
      halfWay: '半分過ぎ、まだ優雅に',
      threeQuarter: '豊かな旅、探索を続けて',
      finalStretch: '最後の区間、今を楽しんで',
      almostThere: 'もうすぐ、今を大切に',
      complete: '周期が完了、新しい始まり',
      setBirthdate: '生年月日を設定してください',
    },

    settings: {
      title: '個人設定',
      description: '時間記録を調整',
      progressType: '進捗タイプ',
      shape: '表示形状',
      colorTheme: 'カラーテーマ',
      primaryColor: 'メインカラー',
      backgroundColor: '背景色',
      showPercentage: '百分比表示',
      showDaysRemaining: '日数表示',
      birthdate: '生年月日',
    },

    panels: {
      settings: '設定',
      notifications: '通知',
      share: '共有',
      history: '履歴',
    },

    daysPassed: '経過',
    daysRemaining: '残り',
    day: '日',

    milestoneStart: '🌱 旅の始まり',
    milestone10: '🌿 10%達成、穏やかに',
    milestone25: '🍃 四分の一、着実に',
    milestone50: '🌳 半分、優雅に',
    milestone75: '🌾 四分の三、豊かな旅',
    milestone90: '🌙 もうすぐ、今を楽しんで',
    milestone99: '✨ 間もなく、今を大切に',
    milestone100: '🎊 完了、新しい始まり',

    privacyNote: 'データはローカル保存、プライバシーを尊重',
    builtWith: '丁寧に構築',

    close: '閉じる',
    save: '保存',
    cancel: 'キャンセル',
    test: 'テスト',
  },
}

export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

export function getMotivationalMessage(percentage: number, locale: Locale): string {
  const msgs = translations[locale].messages

  if (percentage === 0) return msgs.beginning
  if (percentage < 10) return msgs.earlyStage
  if (percentage < 25) return msgs.goodStart
  if (percentage < 50) return msgs.quarterWay
  if (percentage < 75) return msgs.halfWay
  if (percentage < 90) return msgs.threeQuarter
  if (percentage < 100) return msgs.finalStretch
  return msgs.complete
}

export function getMilestoneMessage(percentage: number, locale: Locale): string | null {
  const milestones = [1, 10, 25, 50, 75, 90, 99, 100]
  const msgs = translations[locale]

  for (const milestone of milestones) {
    if (Math.abs(percentage - milestone) < 0.5) {
      switch (milestone) {
        case 1: return msgs.milestoneStart
        case 10: return msgs.milestone10
        case 25: return msgs.milestone25
        case 50: return msgs.milestone50
        case 75: return msgs.milestone75
        case 90: return msgs.milestone90
        case 99: return msgs.milestone99
        case 100: return msgs.milestone100
      }
    }
  }

  return null
}
