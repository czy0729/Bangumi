/*
 * @Author: czy0729
 * @Date: 2022-05-04 14:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 13:48:52
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    paddingBottom: _.md
  },
  mini: {
    transform: [
      {
        scale: 0.64
      }
    ]
  },
  spinner: {
    marginTop: -_.md
  }
})
