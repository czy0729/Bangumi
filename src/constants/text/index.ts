/*
 * @Author: czy0729
 * @Date: 2021-02-23 10:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 05:10:06
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
export const TEXT_UPDATE_ANIME = '2024-07-12'

/** 找游戏、ADV 静态数据最后更新时间 */
export const TEXT_UPDATE_GAME = '2024-07-14'

/** 找漫画最后更新时间 */
export const TEXT_UPDATE_MANGA = '2023-12-18'

/** 赞助者最后更新时间 */
export const TEXT_UPDATE_SPONSOR = '2024-03-26'

/** 打赏最后更新时间 */
export const TEXT_UPDATE_QIAFAN = '2024-03-25'

/** 找条目数目 */
export const TEXT_TOTAL = {
  番剧: 4504,
  游戏: 2837,
  ADV: 3600,
  漫画: 9808,
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

/** 菜单: 复制链接 */
export const TEXT_MENU_COPY_LINK = '复制链接'

/** 菜单: 复制链接 */
export const TEXT_MENU_COPY_SHARE = '复制分享'
