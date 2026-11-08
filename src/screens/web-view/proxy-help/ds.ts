/*
 * @Author: czy0729
 * @Date: 2026-06-02 06:25:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 页面标识 + 反代帖子搜索参数
 */
export const COMPONENT = 'ProxyHelp'

export const HM = ['proxy-help', 'ProxyHelp'] as const

/** 搜索关键词 */
export const KEYWORD = '反代'

/** 只取此日期之后的帖子 */
export const AFTER = '2026-05-28'

/** 单页条数 */
export const LIMIT = 20

/** 首屏列表快照的云存储 key */
export const SNAPSHOT_KEY = `search_group_topics_${KEYWORD}`
