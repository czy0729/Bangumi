/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 05:24:43
 */
import { _ } from '@stores'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: '100%',
    paddingVertical: 12,
    paddingRight: _.wind
  },
  time: {
    width: _.r(72),
    paddingLeft: _._wind,
    marginTop: 2
  },
  image: {
    width: IMG_WIDTH
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
