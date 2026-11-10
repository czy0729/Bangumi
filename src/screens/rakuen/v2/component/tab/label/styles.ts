/*
 * @Author: czy0729
 * @Date: 2025-01-17 15:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 00:00:00
 *
 * 分类标签样式
 */
import { _ } from '@stores'
import { H_TAB_ITEM } from '../ds'

export const styles = _.create({
  label: {
    width: '100%',
    marginTop: -8
  },
  popover: {
    width: '100%',
    height: _.r(H_TAB_ITEM),
    justifyContent: 'center'
  }
})
