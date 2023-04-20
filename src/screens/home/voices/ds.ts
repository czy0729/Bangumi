/*
 * @Author: czy0729
 * @Date: 2022-09-01 11:01:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 11:57:35
 */
import { _ } from '@stores'

export const NAMESPACE = 'ScreenVoices'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 默认全部 */
  position: '',

  /** 云快照 */
  ota: {}
}
