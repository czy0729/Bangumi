/*
 * @Author: czy0729
 * @Date: 2022-09-11 12:25:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 15:28:58
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT_LG
  },
  contentFlux: {
    minHeight: IMG_HEIGHT_LG
  },
  tag: {
    marginTop: 6,
    marginRight: 6
  },
  loading: {
    height: IMG_HEIGHT_LG
  }
}))
