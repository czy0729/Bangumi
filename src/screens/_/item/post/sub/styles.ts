/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:20:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 04:44:20
 */
import { _ } from '@stores'
import { AVATAR_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => {
  const marginLeft = _.sm
  return {
    itemNew: {
      paddingLeft: _.sm,
      marginLeft: -_.sm,
      backgroundColor: _.colorMainLight
    },
    itemJump: {
      borderBottomWidth: 2,
      borderColor: _.colorSuccess
    },
    subContent: {
      paddingVertical: _.md,
      marginLeft
    },
    quoteUserRound: {
      position: 'absolute',
      top: 11,
      left: 10.5,
      zIndex: 1,
      padding: 2,
      backgroundColor: _.colorBg
    },
    translate: {
      padding: _.sm,
      marginTop: _.sm,
      marginRight: _.sm,
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
      borderRadius: _.radiusXs,
      overflow: 'hidden'
    },
    wide: {
      marginTop: 4,
      marginLeft: -(AVATAR_WIDTH + marginLeft + 4)
    },
    quoteUserRoundWide: {
      top: 15,
      left: 11,
      marginLeft: -(AVATAR_WIDTH + marginLeft + 4)
    }
  }
})
