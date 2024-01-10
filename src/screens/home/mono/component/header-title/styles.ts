/*
 * @Author: czy0729
 * @Date: 2022-08-25 07:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-27 15:11:07
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    height: 28,
    marginTop: _.platforms(2, -6, -10, -4, -4),
    marginLeft: -_.sm,
    marginRight: _.lg
  },
  containerTinygrail: {
    marginRight: 52
  }
})
