/*
 * @Author: czy0729
 * @Date: 2024-11-15 03:19:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 头部图标样式
 */
import { _ } from '@stores'

export const styles = _.create({
  group: {
    marginBottom: 0,
    marginLeft: 6,
    borderRadius: 40,
    overflow: 'hidden'
  },
  groupPad: {
    height: 52
  },
  more: {
    marginRight: _.xs,
    borderRadius: 20,
    overflow: 'hidden'
  },
  moreIcon: {
    width: 36,
    height: 36
  },
  prefetch: {
    marginRight: -6,
    marginBottom: 0
  }
})
