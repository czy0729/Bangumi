/*
 * @Author: czy0729
 * @Date: 2022-08-25 07:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 08:04:49
 */
import { _ } from '@stores'
import { IS_IOS_5_6_7_8 } from '@styles'

export const styles = _.create({
  container: {
    height: 28,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : 2, 0),
    marginLeft: -_.sm,
    marginRight: _.lg
  },
  containerTinygrail: {
    marginRight: 52
  }
})
