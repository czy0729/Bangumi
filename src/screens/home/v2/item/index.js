/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-23 14:43:37
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { DEV, IOS } from '@constants'
import Cover from './cover'
import Title from './title'
import OnAir from './onair'
import Eps from './eps'
import Count from './count'
import ToolBar from './tool-bar'
import Progress from './progress'
import { itemPadding } from './ds'

const LIMIT_HEAVY_RENDER = _.isPad ? 16 : 8

function Item({ index, subjectId, subject, epStatus }, { $, navigation }) {
  const styles = memoStyles()
  const { top, _mounted } = $.state
  if (index >= LIMIT_HEAVY_RENDER && (!_mounted || DEV)) {
    return <View style={styles.lazy} />
  }

  const { expand } = $.$Item(subjectId)
  const isTop = top.indexOf(subjectId) !== -1
  return (
    <View style={$.heatMap && expand ? styles.itemWithHeatMap : styles.item}>
      <Flex style={styles.hd}>
        <Cover index={index} subjectId={subjectId} subject={subject} />
        <Flex.Item style={styles.content}>
          <Touchable
            style={styles.title}
            withoutFeedback
            onPress={() => $.onItemPress(navigation, subjectId, subject)}
          >
            <Flex align='start'>
              <Flex.Item>
                <Title subject={subject} />
              </Flex.Item>
              <OnAir subjectId={subjectId} />
            </Flex>
          </Touchable>
          <View>
            <Flex style={styles.info}>
              <Flex.Item>
                <Count
                  index={index}
                  subjectId={subjectId}
                  subject={subject}
                  epStatus={epStatus}
                />
              </Flex.Item>
              <ToolBar index={index} subjectId={subjectId} subject={subject} />
            </Flex>
            <Progress epStatus={epStatus} subject={subject} />
          </View>
        </Flex.Item>
        {index === 1 && (
          <View>
            <Heatmap id='首页.置顶或取消置顶' />
          </View>
        )}
      </Flex>
      <Eps subjectId={subjectId} />
      {isTop && <View style={styles.dot} />}
    </View>
  )
}

export default obc(Item, {
  index: '',
  subjectId: 0,
  subject: {},
  epStatus: ''
})

const memoStyles = _.memoStyles(_ => ({
  lazy: {
    height: 150,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  item: {
    paddingVertical: itemPadding,
    paddingLeft: itemPadding,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  itemWithHeatMap: {
    paddingTop: itemPadding,
    paddingBottom: itemPadding + 4,
    paddingLeft: itemPadding,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
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
    minHeight: 60
  },
  info: {
    height: 40
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    borderWidth: 8,
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
