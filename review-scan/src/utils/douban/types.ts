/*
 * @Author: czy0729
 * @Date: 2022-06-22 17:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-14 14:14:05
 */

/** 豆瓣条目 id */
export type DoubanId = string | false

/** 分类 1002 电影, 3114 游戏 */
export type Cat = 'subject' | 'movie' | 'game'

/** o 官方剧照, a 剧照 */
export type SubType = 'o' | 'a'

/** 搜索结果 */
export type SearchItem = {
  id?: string
  title?: string
  name?: string
  desc?: string
  year?: string
}

/** 预告片结果 */
export type TrailerItem = {
  cover: string
  title: string
  href: string
}

/** 视频结果 */
export type VideoItem = {
  cover: string
  title: string
  href: string
  src: string
}
