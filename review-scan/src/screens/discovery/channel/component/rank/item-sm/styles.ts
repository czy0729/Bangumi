/*
 * @Author: czy0729
 * @Date: 2024-08-20 16:38:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 01:09:30
 */
import { _ } from '@stores'
import { COVER_HEIGHT_SM, COVER_WIDTH_SM } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: '48%',
    paddingVertical: _.sm,
    marginBottom: 4
  },
  side: {
    marginLeft: '4%'
  },
  content: {
    height: COVER_HEIGHT_SM
  },
  music: {
    height: COVER_WIDTH_SM
  },
  rec: {
    top: undefined,
    right: 0,
    bottom: _.ios(-12, 0)
  },
  recText: {
    fontSize: 40,
    lineHeight: 52,
    opacity: 0.64
  }
}))
