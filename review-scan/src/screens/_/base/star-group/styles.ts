/*
 * @Author: czy0729
 * @Date: 2022-06-13 12:45:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-13 12:45:07
 */
import { _ } from '@stores'

export const styles = _.create({
  desc: {
    height: 22
  },
  touchClear: {
    paddingHorizontal: _.xs,
    marginLeft: _.sm - _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchStar: {
    borderRadius: 20,
    overflow: 'hidden'
  }
})
