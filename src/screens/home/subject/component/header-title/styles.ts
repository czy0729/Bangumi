/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 22:35:28
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.web(80, _.lg),
    marginBottom: _.platforms(-2, 0, 4, 8, 4)
  },
  title: {
    marginTop: -2
  },
  itemStyle: {
    marginTop: 1
  }
})
