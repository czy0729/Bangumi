/*
 * @Author: czy0729
 * @Date: 2022-11-08 20:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 07:09:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dark: {
    backgroundColor: _.colorTinygrailContainer
  },
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _._wind
  },
  back: {
    marginLeft: -8
  },
  avatar: {
    marginHorizontal: _.xs
  },
  fluctuation: {
    paddingHorizontal: 6,
    paddingBottom: 0.5,
    borderRadius: 2,
    overflow: 'hidden'
  },
  danger: {
    backgroundColor: _.colorAsk
  },
  success: {
    backgroundColor: _.colorBid
  },
  plain: {
    backgroundColor: _.colorTinygrailIcon
  }
}))
