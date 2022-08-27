/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:13:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 21:32:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingLeft: _.wind - _.sm,
    minHeight: _.r(56)
  },
  count: {
    padding: _.device(_.sm, _.md),
    marginTop: _.sm,
    marginLeft: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
