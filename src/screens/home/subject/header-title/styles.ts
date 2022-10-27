/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-27 15:11:36
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg,
    marginBottom: _.platforms(-2, 0, 4, 8)
  }
})
