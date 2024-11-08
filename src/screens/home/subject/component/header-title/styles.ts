/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:26:33
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.web(56, _.lg) + 24,
    marginBottom: _.platforms(-2, 0, 4, 8, 4)
  },
  title: {
    marginTop: -2
  },
  itemStyle: {
    marginTop: 1
  }
})
