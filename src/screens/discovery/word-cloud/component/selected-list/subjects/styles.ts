/*
 * @Author: czy0729
 * @Date: 2024-09-27 03:57:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:10:12
 */
import { _ } from '@stores'

export const styles = _.create({
  scrollView: {
    marginTop: 8
  },
  container: {
    paddingHorizontal: _._wind,
    paddingBottom: _.bottom + _.lg,
    marginTop: _.web(8, 0)
  }
})
