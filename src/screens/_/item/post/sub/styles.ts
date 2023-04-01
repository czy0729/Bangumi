/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:20:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 14:48:02
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
    html: {
      paddingRight: _.md + 2,
      marginTop: _.xs
    },
    wide: {
      paddingRight: _.sm,
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
