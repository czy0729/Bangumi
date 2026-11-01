/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 开发调试工具基础块样式
 */
import { _ } from '@stores'

export const styles = _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1)
      }
    ]
  }
})
