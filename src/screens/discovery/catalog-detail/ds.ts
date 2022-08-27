/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:31:41
 */
export const NAMESPACE = 'ScreenCatalogDetail'

export const EXCLUDE_STATE = {
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
  layout: 'list' as 'list' | 'grid',

  /** 当前排序方式项 index */
  sort: 0,

  ...EXCLUDE_STATE,
  _loaded: false
}
