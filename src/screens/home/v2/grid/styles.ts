/*
 * @Author: czy0729
 * @Date: 2022-06-19 19:22:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:04:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.isMobileLanscape ? 132 : 232
  return {
    container: {
      flex: 1,
      paddingTop: _.ios(_.tabsHeaderHeight, 0) + _.xs,
      backgroundColor: _.select(_.colorPlain, _.deep(_.colorPlain, _.colorBg))
    },
    info: {
      width: '100%',
      height
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
      paddingTop: 16,
      paddingBottom:
        _.ios(_.tabBarHeight + _.md, _.tabBarHeight + _.md - _.tabBarHeight) + height,
      paddingLeft: _.wind - _.sm - 2
    }
  }
})
