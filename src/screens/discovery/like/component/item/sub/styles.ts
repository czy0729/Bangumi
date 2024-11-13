/*
 * @Author: czy0729
 * @Date: 2023-06-11 16:02:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 09:16:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sub: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginTop: 12,
    backgroundColor: _.colorBg,
    borderLeftWidth: 6,
    borderColor: _.colorBorder,
    borderTopLeftRadius: _.radiusXs,
    borderTopRightRadius: _.radiusSm,
    borderBottomRightRadius: _.radiusSm,
    borderBottomLeftRadius: _.radiusXs,
    overflow: 'hidden'
  },
  item: {
    minWidth: '25%',
    maxWidth: '100%',
    marginRight: _.sm
  }
}))
