/*
 * @Author: czy0729
 * @Date: 2022-06-19 19:22:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-26 04:40:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.isMobileLanscape ? 132 : 244
  return {
    container: {
      flex: 1,
      paddingTop: _.tabsHeaderHeight + _.xs,
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
      paddingBottom: _.tabBarHeight + _.lg + height,
      paddingLeft: _.wind - _.sm - 2
    }
  }
})
