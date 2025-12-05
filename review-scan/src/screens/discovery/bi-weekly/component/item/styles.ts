/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 05:40:10
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    marginBottom: 48
  },
  cover: {
    ..._.shadow,
    shadowOffset: {
      width: 4,
      height: 6
    },
    shadowOpacity: 0.28,
    elevation: 20
  },
  desc: {
    paddingRight: _.xs,
    marginTop: 12
  }
})
