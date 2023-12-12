/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:50:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 19:30:08
 */
import { _ } from '@stores'
import { IMAGE_HEIGHT } from '../ds'

export const styles = _.create({
  image: {
    height: IMAGE_HEIGHT,
    marginLeft: _.sm + 2
  },
  side: {
    height: IMAGE_HEIGHT
  }
})
