/*
 * @Author: czy0729
 * @Date: 2026-11-07 01:38:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * Login 组件 Props
 */
import type { Ctx } from '../../types'

export type Props = {
  /** 是否收起登录框 */
  hide: boolean

  /** 切换收起状态 */
  onToggleHide: () => void

  /** 设置番剧列表 */
  setData: Ctx['$']['setData']

  /** 设置番剧评价 */
  setReviews: Ctx['$']['setReviews']

  /** 设置 bilibili 登录状态 */
  setIsLogin: Ctx['$']['setIsLogin']
}
