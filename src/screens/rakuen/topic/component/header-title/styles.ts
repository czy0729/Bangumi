/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:21:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 22:35:42
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginTop: _.platforms(4, -8, -10, -14, -8),
    marginRight: _.web(80, _.lg),
    marginLeft: -_.sm
  }
})
