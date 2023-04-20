/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 22:21:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Collapsible, Heatmap, Loading } from '@components'
import { _ } from '@stores'
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
    index,
    subject,
    subjectId,
    title,
    epStatus,
    heatMap,
    expand,
    epsCount,
    isTop,
    isRefreshing,
    onItemPress
  }) => {
    // global.rerender('Home.Item.Main', subject.name_cn || subject.name)

    const isFirst = index === 0
    return (
      <View style={heatMap && expand ? styles.itemWithHeatMap : styles.item}>
        <Flex style={styles.hd}>
          <Cover index={index} subjectId={subjectId} subject={subject} />
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
                {isRefreshing && <Loading.Medium color={_.colorSub} size={16} />}
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
              {title !== '游戏' && (
                <Progress subjectId={subjectId} epStatus={epStatus} />
              )}
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
