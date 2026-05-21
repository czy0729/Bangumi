/*
 * @Author: czy0729
 * @Date: 2024-11-28 15:28:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 07:01:56
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginRight: _.lg,
    marginLeft: -_.xs,
    marginTop: _.ios(_.device(6, 8), 12)
  }
})
