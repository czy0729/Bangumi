/*
 * @Author: czy0729
 * @Date: 2022-06-19 19:22:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-30 06:02:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.isMobileLanscape ? 132 : 244
  return {
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    info: {
      zIndex: 1000,
      width: '100%',
      height,
      overflow: 'hidden'
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
      paddingTop: 20,
      paddingBottom: _.tabBarHeight + _.lg + height,
      paddingLeft: _.wind - _.sm - 2,
      overflow: 'hidden'
    }
  }
})
