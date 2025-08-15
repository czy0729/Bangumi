/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 20:29:53
 */
import { _ } from '@stores'

export const styles = _.create({
  fontStyle: {
    marginTop: _.xs,
    fontFamily: 'rhrm',
    fontWeight: 'normal'
  },
  fontStyleBold: {
    marginTop: _.xs,
    fontFamily: 'rhrb',
    fontWeight: 'normal'
  },
  fontStyleCustom: {
    marginTop: _.xs,
    fontFamily: _.ios(undefined, ''),
    fontWeight: 'normal'
  },
  fontStyleBoldCustom: {
    marginTop: _.xs,
    fontFamily: _.ios(undefined, ''),
    fontWeight: 'bold'
  }
})
