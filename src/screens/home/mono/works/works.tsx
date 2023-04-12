/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 13:56:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Text, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@_'
import { _ } from '@stores'
import { appNavigate, findSubjectCn } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import SectionRight from '../section-right'
import { COVER_WIDTH, COVER_HEIGHT } from '../ds'
import { EVENT, DEFAULT_PROPS } from './ds'

export default memo(({ navigation, styles, style, works }) => {
  // global.rerender('Mono.Works.Main')

  return (
    <View style={style ? [styles.container, style] : styles.container}>
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
                    _image: item.cover,
                    _type: type
                  },
                  EVENT
                )
              }}
            >
              <Flex style={styles.item} align='start'>
                <Cover
                  size={COVER_WIDTH}
                  height={COVER_HEIGHT}
                  src={item.cover}
                  radius
                  shadow
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
    </View>
  )
}, DEFAULT_PROPS)
