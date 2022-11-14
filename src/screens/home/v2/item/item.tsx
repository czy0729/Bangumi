/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-14 17:05:54
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Collapsible, Heatmap } from '@components'
import { memo } from '@utils/decorators'
import Cover from './cover'
import Title from './title'
import OnAir from './onair'
import Eps from './eps'
import Count from './count'
import ToolBar from './tool-bar'
import Progress from './progress'
import { DEFAULT_PROPS, TITLE_HIT_SLOPS } from './ds'

const Item = memo(
  ({
    navigation,
    styles,
    subject,
    subjectId,
    title,
    epStatus,
    heatMap,
    expand,
    epsCount,
    isTop,
    isFirst,
    onItemPress
  }) => {
    global.rerender('Home.Item.Main', subject.name_cn || subject.name)

    return (
      <View style={heatMap && expand ? styles.itemWithHeatMap : styles.item}>
        <Flex style={styles.hd}>
          <Cover subjectId={subjectId} subject={subject} isFirst={isFirst} />
          <Flex.Item style={styles.content}>
            <Touchable
              style={styles.title}
              withoutFeedback
              hitSlop={TITLE_HIT_SLOPS}
              onPress={() => onItemPress(navigation, subjectId, subject)}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Title subjectId={subjectId} subject={subject} title={title} />
                </Flex.Item>
                <OnAir subjectId={subjectId} />
              </Flex>
            </Touchable>
            <View>
              <Flex style={styles.info}>
                <Count
                  subjectId={subjectId}
                  subject={subject}
                  epStatus={epStatus}
                  isFirst={isFirst}
                />
                <Flex.Item />
                <ToolBar
                  subjectId={subjectId}
                  subject={subject}
                  epStatus={epStatus}
                  isTop={isTop}
                  isFirst={isFirst}
                />
              </Flex>
              <Progress epStatus={epStatus} subject={subject} />
            </View>
          </Flex.Item>
          {isFirst && (
            <View>
              <Heatmap id='首页.置顶或取消置顶' />
            </View>
          )}
        </Flex>
        <Collapsible key={String(epsCount)} collapsed={!expand}>
          <Eps subjectId={subjectId} isFirst={isFirst} />
        </Collapsible>
        {isTop && <View style={styles.dot} />}
      </View>
    )
  },
  DEFAULT_PROPS
)

export default Item
