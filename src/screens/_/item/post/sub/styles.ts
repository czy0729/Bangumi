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
  const marginLeftWide = -(AVATAR_WIDTH + marginLeft + 4)
  return {
    item: {
      width: '100%',
      paddingLeft: _.sm
    },
    itemJump: {
      borderBottomWidth: 2,
      borderColor: _.colorSuccess
    },
    content: {
      paddingVertical: _.md,
      marginLeft
    },
    html: {
      paddingRight: _.md + 2,
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
      top: 6,
      right: 2,
      bottom: 2,
      left: -2,
      borderWidth: 1,
      borderColor: _.colorBorder,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    }
  }
})
