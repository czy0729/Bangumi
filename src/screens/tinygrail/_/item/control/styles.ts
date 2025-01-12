/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:04:37
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-07 17:04:37
 */
import { _ } from '@stores'

export const styles = _.create({
  control: {
    position: 'absolute',
    zIndex: 1,
    top: -1,
    right: 0
  },
  auctionCancel: {
    paddingVertical: _.md,
    paddingLeft: _.sm,
    marginTop: 1.5
  },
  stockPreview: {
    marginTop: -0.5,
    marginRight: -12
  }
})
