/*
 * @Author: czy0729
 * @Date: 2022-06-19 19:22:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 19:23:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingTop: _.ios(_.tabsHeaderHeight, 0) + _.xs,
    paddingBottom: _.ios(_.tabBarHeight, 0),
    backgroundColor: _.select(_.colorPlain, _.deep(_.colorPlain, _.colorBg))
  },
  info: {
    width: '100%',
    height: _.isMobileLanscape ? 132 : 208
  },
  gameInfo: {
    width: '100%',
    height: 160
  },
  noSelect: {
    width: '100%',
    height: '100%'
  },
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingBottom: _.ios(_.tabBarHeight + _.md, _.tabBarHeight + _.md - _.tabBarHeight),
    paddingLeft: _.wind - _.sm - 2
  }
}))
