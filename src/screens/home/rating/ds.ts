/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:21:37
 *
 * 用户评分页面组件标识与标签页
 */
import { RATING_STATUS } from '@constants'

export const COMPONENT = 'Rating'

/** 默认标签页下标 (对应看过) */
export const DEFAULT_PAGE = 1

/** 标签页 (key 即路由参数 status 的取值) */
export const TABS = RATING_STATUS.map(item => ({
  key: item.value,
  title: item.label
}))
