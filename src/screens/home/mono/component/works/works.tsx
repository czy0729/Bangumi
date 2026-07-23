/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:28:48
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, SectionTitle, Tag } from '@_'
import { _ } from '@stores'
import { appNavigate, stl, x18 } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COVER_HEIGHT, COVER_WIDTH } from '../../ds'
import SectionRight from '../section-right'
import { COMPONENT_MAIN, DEFAULT_PROPS, EVENT } from './ds'

import type { SubjectTypeCn } from '@types'

const Works = memo(
  ({ navigation, styles, style, works }) => {
    return (
      <InView style={stl(styles.container, style)} y={Math.floor(_.window.height * 0.5)}>
        <SectionTitle
          style={styles.section}
          right={
            <>
              <SectionRight event={EVENT} text='更多作品' to='Works' />
              <Heatmap id='人物.跳转' to='Works' alias='更多作品' />
            </>
          }
        >
          最近参与
        </SectionTitle>

        <View style={_.mt.md}>
          {works.map(item => {
            const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)
            const subjectId = item.href?.split('/subject/')?.[1]

            return (
              <Touchable
                key={item.href}
                animate
                onPress={() => {
                  appNavigate(
                    item.href,
                    navigation,
                    {
                      _jp: item.name,
                      _image: getCoverSrc(item.cover, COVER_WIDTH),
                      _type: type
                    },
                    EVENT
                  )
                }}
              >
                <Flex style={styles.item} align='start'>
                  <Cover
                    size={type === '音乐' ? COVER_WIDTH * 1.14 : COVER_WIDTH}
                    height={COVER_HEIGHT}
                    src={item.cover}
                    radius={_.radiusSm}
                    type={type}
                    cdn={subjectId ? !x18(subjectId) : undefined}
                  />
                  <Flex.Item style={styles.content}>
                    <Text style={_.mt.xs} size={12} bold>
                      {item.name}
                    </Text>
                    <Flex style={_.mt.sm}>
                      <Tag value={item.staff} />
                    </Flex>
                  </Flex.Item>
                </Flex>
              </Touchable>
            )
          })}
          <Heatmap id='人物.跳转' from='最近参与' />
        </View>
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Works
