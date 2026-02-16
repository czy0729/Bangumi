/*
 * @Author: czy0729
 * @Date: 2021-02-23 10:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 20:07:16
 */
import { WEB } from '../device'

/** 加载 */
export const TEXT_REFRESHING = '加载中...'

/** 失败 */
export const TEXT_FAIL = '居然失败了 =.=!'

/** 没有更多 */
export const TEXT_NO_MORE = '到底啦'

/** 空 */
export const TEXT_EMPTY = '好像什么都没有'

/** 敏感提示 */
export const TEXT_18X = '什么都没找到\n敏感内容需要账号成年(注册2个月)才能显示哦'

/** 找番剧静态数据最后更新时间 */
export const TEXT_UPDATE_ANIME = '2025-04-01'

/** 找游戏、ADV 静态数据最后更新时间 */
export const TEXT_UPDATE_GAME = '2024-07-14'

/** 找漫画最后更新时间 */
export const TEXT_UPDATE_MANGA = '2024-09-23'

/** 赞助者最后更新时间 */
export const TEXT_UPDATE_SPONSOR = '2025-04-13'

/** 分类排名更新时间 */
export const TEXT_UPDATE_TYPERANK = '2025-04-02'

/** 开发者话语最后更新时间 */
export const TEXT_UPDATE_QIAFAN = '2024-09'

/** 找条目数目 */
export const TEXT_TOTAL = {
  番剧: 4581,
  游戏: 2837,
  ADV: 3600,
  漫画: 10622,
  文库: 2740,
  Hentai: 1036,
  NSFW: 3882
} as const

/** 空格 */
export const TEXT_SPACE = WEB ? '\u00A0' : ' '

/** 中文段落开头空格 */
export const TEXT_SECTION_INDENT = '　　'

/** 菜单: 浏览器查看 */
export const TEXT_MENU_BROWSER = '浏览器查看'

/** 菜单: 网页版查看 */
export const TEXT_MENU_SPA = '网页版查看'

/** 菜单: 复制链接 */
export const TEXT_MENU_COPY_LINK = '复制链接'

/** 菜单: 复制链接 */
export const TEXT_MENU_COPY_SHARE = '复制分享'

/** 菜单: 分割 */
export const TEXT_MENU_SPLIT = '一一一'

/** 菜单: 左分割 */
export const TEXT_MENU_SPLIT_LEFT = '〔'

/** 菜单: 右分割 */
export const TEXT_MENU_SPLIT_RIGHT = '〕'

/** 菜单: 工具栏 */
export const TEXT_MENU_TOOLBAR = '工具栏'

/** 菜单: 工具栏锁定上方 */
export const TEXT_MENU_FIXED = '锁定'

/** 菜单: 工具栏浮动 */
export const TEXT_MENU_FLOAT = '浮动'

/** 菜单: 布局 */
export const TEXT_MENU_LAYOUT = '布　局'

/** 菜单: 布局列表 */
export const TEXT_MENU_LIST = '列表'

/** 菜单: 布局网格 */
export const TEXT_MENU_GRID = '网格'

/** 菜单: 收藏 */
export const TEXT_MENU_FAVOR = '收　藏'

/** 菜单: 收藏显示 */
export const TEXT_MENU_SHOW = '显示'

/** 菜单: 收藏不显示 */
export const TEXT_MENU_NOT_SHOW = '不显示'

/** 菜单: 收藏只显示 */
export const TEXT_MENU_ONLY_SHOW = '只显示'

/** 菜单: 分页器 */
export const TEXT_MENU_PAGINATION = '分页器'

/** 菜单: 年份 */
export const TEXT_MENU_YEARS = '年　份'

/** 标记 */
export const TEXT_BADGES = {
  danger: '🔴',
  plain: '⚪',
  primary: '🔵',
  success: '🟢',
  warning: '🟠',
  yellow: '🟡'
} as const
