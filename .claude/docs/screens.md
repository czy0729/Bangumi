# 页面索引

> 新增或修改页面时，同步更新此文件。

## Discovery

adv, anime, anitama, award, bi-weekly, blog, browser, calendar, catalog, catalog-detail, channel, character, dollars, game, hentai, like, manga, music, nsfw, pic, rank, recommend, search, series, staff, tags, users, vib, wenku, wiki, word-cloud, yearbook

## Home

catalogs, characters, episodes, info, link, mono, overview, persons, preview, rating, subject, tag, typerank, v2, voices, wiki, works

### v2（首页）

COMPONENT: `Home`，NAMESPACE: `ScreenHomeV2`

用户登录后的主页面，展示在看/在玩的收藏条目，支持 5 个分类 tab：全部/动画/书籍/三次元/游戏。

**Store 关键状态**：
- `top: SubjectId[]` — 置顶条目
- `item: Record<SubjectId, { expand, doing }>` — 每个条目的展开/进行中状态
- `page` — 当前 tab 页码
- `grid` — 网格布局选中的 subjectId
- `filter` — 各 tab 的筛选文本
- `visible`, `modal`, `progress` — 弹窗/进度等瞬态

**Store 主要方法**：
- `init()` — 加载缓存 → 延迟 4s 拉取最新数据
- `fetchSubject()` — 单条目拉取（6h 缓存）
- `fetchSubjectsQueue()` — 批量队列拉取
- `doWatchedNextEp()` — 标记下一集已看
- `doUpdateSubjectWatched()` — 批量更新看到第几集
- `doSaveCalenderEvent()` / `doExportCalenderEventICS()` — 日历提醒
- `itemToggleExpand()` / `itemToggleTop()` — 展开/置顶

**子组件**：
- `tab/` — Tab 切换（支持 2+ tab 用 Tab 组件，1 tab 直接渲染）
- `list/` — 列表布局（每条 item 可展开显示章节按钮）
- `grid/` — 网格布局（含 info 子组件：eps/cover/title/toolbar 等）
- `item/` — 条目项（cover/eps/count/title/toolbar/onair/progress 等拆分）
- `filter/` — 筛选栏
- `modal/` — 收藏管理弹窗
- `tips/` — 提示条
- `heatmaps/` — 热力图
- `time/` — 时间显示
- `is-top/` — 置顶标识
- `empty/` — 空状态

## Login

assist, token, v2

## Rakuen

blog, board, group, history, mine, notify, reviews, search, setting, topic, ugc-agree, v2

## Timeline

say, v2

## Tinygrail

advance, advance-ask, advance-auction, advance-auction2, advance-bid, advance-sacrifice, advance-state, bid, chara-assets, clipboard, deal, ico, ico-deal, items, logs, lottery-rank, new-bangumi, overview, relation, rich, sacrifice, search, star, temples, top-week, trade, transaction, tree, tree-rich, valhall, wiki

## User

actions, backup, blogs, catalogs, dev, friends, milestone, origin-setting, pm, qiafan, server-status, setting, smb, sponsor, timeline, user-setting, v2, zone

## WebView

bilibili-sync, douban-sync, information, log, playground, share, tips, versions, web-browser, webhook
