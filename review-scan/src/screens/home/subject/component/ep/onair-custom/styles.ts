/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:21:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 18:27:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  onair: {
    width: _.r(44),
    height: _.r(32),
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderRadius: _.radiusXs,
    overflow: _.ios(undefined, 'hidden')
  },
  reset: {
    height: _.r(32),
    marginTop: -8
  }
}))
