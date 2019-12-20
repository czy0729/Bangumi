/*
 * @Author: czy0729
 * @Date: 2019-12-17 10:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-20 18:05:12
 */

/**
 * 跳转: { to: 'Subject', from: 'block', ...other }
 */
export default {
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

  // 条目
  '条目.跳转': 'Subject.to',
  '条目.显示收藏管理': 'Subject.showManageModel',
  '条目.章节倒序': 'Subject.toggleReverseEps',
  '条目.吐槽箱倒序': 'Subject.toggleReverseComments',
  '条目.书籍章节输入框改变': 'Subject.changeText',
  '条目.章节菜单操作': 'Subject.doEpsSelect',
  '条目.管理收藏': 'Subject.doUpdateCollection',
  '条目.更新书籍下一个章节': 'Subject.doUpdateNext',
  '条目.更新书籍章节': 'Subject.doUpdateBookEp',
  '条目.章节按钮长按': 'Subject.doEpsLongPress',
  '条目.跳到条目': 'Subject.toSubject',
  '条目.封面图查看': 'Subject.imageView',
  '条目.右上角菜单': 'Subject.topRightMenu',

  // 人物
  '人物.跳转': 'Mono.to',
  '人物.右上角菜单': 'Mono.topRightMenu',
  '人物.收藏人物': 'Mono.doCollect',
  '人物.取消收藏人物': 'Mono.doEraseCollect',
  '人物.封面图查看': 'Mono.imageView',

  // 用户标签
  '用户标签.跳转': 'Tag.to',
  '用户标签.排序选择': 'Tag.onOrderSelect',
  '用户标签.年选择': 'Tag.onAirdateSelect',
  '用户标签.月选择': 'Tag.onMonthSelect',
  '用户标签.切换布局': 'Tag.toggleList',

  /* ==================== discovery ==================== */
  // 发现
  '发现.跳转': 'Discovery.to',

  // 年鉴
  '年鉴.跳转': 'Award.to',

  // Anitama
  'Anitama.跳转': 'Anitama.to',
  'Anitama.上一页': 'Anitama.prev',
  'Anitama.下一页': 'Anitama.next',
  'Anitama.页码跳转': 'Anitama.doSearch',
  'Anitama.右上角菜单': 'Anitama.topRightMenu',

  // 每日放送
  '每日放送.跳转': 'Calendar.to',
  '每日放送.右上角菜单': 'Calendar.topRightMenu',

  // 收藏的人物
  '收藏的人物.跳转': 'Character.to',
  '收藏的人物.右上角菜单': 'Character.topRightMenu',
  '收藏的人物.标签页切换': 'Character.tabsChange',

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

  // 标签索引
  '标签索引.跳转': 'Tags.to',
  '标签索引.右上角菜单': 'Tags.topRightMenu',
  '标签索引.标签页切换': 'Tags.tabsChange',

  // 搜索
  '搜索.跳转': 'Search.to',
  '搜索.右上角菜单': 'Search.topRightMenu',
  '搜索.切换类型': 'Search.onSelect',
  '搜索.选择历史': 'Search.selectHistory',
  '搜索.删除历史': 'Search.deleteHistory',
  '搜索.搜索': 'Search.doSearch',

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
  '登陆.游客访问': 'Login.onTour',
  '登陆.登陆': 'Login.onLogin',
  '登陆.成功': 'Login.onSuccess',
  '登陆.错误': 'Login.onError'
}
