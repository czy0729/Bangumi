/*
 * @Author: czy0729
 * @Date: 2022-07-20 14:29:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:15:13
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Expand, Flex, Heatmap, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { InView, SectionTitle, Tag } from '@_'
import { _, systemStore } from '@stores'
import { appNavigate, cnjp, getCoverMedium, stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { COVER_HEIGHT, COVER_WIDTH } from '../../ds'
import { COMPONENT_MAIN, DEFAULT_PROPS, EVENT } from './ds'

const Jobs = memo(
  ({ navigation, styles, style, jobs = FROZEN_ARRAY }) => {
    const { avatarRound } = systemStore.setting
    const radius = avatarRound ? COVER_WIDTH : _.radiusSm
    return (
      <InView style={styles.inView}>
        <Expand ratio={2.8}>
          <View style={stl(styles.container, style)}>
            <View>
              <SectionTitle
                left={
                  <Text style={_.ml.xs} type='sub' lineHeight={20}>
                    {jobs.length}
                  </Text>
                }
              >
                出演
              </SectionTitle>
              <Heatmap id='人物.跳转' from='出演' />
            </View>
            <View style={_.mt.md}>
              {jobs.map((item, index) => {
                const nameTop = cnjp(item.nameCn, item.name)
                const nameBottom = cnjp(item.name, item.nameCn)
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
                          _cn: item.nameCn,
                          _image: getCoverSrc(item.cover, COVER_WIDTH),
                          _type: type
                        },
                        EVENT
                      )
                    }}
                  >
                    <Flex style={styles.item} align='start'>
                      <Cover
                        src={item.cover}
                        type={type}
                        size={COVER_WIDTH}
                        height={COVER_HEIGHT}
                        radius={_.radiusSm}
                      />
                      {!index && <Heatmap right={-32} id='人物.跳转' to='Subject' alias='条目' />}
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
                                <View style={_.mr.sm}>
                                  <Cover size={_.r(24)} src={item.castCover} radius={radius} />
                                </View>
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
                                <View style={_.mr.xs}>
                                  <Cover
                                    size={_.r(24)}
                                    src={item?.cast2?.castCover}
                                    radius={radius}
                                  />
                                </View>
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
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Jobs
