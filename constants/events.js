/*
 * @Author: czy0729
 * @Date: 2019-12-17 10:27:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-19 16:43:58
 */
export default {
  /**
   * 跳转: { to: 'Subject', from: 'block', ...other }
   */
  /* ==================== Home ==================== */
  '首页.跳转': 'Home.to',
  '首页.标签页点击': 'Home.tabsPress',
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

  /* ==================== Subject ==================== */
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
  '条目.右上角菜单': 'Subject.topRightMenu'
}
