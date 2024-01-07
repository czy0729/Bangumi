/*
 * @Author: czy0729
 * @Date: 2022-10-22 10:13:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 17:31:13
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    marginTop: _.lg
  },
  contentContainerStyle: {
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  nestScroll: {
    paddingBottom: _.bottom
  },
  nestScrollLoading: {
    marginTop: -320
  }
})
