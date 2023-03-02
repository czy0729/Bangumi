/*
 * @Author: czy0729
 * @Date: 2022-07-20 14:29:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 13:56:20
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Image, Text, Expand, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@_'
import { _, systemStore } from '@stores'
import { appNavigate, getCoverMedium, cnjp } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { COVER_WIDTH, COVER_HEIGHT } from '../ds'
import { DEFAULT_PROPS, EVENT } from './ds'

const Jobs = memo(({ navigation, styles, style, jobs }) => {
  global.rerender('Mono.Jobs.Main')

  const { avatarRound } = systemStore.setting
  const radius = avatarRound ? COVER_WIDTH : _.radiusSm
  return (
    <Expand ratio={2.8}>
      <View style={style ? [styles.container, style] : styles.container}>
        <View>
          <SectionTitle>出演</SectionTitle>
          <Heatmap id='人物.跳转' from='出演' />
        </View>
        <View style={_.mt.md}>
          {jobs.map((item, index) => {
            const nameTop = cnjp(item.nameCn, item.name)
            const nameBottom = cnjp(item.name, item.nameCn)
            const type = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)
            return (
              <Touchable
                animate
                onPress={() => {
                  appNavigate(
                    item.href,
                    navigation,
                    {
                      _jp: item.name,
                      _cn: item.nameCn,
                      _image: item.cover,
                      _type: type
                    },
                    EVENT
                  )
                }}
              >
                <Flex key={item.href} style={styles.item} align='start'>
                  <Cover
                    src={item.cover}
                    type={type}
                    size={COVER_WIDTH}
                    height={COVER_HEIGHT}
                    radius
                    shadow
                  />
                  {!index && (
                    <Heatmap right={-32} id='人物.跳转' to='Subject' alias='条目' />
                  )}
                  <Flex.Item style={styles.content}>
                    <Flex align='start'>
                      <Flex.Item>
                        <Text size={12} bold numberOfLines={3}>
                          {nameTop}
                        </Text>
                      </Flex.Item>
                      <Tag style={styles.tag} value={item.staff} />
                    </Flex>
                    {!!nameBottom && nameBottom !== nameTop && (
                      <Text style={_.mt.xs} size={10} type='sub' bold>
                        {nameBottom}
                      </Text>
                    )}
                    <Flex style={_.mt.md}>
                      <Touchable
                        animate
                        onPress={() => {
                          appNavigate(
                            item.castHref,
                            navigation,
                            {
                              _name: item.cast,
                              _image: getCoverMedium(item.castCover)
                            },
                            EVENT
                          )
                        }}
                      >
                        <Flex>
                          {!!item.castCover && (
                            <Image
                              style={_.mr.sm}
                              size={_.r(24)}
                              src={item.castCover}
                              radius={radius}
                              shadow
                            />
                          )}
                          <Text size={11} bold>
                            {item.cast}
                            {!!item.castTag && (
                              <Text size={8} type='sub' lineHeight={11} bold>
                                {' '}
                                {item.castTag}
                              </Text>
                            )}
                          </Text>
                        </Flex>
                        {!index && <Heatmap id='人物.跳转' to='Mono' alias='人物' />}
                      </Touchable>
                      {!!item?.cast2?.castCover && (
                        <Touchable
                          style={styles.castCover}
                          onPress={() =>
                            appNavigate(
                              item?.cast2?.castHref,
                              navigation,
                              {
                                _name: item?.cast2?.cast,
                                _image: getCoverMedium(item?.cast2?.castCover)
                              },
                              EVENT
                            )
                          }
                        >
                          <Flex>
                            <Image
                              style={_.mr.xs}
                              size={_.r(24)}
                              src={item?.cast2?.castCover}
                              radius={radius}
                              shadow
                            />
                            <Text size={11} bold>
                              {item?.cast2?.cast}
                              {!!item?.cast2?.castTag && (
                                <Text size={8} type='sub' lineHeight={11} bold>
                                  {' '}
                                  {item?.cast2?.castTag}
                                </Text>
                              )}
                            </Text>
                          </Flex>
                        </Touchable>
                      )}
                    </Flex>
                  </Flex.Item>
                </Flex>
              </Touchable>
            )
          })}
        </View>
      </View>
    </Expand>
  )
}, DEFAULT_PROPS)

export default Jobs
