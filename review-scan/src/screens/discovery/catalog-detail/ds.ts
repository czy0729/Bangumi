/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 20:25:16
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
