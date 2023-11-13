/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:20:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 20:05:28
 */
import { _ } from '@stores'
import { AVATAR_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => {
  const marginLeft = _.sm
  const marginLeftWide = -(AVATAR_WIDTH + marginLeft + 4)
  return {
    item: {
      width: '100%',
      paddingLeft: _.sm
    },
    content: {
      paddingBottom: _.md,
      marginLeft
    },
    html: {
      paddingRight: _.sm,
      marginTop: _.xs
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
      paddingRight: _.sm,
      marginTop: 4,
      marginLeft: marginLeftWide
    },
    quoteUserRoundWide: {
      top: 15,
      left: 11,
      marginLeft: marginLeftWide
    },
    likesWide: {
      marginLeft: marginLeftWide
    },
    direct: {
      position: 'absolute',
      top: -8,
      right: 0,
      bottom: 8,
      left: -2,
      borderWidth: 2,
      borderColor: _.colorBorder,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    directJump: {
      borderColor: _.colorSuccess
    }
  }
})
