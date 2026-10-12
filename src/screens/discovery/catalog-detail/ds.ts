/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-12 05:29:53
 *
 * 页面常量: 布局 / 排序 / 收藏范围
 */
export const COMPONENT = 'CatalogDetail'

/** 布局 */
export const LAYOUT_DS = [
  {
    key: 'list',
    title: '列表'
  },
  {
    key: 'grid',
    title: '网格'
  }
] as const

/** 页内排序 */
export const SORT_DS = [
  {
    key: '0',
    title: '默认'
  },
  {
    key: '1',
    title: '时间'
  },
  {
    key: '2',
    title: '评分'
  },
  {
    key: '3',
    title: '评分人数'
  }
] as const

/** 收藏范围 */
export const COLLECT_DS = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'collected',
    title: '只看收藏'
  },
  {
    key: 'uncollect',
    title: '不看收藏'
  }
] as const

/** 条目类型标题 (state.type 取值, 与详情字段的对应关系见 store 的 map) */
export const TEXT_TYPE_ANIME = '动画'
export const TEXT_TYPE_CHARACTER = '角色'
export const TEXT_TYPE_PERSON = '人物'
export const TEXT_TYPE_TOPIC = '小组'
export const TEXT_TYPE_EP = '章节'
export const TEXT_TYPE_BLOG = '日志'

/** 默认条目类型 */
export const DEFAULT_TYPE = TEXT_TYPE_ANIME
