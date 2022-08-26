/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:48:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-26 00:48:00
 */
import { _ } from '@stores'
import { IS_IOS_5_6_7_8 } from '@styles'

export const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg,
    marginBottom: _.ios(IS_IOS_5_6_7_8 ? 0 : -4, 0)
  }
})
