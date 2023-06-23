/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:16:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-26 03:43:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    backgroundColor: _.ios('transparent', _.colorPlain),
    borderBottomWidth: _.ios(0, _.select(_.hairlineWidth, _.deep(0, _.hairlineWidth))),
    borderBottomColor: _.ios(
      'transparent',
      _.select(_.colorBorder, _.deep('transparent', 'rgba(0, 0, 0, 0.16)'))
    ),
    elevation: 0
  },
  tab: {
    height: _.r(48)
  },
  label: {
    padding: 0
  },
  indicator: {
    width: _.r(16),
    height: 4,
    backgroundColor: _.colorMain,
    borderRadius: 4
  }
}))
