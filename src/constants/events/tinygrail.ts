/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:43:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 05:39:35
 */

/** Tinygrail */
export default {
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
  '低价股.跳转': 'TAdvanceState.to',
  '低价股.提示': 'TAdvanceState.alert',

  // 我的委托
  '我的委托.跳转': 'TBid.to',
  '我的委托.标签页切换': 'TBid.tabsChange',
  '我的委托.排序': 'TBid.onSortPress',
  '我的委托.取消拍卖': 'TBid.onAuctionCancel',
  '我的委托.一键取消': 'TBid.onBatchCancel',

  // 我的持仓
  '我的持仓.跳转': 'TCharaAssets.to',
  '我的持仓.右上角菜单': 'TCharaAssets.topRightMenu',
  '我的持仓.标签页切换': 'TCharaAssets.tabsChange',
  '我的持仓.排序': 'TCharaAssets.onSortPress',
  '我的持仓.设置前往': 'TCharaAssets.onSelectGo',
  '我的持仓.批量献祭': 'TCharaAssets.doBatchSacrifice',
  '我的持仓.批量挂单': 'TCharaAssets.doBatchAsk',

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
  '小圣杯.幻想乡刮刮乐': 'TIndex.lottery2',
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
  '新番榜单.筛选': 'TNew.onFilter',
  '新番榜单.设置前往': 'TNew.onSelectGo',

  // 热门榜单
  '热门榜单.跳转': 'TOverview.to',
  '热门榜单.标签页切换': 'TOverview.tabsChange',
  '热门榜单.排序': 'TOverview.onSortPress',
  '热门榜单.筛选': 'TOverview.onFilter',
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
  '资产重组.股息查看': 'TSacrifice.rate' /** @deprecated */,
  '资产重组.菜单改变竞拍数量': 'TSacrifice.changeAmountByMenu',
  '资产重组.展开收起封面': 'TSacrifice.toggleCover',
  '资产重组.展开收起记录': 'TSacrifice.toggleLogs',
  '资产重组.展开收起圣殿板块': 'TSacrifice.toggleTemples',
  '资产重组.展开收起董事会': 'TSacrifice.toggleUsers',
  '资产重组.测试效率': 'TSacrifice.doTestSacrifice',
  '资产重组.灌注星之力': 'TSacrifice.doStarForces',
  '资产重组.使用道具': 'TSacrifice.doUse',

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
  '英灵殿.筛选': 'TValhall.onFilter',
  '英灵殿.设置前往': 'TValhall.onSelectGo',

  // 关联角色
  '关联角色.跳转': 'TRelation.to',
  '关联角色.排序': 'TRelation.onSortPress',
  '关联角色.设置前往': 'TRelation.onSelectGo',

  // 我的道具
  '我的道具.使用': 'TItems.use',

  // 每周萌王
  '每周萌王.跳转': 'TTopWeek.to',
  '每周萌王.刷新': 'TTopWeek.refresh',

  // 粘贴板
  '粘贴板.跳转': 'TClipboard.to',
  '粘贴板.刷新': 'TClipboard.refresh',
  '粘贴板.分享': 'TClipboard.share',
  '粘贴板.一键注资': 'TClipboard.batchICO'
}
