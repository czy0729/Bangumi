/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:21:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 07:29:38
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginTop: _.platforms(4, -8, 3, -14, -8),
    marginRight: _.web(52, _.lg) + 36,
    marginLeft: -_.sm
  }
})
