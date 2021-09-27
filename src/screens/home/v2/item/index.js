/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-09-26 13:58:56
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Accordion, Heatmap } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import Cover from './cover'
import Title from './title'
import OnAir from './onair'
import Eps from './eps'
import Count from './count'
import ToolBar from './tool-bar'
import Progress from './progress'
import { itemPadding } from './ds'

const LIMIT_HEAVY = _.device(8, 16)
const titleHitSlops = {
  top: _.device(8, 4),
  right: _.device(8, 4),
  bottom: _.device(2, 4),
  left: _.device(8, 4)
}
const defaultProps = {
  styles: {},
  index: 0,
  subject: {},
  subjectId: 0,
  epStatus: '',
  heatMap: false,
  expand: false,
  isTop: false,
  onItemPress: Function.prototype
}

const Item = memo(
  ({
    styles,
    index,
    subject,
    subjectId,
    epStatus,
    heatMap,
    expand,
    top,
    onItemPress
  }) => {
    rerender('Home.Item.Main', subject.name_cn || subject.name)

    const isTop = top.indexOf(subjectId) !== -1
    return (
      <View style={heatMap && expand ? styles.itemWithHeatMap : styles.item}>
        <Flex style={styles.hd}>
          <Cover index={index} subjectId={subjectId} subject={subject} />
          <Flex.Item style={styles.content}>
            <Touchable
              style={styles.title}
              withoutFeedback
              hitSlop={titleHitSlops}
              onPress={onItemPress}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Title subjectId={subjectId} subject={subject} />
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
        <Accordion expand={expand}>
          <Eps subjectId={subjectId} />
        </Accordion>
        {isTop && <View style={styles.dot} />}
      </View>
    )
  },
  defaultProps
)

export default obc(
  ({ index = 0, subjectId = 0, subject = {}, epStatus = '' }, { $, navigation }) => {
    // rerender('Home.Item', subject.name_cn || subject.name)

    const { _mounted } = $.state
    if (index >= LIMIT_HEAVY && !_mounted) {
      const styles = memoStylesLazy()
      return <View style={styles.lazy} />
    }

    const styles = memoStyles()
    const { top } = $.state
    const { expand } = $.$Item(subjectId)
    return (
      <Item
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
)

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
