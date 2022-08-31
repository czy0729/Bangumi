/*
 * @Author: czy0729
 * @Date: 2022-08-25 07:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 15:02:38
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    height: 28,
    marginTop: _.platforms(2, -6, 0, -4),
    marginLeft: -_.sm,
    marginRight: _.lg
  },
  containerTinygrail: {
    marginRight: 52
  }
})
