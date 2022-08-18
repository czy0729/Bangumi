/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:15:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 07:15:39
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    paddingHorizontal: 0,
    marginBottom: _.md
  },
  setting: {
    marginBottom: 40
  },
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
})
