/*
 * @Author: czy0729
 * @Date: 2022-11-23 10:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 自定义跳转页面样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.window.height / 2
  }
}))
