/*
 * @Author: czy0729
 * @Date: 2022-05-04 14:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 23:35:08
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    paddingBottom: _.md
  },
  medium: {
    transform: [
      {
        scale: 0.8
      }
    ]
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
