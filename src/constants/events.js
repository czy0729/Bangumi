/*
 * 友盟埋点
 *
 * @Author: czy0729
 * @Date: 2019-12-17 10:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-10 15:05:59
 */

/**
 * 跳转: { to: 'Subject', from: 'block', ...other }
 */
export default {
  /* ==================== discovery ==================== */
  // - [x] Anitama
  'Anitama.跳转': 'Anitama.to',
  'Anitama.右上角菜单': 'Anitama.topRightMenu',
  'Anitama.上一页': 'Anitama.prev',
  'Anitama.下一页': 'Anitama.next',
  'Anitama.页码跳转': 'Anitama.doSearch',

  // - [x] 年鉴
  '年鉴.跳转': 'Award.to',

  // - [x] 索引
  '索引.跳转': 'Browser.to',
  '索引.右上角菜单': 'Browser.topRightMenu',
  '索引.标签页切换': 'Browser.onChange',
  '索引.类型选择': 'Browser.onSelect',
  '索引.年选择': 'Browser.onAirdateSelect',
  '索引.月选择': 'Browser.onMonthSelect',

  // - [x] 每日放送
  '每日放送.跳转': 'Calendar.to',
  '每日放送.右上角菜单': 'Calendar.topRightMenu',
  '每日放送.切换布局': 'Calendar.switchLayout',

  // - [x] 目录
  '目录.跳转': 'Catalog.to',
  '目录.切换类型': 'Catalog.toggleType',
  '目录.上一页': 'Catalog.prev',
  '目录.下一页': 'Catalog.next',
  '目录.页码跳转': 'Catalog.doSearch',
  '目录.提示': 'Catalog.alert',

  // - [x] 目录详情
  '目录详情.跳转': 'CatalogDetail.to',
  '目录详情.右上角菜单': 'CatalogDetail.topRightMenu',
  '目录详情.收藏': 'CatalogDetail.doCollect',
  '目录详情.取消收藏': 'CatalogDetail.doErase',
  '目录详情.封面图查看': 'CatalogDetail.imageView',

  // 收藏的人物
  '收藏的人物.跳转': 'Character.to',
  '收藏的人物.右上角菜单': 'Character.topRightMenu',
  '收藏的人物.标签页切换': 'Character.tabsChange',

  // 发现
  '发现.跳转': 'Discovery.to',

  // 随便看看
  '随便看看.跳转': 'Random.to',

  // 排行榜
  '排行榜.跳转': 'Rank.to',
  '排行榜.右上角菜单': 'Rank.topRightMenu',
  '排行榜.类型选择': 'Rank.onTypeSelect',
  '排行榜.筛选选择': 'Rank.onFilterSelect',
  '排行榜.年选择': 'Rank.onAirdateSelect',
  '排行榜.月选择': 'Rank.onMonthSelect',
  '排行榜.切换布局': 'Rank.toggleList',
  '排行榜.上一页': 'Rank.prev',
  '排行榜.下一页': 'Rank.next',
  '排行榜.页码跳转': 'Rank.doSearch',

  // 搜索
  '搜索.跳转': 'Search.to',
  '搜索.右上角菜单': 'Search.topRightMenu',
  '搜索.切换类型': 'Search.onSelect',
  '搜索.选择历史': 'Search.selectHistory',
  '搜索.删除历史': 'Search.deleteHistory',
  '搜索.搜索': 'Search.doSearch',
  '搜索.切换细分类型': 'Search.onLegacySelect',

  // 标签索引
  '标签索引.跳转': 'Tags.to',
  '标签索引.右上角菜单': 'Tags.topRightMenu',
  '标签索引.标签页切换': 'Tags.tabsChange',

  // 全站日志
  '全站日志.跳转': 'DiscoveryBlog.to',
  '全站日志.右上角菜单': 'DiscoveryBlog.topRightMenu',
  '全站日志.标签页切换': 'DiscoveryBlog.tabsChange',
  '全站日志.上一页': 'DiscoveryBlog.prev',
  '全站日志.下一页': 'DiscoveryBlog.next',
  '全站日志.页码跳转': 'DiscoveryBlog.doSearch',

  // 频道
  '频道.跳转': 'Channel.to',
  '频道.右上角菜单': 'Channel.topRightMenu',

  /* ==================== home ==================== */
  // 首页
  '首页.跳转': 'Home.to',
  '首页.标签页点击': 'Home.tabsPress',
  '首页.标签页切换': 'Home.tabsChange',
  '首页.显示收藏管理': 'Home.showManageModal',
  '首页.展开或收起条目': 'Home.itemToggleExpand',
  '首页.置顶或取消置顶': 'Home.itemToggleTop',
  '首页.全部展开': 'Home.expandAll',
  '首页.全部关闭': 'Home.closeAll',
  '首页.选择布局': 'Home.selectLayout',
  '首页.格子布局条目选择': 'Home.selectGirdSubject',
  '首页.观看下一章节': 'Home.doWatchedNextEp',
  '首页.更新书籍下一个章节': 'Home.doUpdateNext',
  '首页.管理收藏': 'Home.doUpdateCollection',
  '首页.章节菜单操作': 'Home.doEpsSelect',
  '首页.章节按钮长按': 'Home.doEpsLongPress',

  // 人物
  '人物.跳转': 'Mono.to',
  '人物.右上角菜单': 'Mono.topRightMenu',
  '人物.收藏人物': 'Mono.doCollect',
  '人物.取消收藏人物': 'Mono.doEraseCollect',
  '人物.封面图查看': 'Mono.imageView',

  // 条目
  '条目.查看': 'Subject.view',
  '条目.跳转': 'Subject.to',
  '条目.显示收藏管理': 'Subject.showManageModel',
  '条目.章节倒序': 'Subject.toggleReverseEps',
  '条目.吐槽箱倒序': 'Subject.toggleReverseComments',
  '条目.书籍章节输入框改变': 'Subject.changeText',
  '条目.章节菜单操作': 'Subject.doEpsSelect',
  '条目.管理收藏': 'Subject.doUpdateCollection',
  '条目.更新书籍下一个章节': 'Subject.doUpdateNext',
  '条目.更新书籍章节': 'Subject.doUpdateBookEp',
  '条目.输入框更新章节': 'Subject.doUpdateSubjectEp',
  '条目.章节按钮长按': 'Subject.doEpsLongPress',
  '条目.跳到条目': 'Subject.toSubject',
  '条目.封面图查看': 'Subject.imageView',
  '条目.右上角菜单': 'Subject.topRightMenu',
  '条目.删除收藏': 'Subject.doEraseCollection',
  '条目.搜索源': 'Subject.searchEp',
  '条目.翻译简介': 'Subject.doTranslate',
  '条目.翻译曲目': 'Subject.doDiscTranslate',
  '条目.查看奖杯': 'Subject.toPSNINE',
  '条目.设置章节筛选': 'Subject.updateFilterEps',

  // 用户标签
  '用户标签.跳转': 'Tag.to',
  '用户标签.排序选择': 'Tag.onOrderSelect',
  '用户标签.年选择': 'Tag.onAirdateSelect',
  '用户标签.月选择': 'Tag.onMonthSelect',
  '用户标签.切换布局': 'Tag.toggleList',

  // 作品
  '作品.跳转': 'Works.to',
  '作品.右上角菜单': 'Works.topRightMenu',
  '作品.切换布局': 'Works.toggleList',
  '作品.排序选择': 'Works.onOrderSelect',
  '作品.职位选择': 'Works.onFilterSelect',

  // 角色
  '角色.跳转': 'Voices.to',
  '角色.右上角菜单': 'Voices.topRightMenu',
  '角色.职位选择': 'Voices.onFilterSelect',

  // 更多角色
  '更多角色.跳转': 'Characters.to',
  '更多角色.右上角菜单': 'Characters.topRightMenu',

  // 制作人员
  '制作人员.跳转': 'Persons.to',
  '制作人员.右上角菜单': 'Persons.topRightMenu',

  /* ==================== login ==================== */
  // 辅助登陆
  '辅助登陆.复制': 'Assist.copy',
  '辅助登陆.提交': 'Assist.submit',

  // 授权登陆
  '授权登陆.登陆': 'LoginV1.onLogin',
  '授权登陆.成功': 'LoginV1.onSuccess',
  '授权登陆.错误': 'LoginV1.onError',
  '授权登陆.乱逛': 'LoginV1.onOtherPage',

  // 登陆
  '登陆.跳转': 'Login.to',
  '登陆.游客访问': 'Login.onTour',
  '登陆.切换域名': 'Login.onSelect',
  '登陆.登陆': 'Login.onLogin',
  '登陆.成功': 'Login.onSuccess',
  '登陆.错误': 'Login.onError',
  '登陆.配置提示': 'Login.onTips',

  /* ==================== rakuen ==================== */
  // 超展开
  '超展开.跳转': 'Rakuen.to',
  '超展开.右上角菜单': 'Rakuen.topRightMenu',
  '超展开.标签页点击': 'Rakuen.tabsPress',
  '超展开.标签页切换': 'Rakuen.tabsChange',
  '超展开.小组菜单点击': 'Rakuen.onGroupMenuPress',
  '超展开.人物菜单点击': 'Rakuen.onMonoMenuPress',
  '超展开.项额外点击': 'Rakuen.onExtraSelect',
  '超展开.预读取': 'Rakuen.prefetch',
  '超展开.取消预读取': 'Rakuen.cancelPrefetch',

  // 小组
  '小组.跳转': 'Group.to',
  '小组.右上角菜单': 'Group.topRightMenu',
  '小组.上一页': 'Group.prev',
  '小组.下一页': 'Group.next',
  '小组.页码跳转': 'Group.doSearch',
  '小组.加入': 'Group.doJoin',
  '小组.退出': 'Group.doBye',
  '小组.封面图查看': 'Group.imageView',

  // 我的小组
  '我的小组.跳转': 'Mine.to',
  '我的小组.右上角菜单': 'Mine.topRightMenu',

  // 本地帖子
  '本地帖子.跳转': 'RakuenHistory.to',
  '本地帖子.切换收藏': 'RakuenHistory.toggleFavor',

  // 电波提醒
  '电波提醒.跳转': 'Notify.to',
  '电波提醒.右上角菜单': 'Notify.topRightMenu',
  '电波提醒.清除': 'Notify.clear',

  // 超展开设置
  '超展开设置.切换': 'RakuenSetting.switch',
  '超展开设置.取消关键字': 'RakuenSetting.cancelBlock',
  '超展开设置.取消用户': 'RakuenSetting.cancelUser',

  // 帖子
  '帖子.跳转': 'Topic.to',
  '帖子.右上角菜单': 'Topic.topRightMenu',
  '帖子.吐槽倒序': 'Topic.toggleReverseComments',
  '帖子.与我相关': 'Topic.toggleFilterMe',
  '帖子.好友相关': 'Topic.toggleFilterFriends',
  '帖子.显示评论框': 'Topic.showFixedTextarea',
  '帖子.设置收藏': 'Topic.setFavor',
  '帖子.回复': 'Topic.doReply',
  '帖子.回复失败': 'Topic.recoveryContent',
  '帖子.删除回复': 'Topic.doDeleteReply',
  '帖子.UCG': 'Topic.UCGAgree',
  '帖子.楼层跳转': 'Topic.scrollTo',
  '帖子.翻译内容': 'Topic.doTranslate',

  // 日志
  '日志.跳转': 'Blog.to',
  '日志.右上角菜单': 'Blog.topRightMenu',
  '日志.显示评论框': 'Blog.showFixedTextarea',
  '日志.回复': 'Blog.doReply',
  '日志.回复失败': 'Blog.recoveryContent',
  '日志.删除回复': 'Blog.doDeleteReply',
  '日志.楼层跳转': 'Blog.scrollTo',

  // 社区指导原则
  '社区指导原则.跳转': 'UCG.to',
  '社区指导原则.不同意': 'UCG.disagree',
  '社区指导原则.同意': 'UCG.agree',

  /* ==================== reader ==================== */
  // - [x] 漫画
  '漫画.初始化': 'Comic.init',
  '漫画.搜索章节': 'Comic.searchEps',
  '漫画.搜索图片': 'Comic.searchImages',
  '漫画.搜索': 'Comic.onSearch',

  /* ==================== timeline ==================== */
  // 时间胶囊
  '时间胶囊.跳转': 'Timeline.to',
  '时间胶囊.新吐槽': 'Timeline.say',
  '时间胶囊.标签页点击': 'Timeline.tabsPress',
  '时间胶囊.标签页切换': 'Timeline.tabsChange',
  '时间胶囊.切换类型': 'Timeline.onSelectScope',
  '时间胶囊.删除时间线': 'Timeline.doDelete',

  // 吐槽
  '吐槽.跳转': 'Say.to',
  '吐槽.右上角菜单': 'Say.topRightMenu',
  '吐槽.显示评论框': 'Say.showFixedTextarea',
  '吐槽.at': 'Say.at',
  '吐槽.新吐槽': 'Say.doSay',
  '吐槽.回复吐槽': 'Say.doReply',
  '吐槽.回复失败': 'Say.recoveryContent',

  /* ==================== tinygrail(T) ==================== */
  // 高级分析
  '高级分析.跳转': 'TAdvance.to',
  '高级分析.提示': 'TAdvance.alert',
  '卖一推荐.跳转': 'TAdvanceAsk.to',
  '卖一推荐.提示': 'TAdvanceAsk.alert',
  '买一推荐.跳转': 'TAdvanceBid.to',
  '买一推荐.提示': 'TAdvanceBid.alert',
  '竞拍推荐.跳转': 'TAdvanceAuction.to',
  '竞拍推荐.提示': 'TAdvanceAuction.alert',
  '献祭推荐.跳转': 'TAdvanceSacrifice.to',
  '献祭推荐.提示': 'TAdvanceSacrifice.alert',

  // 我的委托
  '我的委托.跳转': 'TBid.to',
  '我的委托.标签页切换': 'TBid.tabsChange',
  '我的委托.排序': 'TBid.onSortPress',
  '我的委托.取消拍卖': 'TBid.onAuctionCancel',

  // 我的持仓
  '我的持仓.跳转': 'TCharaAssets.to',
  '我的持仓.右上角菜单': 'TCharaAssets.topRightMenu',
  '我的持仓.标签页切换': 'TCharaAssets.tabsChange',
  '我的持仓.排序': 'TCharaAssets.onSortPress',
  '我的持仓.设置前往': 'TCharaAssets.onSelectGo',
  '我的持仓.批量献祭': 'TCharaAssets.doBatchSacrifice',

  // 交易
  '交易.跳转': 'TDeal.to',
  '交易.挂单': 'TDeal.doSubmit',
  '交易.取消挂单': 'TDeal.doCancel',
  '交易.一键取消挂单': 'TDeal.doCancelAll',
  '交易.切换买卖类型': 'TDeal.toggleType',
  '交易.展开收起记录': 'TDeal.toggleExpand',
  '交易.显示时间': 'TDeal.showTime',
  '交易.切换冰山': 'TDeal.switchIsIce',

  // ICO
  'ICO.跳转': 'TICO.to',
  'ICO.标签页切换': 'TICO.tabsChange',

  // ICO交易
  'ICO交易.跳转': 'TICODeal.to',
  'ICO交易.注资': 'TICODeal.doSubmit',
  'ICO交易.封面图查看': 'TICODeal.imageView',

  // 小圣杯
  '小圣杯.跳转': 'TIndex.to',
  '小圣杯.授权成功': 'TIndex.authSuccess',
  '小圣杯.授权失败': 'TIndex.authFail',
  '小圣杯.预测股息': 'TIndex.test',
  '小圣杯.刮刮乐': 'TIndex.lottery',
  '小圣杯.每周分红': 'TIndex.bonusWeek',
  '小圣杯.每日签到': 'TIndex.bonusDaily',
  '小圣杯.节日福利': 'TIndex.bonusHoliday',
  '小圣杯.缩略资金': 'TIndex.toggleShort',

  // 资金日志
  '资金日志.跳转': 'TLogs.to',
  '资金日志.标签页切换': 'TLogs.tabsChange',
  '资金日志.设置前往': 'TLogs.onSelectGo',

  // 新番榜单
  '新番榜单.跳转': 'TNew.to',
  '新番榜单.标签页切换': 'TNew.tabsChange',
  '新番榜单.排序': 'TNew.onSortPress',
  '新番榜单.设置前往': 'TNew.onSelectGo',

  // 热门榜单
  '热门榜单.跳转': 'TOverview.to',
  '热门榜单.标签页切换': 'TOverview.tabsChange',
  '热门榜单.排序': 'TOverview.onSortPress',
  '热门榜单.设置前往': 'TOverview.onSelectGo',

  // 番市首富
  '番市首富.跳转': 'TRich.to',
  '番市首富.标签页切换': 'TRich.tabsChange',

  // 资产重组
  '资产重组.跳转': 'TSacrifice.to',
  '资产重组.资产重组': 'TSacrifice.doSacrifice',
  '资产重组.竞拍': 'TSacrifice.doAuction',
  '资产重组.封面图查看': 'TSacrifice.imageView',
  '资产重组.圣殿图查看': 'TSacrifice.templeView',
  '资产重组.展开收起圣殿': 'TSacrifice.toggleExpand',
  '资产重组.股息查看': 'TSacrifice.rate',
  '资产重组.菜单改变竞拍数量': 'TSacrifice.changeAmountByMenu',
  '资产重组.展开收起封面': 'TSacrifice.toggleCover',
  '资产重组.展开收起记录': 'TSacrifice.toggleLogs',
  '资产重组.展开收起圣殿板块': 'TSacrifice.toggleTemples',
  '资产重组.展开收起董事会': 'TSacrifice.toggleUsers',

  // 人物直达
  '人物直达.跳转': 'TSearch.to',
  '人物直达.删除历史': 'TSearch.deleteHistory',
  '人物直达.搜索': 'TSearch.doSearch',

  // 最近圣殿
  '最近圣殿.跳转': 'TTemples.to',

  // K线
  'K线.跳转': 'TTrade.to',
  'K线.间隔': 'TTrade.changeDistance',

  // 资产分析
  '资产分析.选择范围': 'TTree.onTypeSelect',
  '资产分析.选择计算类型': 'TTree.onCaculateTypeSelect',
  '资产分析.选择筛选': 'TTree.onFilter',
  '资产分析.刷新': 'TTree.refresh',
  '资产分析.提醒': 'TTree.alert',
  '资产分析.人物菜单': 'TTree.onShowMenu',
  '资产分析.长按隐藏': 'TTree.onLongPressHide',

  // 前百首富
  '前百首富.刷新': 'TTreeRich.refresh',
  '前百首富.选择计算类型': 'TTreeRich.onCaculateTypeSelect',
  '前百首富.选择筛选': 'TTreeRich.onFilter',
  '前百首富.人物菜单': 'TTreeRich.onShowMenu',
  '前百首富.长按隐藏': 'TTreeRich.onLongPressHide',

  // 英灵殿
  '英灵殿.跳转': 'TValhall.to',
  '英灵殿.标签页切换': 'TValhall.tabsChange',
  '英灵殿.排序': 'TValhall.onSortPress',
  '英灵殿.设置前往': 'TValhall.onSelectGo',

  // 我的道具
  '我的道具.使用': 'TItems.use',

  // 每周萌王
  '每周萌王.跳转': 'TTopWeek.to',
  '每周萌王.刷新': 'TTopWeek.refresh',

  /* ==================== user ==================== */
  // 好友
  '好友.跳转': 'Friends.to',
  '好友.排序': 'Friends.sort',

  // 我的
  '我的.跳转': 'User.to',
  '我的.右上角菜单': 'User.topRightMenu',
  '我的.标签页点击': 'User.tabsPress',
  '我的.标签页切换': 'User.tabsChange',
  '我的.类型选择': 'User.onSelectSubjectType',
  '我的.排序选择': 'User.onOrderSelect',
  '我的.筛选选择': 'User.onFilterSelect',
  '我的.布局选择': 'User.toggleList',

  // 短信
  '短信.跳转': 'PM.to',
  '短信.显示评论框': 'PM.showFixedTextarea',
  '短信.回复短信': 'PM.doReply',
  '短信.新短信': 'PM.doCreate',

  // 设置
  '设置.跳转': 'Setting.to',
  '设置.切换': 'Setting.switch',
  '设置.清除缓存': 'Setting.clear',
  '设置.恢复默认设置': 'Setting.reset',
  '设置.退出登陆': 'Setting.logout',

  // 空间
  '空间.跳转': 'Zone.to',
  '空间.右上角菜单': 'Zone.topRightMenu',
  '空间.标签页点击': 'Zone.tabsPress',
  '空间.标签页切换': 'Zone.tabsChange',
  '空间.展开分组': 'Zone.toggleSection',
  '空间.添加好友': 'Zone.connect',
  '空间.解除好友': 'Zone.disconnect',
  '空间.历史': 'Zone.used',

  /* ==================== other ==================== */
  '其他.启动': 'Other.start',
  '其他.切换主题': 'Other.theme'
}
