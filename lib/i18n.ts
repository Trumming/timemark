export type Language = 'zh' | 'en'

export const translations = {
  zh: {
    // 页面标题
    title: '年度进度条',
    subtitle: '可视化时间进度，珍惜每一刻',

    // 进度类型
    type_year: '年度进度',
    type_month: '月度进度',
    type_week: '周进度',
    type_lifetime: '人生进度',

    // 形状
    shape_linear: '线性',
    shape_circular: '圆形',
    shape_arc: '弧形',

    // 设置面板
    settings_title: '自定义选项',
    settings_description: '个性化你的进度条',
    progress_type: '进度类型',
    progress_shape: '进度条形状',
    color_theme: '颜色主题',
    primary_color: '主色调',
    background_color: '背景色',
    show_percentage: '显示百分比',
    show_days_remaining: '显示剩余天数',
    birth_date: '出生日期',
    show_settings: '显示设置',
    hide_settings: '隐藏设置',

    // 通知面板
    notification_title: '通知提醒',
    notification_description: '开启浏览器通知以接收提醒',
    notification_enabled: '通知已启用，您可以管理提醒设置',
    permission_granted: '通知权限已授予',
    permission_denied: '通知权限被拒绝',
    permission_default: '未请求通知权限',
    enable_notifications: '启用通知',
    enable_reminders: '启用提醒',
    reminder_frequency: '提醒频率',
    frequency_milestones: '里程碑提醒',
    frequency_daily: '每日提醒',
    frequency_weekly: '每周提醒',
    test_notification: '发送测试通知',

    // 分享面板
    share_title: '分享与导出',
    share_description: '分享进度或嵌入到你的网站',
    share_to_social: '分享到社交媒体',
    copy_share_text: '复制分享文本',
    export_image: '导出为图片',
    download_image: '下载进度条图片',
    embed_website: '嵌入到网站',
    embed_hint: '复制代码并粘贴到你的网站HTML中',

    // 历史面板
    history_title: '历史数据与分析',
    history_description: '查看你的进度历史和趋势',
    record_count: '记录次数',
    avg_progress: '平均进度',
    view_type: '查看类型',
    view_all: '全部',
    record_current: '记录当前进度',
    clear_history: '清空',
    no_history: '暂无历史记录',

    // 通用
    days_passed: '已过',
    days_remaining: '剩余',
    days: '天',
    privacy_note: '数据保存在本地浏览器，不会上传到服务器',
    footer_note: '使用 Next.js + React + Tailwind CSS 构建',

    // 激励消息
    msg_start: '刚刚开始，全新的一年！',
    msg_early: '起步阶段，保持动力！',
    msg_good_start: '良好的开始，继续前进！',
    msg_quarter: '已过四分之一，稳步推进！',
    msg_half: '上半年已过，年过半！',
    msg_sprint: '冲刺阶段，最后冲刺！',
    msg_almost: '即将完成，最后坚持！',
    msg_complete: '已结束，感谢这一年！',
  },
  en: {
    // Page titles
    title: 'Year Progress Bar',
    subtitle: 'Visualize time progress, cherish every moment',

    // Progress types
    type_year: 'Year Progress',
    type_month: 'Month Progress',
    type_week: 'Week Progress',
    type_lifetime: 'Lifetime Progress',

    // Shapes
    shape_linear: 'Linear',
    shape_circular: 'Circular',
    shape_arc: 'Arc',

    // Settings panel
    settings_title: 'Customize Options',
    settings_description: 'Personalize your progress bar',
    progress_type: 'Progress Type',
    progress_shape: 'Progress Shape',
    color_theme: 'Color Theme',
    primary_color: 'Primary Color',
    background_color: 'Background Color',
    show_percentage: 'Show Percentage',
    show_days_remaining: 'Show Days Remaining',
    birth_date: 'Birth Date',
    show_settings: 'Show Settings',
    hide_settings: 'Hide Settings',

    // Notification panel
    notification_title: 'Notifications',
    notification_description: 'Enable browser notifications to receive reminders',
    notification_enabled: 'Notifications enabled, you can manage reminder settings',
    permission_granted: 'Notification permission granted',
    permission_denied: 'Notification permission denied',
    permission_default: 'Notification permission not requested',
    enable_notifications: 'Enable Notifications',
    enable_reminders: 'Enable Reminders',
    reminder_frequency: 'Reminder Frequency',
    frequency_milestones: 'Milestone Reminders',
    frequency_daily: 'Daily Reminders',
    frequency_weekly: 'Weekly Reminders',
    test_notification: 'Send Test Notification',

    // Share panel
    share_title: 'Share & Export',
    share_description: 'Share progress or embed to your website',
    share_to_social: 'Share to Social Media',
    copy_share_text: 'Copy Share Text',
    export_image: 'Export as Image',
    download_image: 'Download Progress Image',
    embed_website: 'Embed to Website',
    embed_hint: 'Copy code and paste to your website HTML',

    // History panel
    history_title: 'History & Analytics',
    history_description: 'View your progress history and trends',
    record_count: 'Records',
    avg_progress: 'Average Progress',
    view_type: 'View Type',
    view_all: 'All',
    record_current: 'Record Current Progress',
    clear_history: 'Clear',
    no_history: 'No history records yet',

    // Common
    days_passed: 'Passed',
    days_remaining: 'Remaining',
    days: 'days',
    privacy_note: 'Data stored locally in browser, not uploaded to server',
    footer_note: 'Built with Next.js + React + Tailwind CSS',

    // Motivational messages
    msg_start: 'Just started, a brand new year!',
    msg_early: 'Early stage, keep the momentum!',
    msg_good_start: 'Good start, keep moving forward!',
    msg_quarter: 'Quarter passed, steady progress!',
    msg_half: 'Half year passed!',
    msg_sprint: 'Sprint stage, final push!',
    msg_almost: 'Almost there, last effort!',
    msg_complete: 'Year ended, thank you!',
  },
}

export function t(lang: Language, key: keyof typeof translations.zh): string {
  return translations[lang][key] || key
}
