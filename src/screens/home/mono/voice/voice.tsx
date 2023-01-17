/*
 * @Author: czy0729
 * @Date: 2022-08-25 17:32:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 13:56:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Image, Text, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@_'
import { _ } from '@stores'
import { appNavigate, cnjp } from '@utils'
import { memo } from '@utils/decorators'
import SectionRight from '../section-right'
import { COVER_WIDTH, COVER_HEIGHT } from '../ds'
import { DEFAULT_PROPS, EVENT, IMAGE_WIDTH } from './ds'

export default memo(({ navigation, styles, style, voices }) => {
  global.rerender('Mono.Voice.Main')

  return (
    <View style={style ? [styles.container, style] : styles.container}>
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
          const onPress = () =>
            appNavigate(
              item.href,
              navigation,
              {
                _jp: item.name,
                _cn: item.nameCn,
                _image: item.cover
              },
              EVENT
            )

          const subjectTop = cnjp(item.subjectNameCn, item.subjectName)
          const subjectBottom = cnjp(item.subjectName, item.subjectNameCn)
          const onPressSubject = () =>
            appNavigate(item.subjectHref, navigation, {}, EVENT)
          return (
            <Flex key={item.href} style={styles.item} align='start'>
              {/* @ts-ignore */}
              <Flex flex={1} align='start'>
                <Image
                  src={item.cover}
                  size={IMAGE_WIDTH}
                  radius
                  shadow
                  onPress={onPress}
                />
                <Flex.Item style={_.ml.sm}>
                  <Touchable style={_.mt.xxs} onPress={onPress}>
                    <Text size={12} bold>
                      {nameTop}
                    </Text>
                    {!!nameBottom && nameBottom !== nameTop && (
                      <Text style={_.mt.xs} size={10} type='sub' bold>
                        {nameBottom}
                      </Text>
                    )}
                  </Touchable>
                  <Flex style={_.mt.xs}>
                    <Tag value={item.staff} />
                  </Flex>
                </Flex.Item>
              </Flex>
              {/* @ts-ignore */}
              <Flex style={_.ml.md} flex={1.5} align='start'>
                <Flex.Item>
                  <Touchable style={_.mt.xxs} onPress={onPressSubject}>
                    <Text size={12} align='right' bold>
                      {subjectTop}
                    </Text>
                    {!!subjectBottom && subjectBottom !== subjectTop && (
                      <Text style={_.mt.xs} size={10} type='sub' align='right'>
                        {subjectBottom}
                      </Text>
                    )}
                  </Touchable>
                </Flex.Item>
                {!!item.subjectCover && (
                  <Cover
                    style={_.ml.sm}
                    src={item.subjectCover}
                    size={COVER_WIDTH * 0.88}
                    height={COVER_HEIGHT * 0.88}
                    radius
                    shadow
                    onPress={onPressSubject}
                  />
                )}
              </Flex>
            </Flex>
          )
        })}
        <Heatmap id='人物.跳转' from='最近演出角色' />
      </View>
    </View>
  )
}, DEFAULT_PROPS)
