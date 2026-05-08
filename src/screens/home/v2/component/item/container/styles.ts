/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:37:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 23:58:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const needWind = _.isMobileLanscape || _.isPad
  return {
    item: {
      paddingVertical: _.r(_._wind),
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.ios(_.colorPlain, 'transparent'),
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    },
    heatMap: {
      paddingTop: _.r(_._wind),
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingBottom: _.r(_._wind + 4),
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.ios(_.colorPlain, 'transparent'),
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    }
  }
})
