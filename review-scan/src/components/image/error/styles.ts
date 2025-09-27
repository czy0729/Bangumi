/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:10:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 08:15:29
 */
import { _ } from '@stores'

export const styles = _.create({
  error: {
    maxWidth: '100%',
    padding: 4
  },
  icon: {
    opacity: _.select(0.5, 0.3)
  }
})
