/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:44:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 08:45:49
 */
import { _ } from '@stores'

export const NAMESPACE = 'ScreenTyperank'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 查询搜索中 */
  searching: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 缓存条目快照 */
  subjects: {},

  _loaded: false
}
