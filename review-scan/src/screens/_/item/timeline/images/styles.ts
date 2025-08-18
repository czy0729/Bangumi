/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:56:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:01
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export const styles = _.create({
  scrollView: {
    marginTop: _.sm,
    marginRight: -40
  },
  images: {
    paddingTop: _.sm,
    paddingRight: WEB ? _.sm + 40 : _.sm,
    paddingBottom: _.md
  },
  type: {
    paddingRight: _.md - 2
  },
  image: {
    paddingRight: _.sm
  }
})
