/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:16:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 16:18:19
 */
import { _ } from '@stores'
import { H_TABBAR } from '../store'

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    backgroundColor: _.ios('transparent', _.select('transparent', _.colorPlain)),
    borderBottomWidth: _.ios(0, _.select(_.hairlineWidth, _.deep(0, _.hairlineWidth))),
    borderBottomColor: _.ios(
      'transparent',
      _.select(_.colorBorder, _.deep('transparent', 'rgba(0, 0, 0, 0.16)'))
    ),
    elevation: 0
  },
  tab: {
    height: 48 * _.ratio
  },
  label: {
    padding: 0
  },
  labelText: {
    width: '100%'
  },
  indicator: {
    width: _.r(16),
    height: 4,
    backgroundColor: _.colorMain,
    borderRadius: 4
  },
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  }
}))
