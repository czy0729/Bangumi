/*
 * @Author: czy0729
 * @Date: 2023-12-23 15:10:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 16:36:36
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
