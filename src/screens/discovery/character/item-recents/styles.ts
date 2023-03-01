/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:11:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-28 01:11:26
 */
import { _ } from '@stores'
import { IMG_WIDTH } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: IMG_WIDTH,
    marginRight: _.md + 4
  },
  wrap: {
    paddingVertical: _.md
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  actors: {
    width: '50%'
  }
}))
