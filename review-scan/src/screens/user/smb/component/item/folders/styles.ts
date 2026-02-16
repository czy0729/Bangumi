/*
 * @Author: czy0729
 * @Date: 2023-11-23 08:43:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 20:25:05
 */
import { _ } from '@stores'
import { IMG_WIDTH_LG } from '@constants'

export const styles = _.create({
  folders: {
    paddingLeft: IMG_WIDTH_LG + _.md,
    marginTop: -45
  },
  expand: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginTop: _.sm
  }
})
