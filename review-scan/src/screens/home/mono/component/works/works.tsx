/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:15:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { Cover, InView, SectionTitle, Tag } from '@_'
import { _ } from '@stores'
import { appNavigate, findSubjectCn, stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { COVER_HEIGHT, COVER_WIDTH } from '../../ds'
import SectionRight from '../section-right'
import { COMPONENT_MAIN, DEFAULT_PROPS, EVENT } from './ds'

const Works = memo(
  ({ navigation, styles, style, works = FROZEN_ARRAY }) => {
    return (
      <InView style={stl(styles.container, style)}>
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
                  />
                  <Flex.Item style={styles.content}>
                    <Flex align='start'>
                      <Flex.Item>
                        <Text style={_.mt.xs} bold size={12}>
                          {findSubjectCn(item.name)}
                        </Text>
                      </Flex.Item>
                      <Tag style={styles.tag} value={item.staff} />
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
