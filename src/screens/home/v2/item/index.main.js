/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 01:56:50
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import Cover from './cover'
import Title from './title'
import OnAir from './onair'
import Eps from './eps'
import Count from './count'
import ToolBar from './tool-bar'
import Progress from './progress'
import { defaultProps } from './ds'

const titleHitSlops = {
  top: _.device(8, 4),
  right: _.device(8, 4),
  bottom: _.device(2, 4),
  left: _.device(8, 4)
}

function Main({
  styles,
  index,
  subject,
  subjectId,
  epStatus,
  heatMap,
  expand,
  top,
  onItemPress
}) {
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
      <Eps subjectId={subjectId} />
      {isTop && <View style={styles.dot} />}
    </View>
  )
}

export default memo(Main, defaultProps)
