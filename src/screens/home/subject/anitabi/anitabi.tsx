/*
 * @Author: czy0729
 * @Date: 2023-01-12 06:39:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-12 08:43:02
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Heatmap, Iconfont, Image, Text, Touchable } from '@components'
import { PreventTouchPlaceholder, SectionTitle } from '@_'
import { _ } from '@stores'
import { date, open } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { DEFAULT_PROPS, THUMB_HEIGHT, THUMB_WIDTH } from './ds'

export default memo(({ styles, subjectId, data }) => {
  global.rerender('Subject.Anitabi.Main')

  const { city, pointsLength, imagesLength, litePoints } = data
  return (
    <View style={_.mt.lg}>
      <SectionTitle
        style={_.container.wind}
        right={
          <Touchable
            style={styles.touch}
            onPress={() => {
              t('条目.跳转', {
                to: 'anitabi.cn',
                from: '取景地标',
                subjectId
              })

              open(`https://anitabi.cn/map?bangumiId=${subjectId}`)
            }}
          >
            <Flex>
              <Text type='sub'>动画巡礼地图</Text>
              <Iconfont style={_.ml.xs} name='md-open-in-new' size={17} />
            </Flex>
            <Heatmap id='条目.跳转' from='取景地标' />
          </Touchable>
        }
      >
        取景地标
      </SectionTitle>

      <Flex style={[_.container.wind, _.mt.md]}>
        <Text size={11}>主要取景城市: </Text>
        <Text size={11} bold>
          {city}{' '}
        </Text>
        <Text size={11} type='sub'>
          {' '}
          ({pointsLength} 个地标 、{imagesLength} 张截图)
        </Text>
      </Flex>

      <ScrollView
        style={_.mt.md}
        contentContainerStyle={_.container.wind}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
        scrollEventThrottle={80}
      >
        {litePoints.map(item => (
          <View key={item.id} style={_.mr.sm}>
            <Image
              style={styles.image}
              src={item.image}
              size={THUMB_WIDTH}
              height={THUMB_HEIGHT}
              radius
            />
            <Text style={styles.title} size={11} bold numberOfLines={2}>
              {item.cn || item.name}
            </Text>
            {!!(item.ep || item.s) && (
              <Text style={styles.sub} type='sub' size={11} bold numberOfLines={1}>
                {item.ep ? `EP${item.ep} ` : ''}
                {item.s ? date('i:s', item.s) : ''}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>

      <PreventTouchPlaceholder />
    </View>
  )
}, DEFAULT_PROPS)
