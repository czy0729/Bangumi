/*
 * @Author: czy0729
 * @Date: 2024-07-19 21:21:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 05:16:16
 */
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

/** 类型, 经 MODEL_SUBJECT_TYPE 映射为 Item.t */
export const NSFW_TYPE = ['动画', '书籍', '游戏'] as const

/** 年份筛选, 复用动画年份列表 */
export const NSFW_YEAR = ANIME_YEAR

/** 收藏筛选, 复用动画 */
export const NSFW_COLLECTED = ANIME_COLLECTED

/** 排序, 顺序即筛选组展示顺序 */
export const NSFW_SORT = ['排名', '评分人数', '上映时间', '随机'] as const
