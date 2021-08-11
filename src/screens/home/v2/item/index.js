/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 01:56:41
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Main from './index.main'
import { itemPadding } from './ds'

const LIMIT_HEAVY = _.isPad ? 16 : 8

function Item(
  { index = 0, subjectId = 0, subject = {}, epStatus = '' },
  { $, navigation }
) {
  const { _mounted } = $.state
  if (index >= LIMIT_HEAVY && !_mounted) {
    const styles = memoStylesLazy()
    return <View style={styles.lazy} />
  }

  rerender('Home.Item', subject.name_cn || subject.name)

  const styles = memoStyles()
  const { top } = $.state
  const { expand } = $.$Item(subjectId)
  return (
    <Main
      styles={styles}
      index={index}
      subject={subject}
      subjectId={subjectId}
      epStatus={epStatus}
      heatMap={$.heatMap}
      top={top}
      expand={expand}
      onItemPress={() => $.onItemPress(navigation, subjectId, subject)}
    />
  )
}

export default obc(Item)

const memoStylesLazy = _.memoStyles(_ => ({
  lazy: {
    height: 150,
    backgroundColor: _.colorPlain,
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  }
}))

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: itemPadding * _.ratio,
    paddingRight: _.device(0, _.wind - _._wind),
    paddingLeft: _.device(itemPadding, _.wind),
    backgroundColor: _.colorPlain,
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  itemWithHeatMap: {
    paddingTop: itemPadding * _.ratio,
    paddingRight: _.device(0, _.wind - _._wind),
    paddingBottom: (itemPadding + 4) * _.ratio,
    paddingLeft: _.device(itemPadding, _.wind),
    backgroundColor: _.colorPlain,
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  hd: {
    paddingRight: itemPadding
  },
  content: {
    marginLeft: itemPadding
  },
  title: {
    minHeight: 60 * _.ratio
  },
  info: {
    height: 40 * _.ratio
  },
  dot: {
    position: 'absolute',
    top: 6 * _.ratio,
    right: 6 * _.ratio,
    borderWidth: 8 * _.ratio,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: _.colorBorder,
    transform: [
      {
        rotate: '-45deg'
      }
    ]
  }
}))
