/*
 * @Author: czy0729
 * @Date: 2026-11-08 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 5 列表情格子, 图标容器按字号留出固定占位
 */
import { _ } from '@stores'
import { SIZE } from './ds'

export const styles = _.create({
  item: {
    alignItems: 'center',
    width: '20%',
    paddingVertical: _.xs
  },
  icon: {
    width: SIZE.normal,
    height: SIZE.normal
  },
  iconLarge: {
    width: SIZE.large,
    height: SIZE.large
  }
})
