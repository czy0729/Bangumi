/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 07:20:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = _.device(128, 164)
  return {
    more: {
      width,
      height: width,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
    }
  }
})
