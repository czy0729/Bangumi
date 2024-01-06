/*
 * @Author: czy0729
 * @Date: 2022-07-11 17:27:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 11:27:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const needWind = _.isMobileLanscape || _.isPad
  return {
    item: {
      paddingVertical: _.r(_._wind),
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.colorPlain,
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    },
    itemWithHeatMap: {
      paddingTop: _.r(_._wind),
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingBottom: _.r(_._wind + 4),
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.colorPlain,
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    },
    hd: {
      paddingRight: _._wind
    },
    content: {
      marginLeft: _._wind
    },
    title: {
      minHeight: _.r(60)
    },
    titleCompact: {
      minHeight: _.r(28)
    },
    info: {
      height: _.r(40)
    },
    infoCompact: {
      height: _.r(32)
    },
    dot: {
      position: 'absolute',
      top: _.r(4),
      right: _.r(-2),
      borderWidth: _.r(8),
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: _.colorIcon,
      transform: [
        {
          rotate: '-45deg'
        }
      ],
      opacity: 0.8
    }
  }
})
