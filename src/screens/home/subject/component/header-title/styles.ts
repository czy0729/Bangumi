/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 06:01:20
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg,
    marginBottom: _.platforms(-2, 0, 4, 8, 4)
  },
  itemStyle: {
    marginTop: 2
  }
})
