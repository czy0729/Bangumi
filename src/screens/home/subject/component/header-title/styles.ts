/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 07:46:21
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.web(56, _.lg) + 38,
    marginBottom: _.platforms(-2, 0, 0, 8, 4) as number
  },
  title: {
    marginTop: -2
  }
})
