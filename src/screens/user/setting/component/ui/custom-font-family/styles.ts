/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:09:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 19:07:58
 */
import { _ } from '@stores'

export const styles = _.create({
  fontStyle: {
    marginTop: _.sm - 2,
    fontFamily: 'rhrm',
    fontWeight: 'normal'
  },
  fontStyleBold: {
    marginTop: _.sm - 2,
    fontFamily: 'rhrb',
    fontWeight: 'normal'
  },
  fontStyleCustom: {
    marginTop: _.sm - 2,
    fontFamily: _.ios(undefined, ''),
    fontWeight: 'normal'
  },
  fontStyleBoldCustom: {
    marginTop: _.sm - 2,
    fontFamily: _.ios(undefined, ''),
    fontWeight: 'bold'
  }
})
