/*
 * @Author: czy0729
 * @Date: 2021-02-23 10:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-10 14:25:20
 */
import { STORYBOOK } from '../device'

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
export const TEXT_UPDATE_ANIME = '2023-12-10'

/** 找游戏、ADV 静态数据最后更新时间 */
export const TEXT_UPDATE_GAME = '2023-12-19'

/** 找漫画最后更新时间 */
export const TEXT_UPDATE_MANGA = '2023-12-18'

/** 赞助者最后更新时间 */
export const TEXT_UPDATE_SPONSOR = '2024-02-09'

/** 找条目数目 */
export const TEXT_TOTAL = {
  番剧: 4313,
  游戏: 2837,
  ADV: 731,
  漫画: 9808,
  文库: 2740,
  Hentai: 1036
} as const

/** 空格 */
export const TEXT_SPACE = STORYBOOK ? '\u00A0' : ' '
