/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 17:29:53
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { LIMIT_HEAVY } from './ds'
import Item from './item'

export default obc(
  ({ index = 0, subjectId = 0, subject = {}, epStatus = '' }, { $, navigation }) => {
    // rerender('Home.Item', subject.name_cn || subject.name)

    const { _mounted } = $.state
    if (index >= LIMIT_HEAVY && !_mounted) return <View style={memoStylesLazy().lazy} />

    const styles = memoStyles()
    const { expand } = $.$Item(subjectId)
    const { top } = $.state
    const isTop = top.indexOf(subjectId) !== -1
    return (
      <Item
        navigation={navigation}
        styles={styles}
        index={index}
        subject={subject}
        subjectId={subjectId}
        epStatus={epStatus}
        heatMap={$.heatMap}
        isTop={isTop}
        expand={expand}
        epsCount={$.eps(subjectId).length}
        onItemPress={$.onItemPress}
      />
    )
  }
)

const memoStylesLazy = _.memoStyles(() => ({
  lazy: {
    height: 150,
    backgroundColor: _.colorPlain,
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  }
}))

const memoStyles = _.memoStyles(() => {
  const needWind = _.isMobileLanscape || _.isPad
  return {
    item: {
      paddingVertical: _._wind * _.ratio,
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.colorPlain,
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    },
    itemWithHeatMap: {
      paddingTop: _._wind * _.ratio,
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingBottom: (_._wind + 4) * _.ratio,
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
      minHeight: 60 * _.ratio
    },
    info: {
      height: 40 * _.ratio
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
