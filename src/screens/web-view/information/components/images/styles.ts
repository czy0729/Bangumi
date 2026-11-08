/*
 * @Author: czy0729
 * @Date: 2023-12-23 15:10:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:00:00
 *
 * 配图容器样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    width: '100%',
    marginTop: _.md,
    borderWidth: 1,
    borderColor: _.colorBorder
  }
}))
