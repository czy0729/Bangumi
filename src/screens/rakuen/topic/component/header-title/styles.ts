/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:21:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-27 15:13:04
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginTop: _.platforms(4, -8, -10, -14, -8),
    marginLeft: -_.sm,
    marginRight: _.lg
  }
})
