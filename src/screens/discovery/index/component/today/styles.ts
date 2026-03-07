/*
 * @Author: czy0729
 * @Date: 2022-09-10 08:06:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 00:43:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.max(100, _.windowSm.contentWidth * _.device(0.26, 0.298))
  const margin = _.device(_._wind, _.md)

  return {
    contentContainerStyle: {
      paddingTop: _.md + 4,
      paddingRight: _.windSm - _._wind,
      paddingBottom: _.sm,
      paddingLeft: _.windSm,
      minHeight: Math.floor(width * 1.38)
    },
    split: {
      marginRight: margin - _.sm,
      marginLeft: -_.sm
    },
    line: {
      width: 2,
      height: 2,
      marginVertical: _.xs,
      backgroundColor: _.colorIcon,
      borderRadius: 2,
      overflow: 'hidden'
    }
  }
})
