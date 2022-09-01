/*
 * @Author: czy0729
 * @Date: 2022-05-11 04:37:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:49:31
 */

/** Discovery */
export default {
  // Anime
  'Anime.跳转': 'Anime.to',
  'Anime.选择': 'Anime.onSelect',
  'Anime.到顶': 'Anime.scrollToTop',
  'Anime.切换布局': 'Anime.switchLayout',

  // Anitama
  'Anitama.跳转': 'Anitama.to',
  'Anitama.右上角菜单': 'Anitama.topRightMenu',
  'Anitama.上一页': 'Anitama.prev',
  'Anitama.下一页': 'Anitama.next',
  'Anitama.页码跳转': 'Anitama.doSearch',

  // 年鉴
  '年鉴.跳转': 'Award.to',
  'Bangumi年鉴.跳转': 'Yearbook.to',

  // 索引
  '索引.跳转': 'Browser.to',
  '索引.右上角菜单': 'Browser.topRightMenu',
  // '索引.标签页切换': 'Browser.onChange',
  '索引.类型选择': 'Browser.onSelect',
  '索引.年选择': 'Browser.onAirdateSelect',
  '索引.月选择': 'Browser.onMonthSelect',
  '索引.切换布局': 'Browser.switchLayout',

  // 每日放送
  '每日放送.跳转': 'Calendar.to',
  '每日放送.右上角菜单': 'Calendar.topRightMenu',
  '每日放送.切换布局': 'Calendar.switchLayout',

  // 目录
  '目录.跳转': 'Catalog.to',
  '目录.切换类型': 'Catalog.toggleType',
  '目录.上一页': 'Catalog.prev',
  '目录.下一页': 'Catalog.next',
  '目录.页码跳转': 'Catalog.doSearch',
  // '目录.提示': 'Catalog.alert',

  // 目录详情
  '目录详情.跳转': 'CatalogDetail.to',
  '目录详情.右上角菜单': 'CatalogDetail.topRightMenu',
  '目录详情.收藏': 'CatalogDetail.doCollect',
  '目录详情.取消收藏': 'CatalogDetail.doErase',
  '目录详情.封面图查看': 'CatalogDetail.imageView',
  '目录详情.排序': 'CatalogDetail.sort',
  '目录详情.管理': 'CatalogDetail.manage',
  '目录详情.复制': 'CatalogDetail.doCopy',
  '目录详情.切换布局': 'CatalogDetail.switchLayout',

  // 收藏的人物
  '收藏的人物.跳转': 'Character.to',
  '收藏的人物.右上角菜单': 'Character.topRightMenu',
  '收藏的人物.标签页切换': 'Character.tabsChange',

  // 发现
  '发现.跳转': 'Discovery.to',
  '发现.剪贴板': 'Discovery.linkModal',

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
  '搜索.模糊查询点击': 'Search.onAdvance',
  '搜索.模糊查询跳转': 'Search.advanceTo',

  // 标签索引
  '标签索引.跳转': 'Tags.to',
  '标签索引.右上角菜单': 'Tags.topRightMenu',
  '标签索引.标签页切换': 'Tags.tabsChange',

  // 全站日志
  '全站日志.跳转': 'DiscoveryBlog.to',
  '全站日志.右上角菜单': 'DiscoveryBlog.topRightMenu',
  '全站日志.标签页切换': 'DiscoveryBlog.tabsChange',
  '全站日志.标签页点击': 'DiscoveryBlog.tabsPress',
  '全站日志.上一页': 'DiscoveryBlog.prev',
  '全站日志.下一页': 'DiscoveryBlog.next',
  '全站日志.页码跳转': 'DiscoveryBlog.doSearch',

  // 频道
  '频道.跳转': 'Channel.to',
  '频道.右上角菜单': 'Channel.topRightMenu',

  // 文库
  '文库.跳转': 'Wenku.to',
  '文库.选择': 'Wenku.onSelect',
  '文库.到顶': 'Wenku.scrollToTop',
  '文库.切换布局': 'Wenku.switchLayout',

  // Manga
  'Manga.跳转': 'Manga.to',
  'Manga.选择': 'Manga.onSelect',
  'Manga.到顶': 'Manga.scrollToTop',
  'Manga.切换布局': 'Manga.switchLayout',

  // 游戏
  '游戏.跳转': 'Game.to',
  '游戏.选择': 'Game.onSelect',
  '游戏.到顶': 'Game.scrollToTop',
  '游戏.切换布局': 'Game.switchLayout',

  // 推荐
  '推荐.跳转': 'Guess.to',
  '推荐.刷新': 'Guess.refresh',

  // 新番档期
  '新番档期.跳转': 'Staff.to',
  '新番档期.右上角菜单': 'Staff.topRightMenu',

  // Hentai
  'Hentai.跳转': 'Hentai.to',
  'Hentai.选择': 'Hentai.onSelect',
  'Hentai.到顶': 'Hentai.scrollToTop',
  'Hentai.切换布局': 'Hentai.switchLayout',

  // 维基人
  '维基人.右上角菜单': 'Wiki.topRightMenu'
}
