/*
 * @Author: czy0729
 * @Date: 2022-08-25 17:32:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:15:32
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Heatmap, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView, SectionTitle, Tag } from '@_'
import { _ } from '@stores'
import { appNavigate, cnjp, stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY } from '@constants'
import { COVER_HEIGHT, COVER_WIDTH } from '../../ds'
import SectionRight from '../section-right'
import { COMPONENT_MAIN, DEFAULT_PROPS, EVENT, IMAGE_WIDTH } from './ds'

const Voice = memo(
  ({ navigation, styles, style, voices = FROZEN_ARRAY }) => {
    return (
      <InView style={stl(styles.container, style)}>
        <SectionTitle
          style={styles.section}
          right={
            <>
              <SectionRight event={EVENT} text='更多角色' to='Voices' />
              <Heatmap id='人物.跳转' to='Voices' alias='更多角色' />
            </>
          }
        >
          最近演出角色
        </SectionTitle>
        <View style={_.mt.md}>
          {voices.map(item => {
            const nameTop = cnjp(item.nameCn, item.name)
            const nameBottom = cnjp(item.name, item.nameCn)
            const subjectTop = cnjp(item.subjectNameCn, item.subjectName)
            const subjectBottom = cnjp(item.subjectName, item.subjectNameCn)
            return (
              <Flex key={item.href} style={styles.item} align='start'>
                <Flex.Item>
                  <Touchable
                    animate
                    onPress={() => {
                      appNavigate(
                        item.href,
                        navigation,
                        {
                          _jp: item.name,
                          _cn: item.nameCn,
                          _image: getCoverSrc(item.cover, IMAGE_WIDTH)
                        },
                        EVENT
                      )
                    }}
                  >
                    <Flex align='start'>
                      <Cover src={item.cover} size={IMAGE_WIDTH} radius />
                      <Flex.Item style={_.ml.sm}>
                        <Text style={_.mt.xxs} size={12} bold>
                          {nameTop}
                        </Text>
                        {!!nameBottom && nameBottom !== nameTop && (
                          <Text style={_.mt.xs} size={10} type='sub' bold>
                            {nameBottom}
                          </Text>
                        )}
                        <Flex style={_.mt.xs}>
                          <Tag value={item.staff} />
                        </Flex>
                      </Flex.Item>
                    </Flex>
                  </Touchable>
                </Flex.Item>
                <Flex.Item style={_.ml.md} flex={1.4}>
                  <Touchable
                    animate
                    onPress={() => {
                      appNavigate(item.subjectHref, navigation, {}, EVENT)
                    }}
                  >
                    <Flex align='start'>
                      <Flex.Item>
                        <Text style={_.mt.xxs} size={12} bold numberOfLines={3}>
                          {subjectTop}
                        </Text>
                        {!!subjectBottom && subjectBottom !== subjectTop && (
                          <Text style={_.mt.xs} size={10} type='sub' numberOfLines={2}>
                            {subjectBottom}
                          </Text>
                        )}
                      </Flex.Item>
                      {!!item.subjectCover && (
                        <View style={_.ml.sm}>
                          <Cover
                            src={item.subjectCover}
                            size={COVER_WIDTH}
                            height={COVER_HEIGHT}
                            radius={_.radiusSm}
                          />
                        </View>
                      )}
                    </Flex>
                  </Touchable>
                </Flex.Item>
              </Flex>
            )
          })}
          <Heatmap id='人物.跳转' from='最近演出角色' />
        </View>
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Voice
