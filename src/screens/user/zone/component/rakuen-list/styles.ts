/*
 * @Author: czy0729
 * @Date: 2022-10-22 10:13:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 12:09:38
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    marginTop: _.lg
  },
  contentContainerStyle: {
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  }
})
