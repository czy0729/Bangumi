/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 16:57:33
 */
import { _ } from '@stores'
import { IMG_HEIGHT } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: '100%',
    paddingVertical: 12,
    paddingRight: _._wind
  },
  time: {
    width: _.r(72),
    paddingLeft: _._wind,
    marginTop: 2
  },
  body: {
    width: '100%',
    height: IMG_HEIGHT - 4,
    paddingTop: 2
  },
  katakanas: {
    marginTop: -10
  },
  undetermined: {
    zIndex: 1,
    paddingVertical: _.sm
  }
}))
