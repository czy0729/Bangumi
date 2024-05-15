/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-15 12:41:13
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg,
    marginBottom: _.platforms(-2, 0, 4, 8, 4)
  },
  title: {
    marginTop: -2
  },
  itemStyle: {
    marginTop: 1
  }
})
