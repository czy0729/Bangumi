/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 开发调试工具页面样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind - _._wind
  }
}))
