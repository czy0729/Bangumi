/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 08:27:42
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const COMPONENT = 'CatalogDetail'

export const NAMESPACE = `Screen${COMPONENT}` as const

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
  }
] as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** Modal */
  visible: false,

  /** 正在编辑的目录项 */
  defaultEditItem: null,

  /** 进度条 */
  progress: {
    fetching: false,
    message: '',
    current: 0,
    total: 0
  }
}

export const STATE = {
  /** 布局 */
  layout: LAYOUT_DS[0].key as (typeof LAYOUT_DS)[number]['key'],

  /** 当前排序方式项 index */
  sort: SORT_DS[0].key as (typeof SORT_DS)[number]['key'],

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
