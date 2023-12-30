/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 07:26:41
 */
import { _ } from '@stores'
import { IMAGE_HEIGHT } from '../ds'

export const styles = _.create({
  image: {
    height: IMAGE_HEIGHT,
    marginLeft: _.sm + 2,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  side: {
    marginLeft: 0
  }
})
