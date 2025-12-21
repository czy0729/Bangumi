/*
 * @Author: czy0729
 * @Date: 2022-10-22 10:13:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:00:37
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    marginTop: _.lg
  },
  contentContainerStyle: {
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight,
    paddingBottom: _.bottom
  },
  nestScroll: {
    paddingBottom: _.bottom
  },
  nestScrollLoading: {
    marginTop: -320
  }
})
