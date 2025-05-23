/*
 * @Author: czy0729
 * @Date: 2021-07-16 14:21:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-17 03:47:40
 */
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { SUBJECT_TYPE } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 构建列表数据 */
  home: {
    list: SUBJECT_TYPE.map(item => ({
      type: item.label
    })),
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _loaded: getTimestamp()
  },

  /** 是否显示剪贴板 Modal */
  visible: false,

  /** 剪贴板 Modal Input */
  link: '',

  /** 菜单编辑中 */
  dragging: false,

  /** @deprecated 是否显示 2021 年鉴的动画 */
  showBlockTrain: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 页面初始化完成 */
  _loaded: true as Loaded
}
