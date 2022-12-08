/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 14:10:49
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    paddingHorizontal: 0
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
