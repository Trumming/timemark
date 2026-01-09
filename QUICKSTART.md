# 快速启动指南

## 启动应用

等待 npm install 完成后，执行以下命令：

```bash
npm run dev
```

然后在浏览器打开：http://localhost:3000

## 功能清单

### 主界面
- 📊 **进度条展示**: 自动显示当前年度进度
- 🎨 **形状切换**: 线性/圆形/弧形
- 🌓 **暗黑模式**: 点击右上角月亮图标切换

### 设置面板（点击"显示设置"）
1. **进度类型**
   - 年度进度（默认）
   - 月度进度
   - 周进度
   - 人生进度（需设置出生日期）

2. **颜色主题**
   - 6种预设：蓝色、紫色、绿色、红色、橙色、青色
   - 自定义颜色

3. **显示选项**
   - 显示百分比
   - 显示剩余天数

### 通知面板
1. 点击"启用通知"按钮
2. 允许浏览器通知权限
3. 选择提醒频率：
   - 里程碑提醒（推荐）
   - 每日提醒
   - 每周提醒

### 历史面板
- 点击"记录当前进度"保存当前进度
- 查看历史趋势
- 查看统计数据

### 分享面板
- 分享到 Twitter/微博
- 复制分享文本
- 复制嵌入代码到你的网站

## 常见问题

### Q: 依赖安装慢？
A: 可以使用国内镜像：
```bash
npm install --registry=https://registry.npmmirror.com
```

### Q: 端口被占用？
A: 修改端口：
```bash
npm run dev -- -p 3001
```

### Q: 构建失败？
A: 删除 node_modules 和 package-lock.json 后重新安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `app/page.tsx` | 主页面，整合所有功能 |
| `lib/progress.ts` | 核心计算逻辑 |
| `components/ProgressBar/` | 三种进度条组件 |
| `components/SettingsPanel.tsx` | 设置面板 |
| `components/NotificationPanel.tsx` | 通知面板 |
| `components/SharePanel.tsx` | 分享面板 |
| `components/HistoryPanel.tsx` | 历史面板 |

## 自定义开发

### 修改主题颜色
编辑 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary: 221.2 83.2% 53.3%;  /* 主色调 */
  --secondary: 210 40% 96.1%;    /* 次要色 */
  /* ... */
}
```

### 添加新的进度类型
编辑 `lib/progress.ts` 中的 `calculateProgress` 函数。

### 添加新的语言
编辑 `lib/i18n.ts` 添加新的翻译。

## 部署

### Vercel（推荐）
1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

### 静态托管
1. 修改 `next.config.js` 添加 `output: 'export'`
2. 运行 `npm run build`
3. 将 `out` 目录部署到任何静态托管服务

## 支持

如有问题，请查看：
- README.md - 项目详细说明
- PROJECT_SUMMARY.md - 完整项目总结

---

享受使用！珍惜每一刻时光 ⏳
