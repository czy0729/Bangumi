/*
 * @Author: czy0729
 * @Date: 2023-03-20 04:47:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 06:16:54
 */
import { RatingStatus } from '@types'

export const STATE = {
  /** 存放带监听组件的页面上面, 最近一次点击的 x, y 坐标 */
  tapXY: {
    x: 0,
    y: 0
  },

  /** 条目缩略信息弹出层 */
  popableSubject: {
    subjectId: 0,
    visible: false,
    portalKey: 0,
    x: 0,
    y: 0
  },

  /** 全局条目管理 Modal */
  manageModal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '看' as '看' | '玩' | '听' | '读',
    screen: '',
    disabled: false
  },

  /** 全局翻转动画管理 */
  flip: {
    animate: false,
    subjectId: 0,
    key: 0
  }
}
