/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:01:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 13:55:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  assets: {
    width: '100%',
    minHeight: 56,
    marginVertical: -8
  },
  touch: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginLeft: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
