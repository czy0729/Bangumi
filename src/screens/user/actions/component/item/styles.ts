/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:47:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 单条样式
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    marginVertical: _.md
  },
  touch: {
    padding: _.sm,
    marginRight: -_.sm
  },
  disabled: {
    opacity: 0.5
  }
})
