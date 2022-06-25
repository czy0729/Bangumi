/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 17:24:24
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
import { TITLE_HIT_SLOPS } from './ds'

const defaultProps = {
  navigation: {},
  styles: {},
  index: 0,
  subject: {},
  subjectId: 0,
  epStatus: '',
  heatMap: false,
  expand: false,
  epsCount: 0,
  isTop: false,
  onItemPress: () => {}
}

const Item = memo(
  ({
    navigation,
    styles,
    index,
    subject,
    subjectId,
    epStatus,
    heatMap,
    expand,
    epsCount,
    isTop,
    onItemPress
  }) => {
    global.rerender('Home.Item.Main', subject.name_cn || subject.name)

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
                  <Title subjectId={subjectId} subject={subject} />
                </Flex.Item>
                <OnAir subjectId={subjectId} />
              </Flex>
            </Touchable>
            <View>
              <Flex style={styles.info}>
                <Count
                  index={index}
                  subjectId={subjectId}
                  subject={subject}
                  epStatus={epStatus}
                />
                <Flex.Item />
                <ToolBar
                  index={index}
                  subjectId={subjectId}
                  subject={subject}
                  isTop={isTop}
                />
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
        <Collapsible key={String(epsCount)} collapsed={!expand}>
          <Eps index={index} subjectId={subjectId} />
        </Collapsible>
        {isTop && <View style={styles.dot} />}
      </View>
    )
  },
  defaultProps
)

export default Item
