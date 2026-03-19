/*
 * @Author: czy0729
 * @Date: 2022-08-13 04:56:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:52:50
 */
import React from 'react'
import { View } from 'react-native'
import { Popover as RNPopable } from 'react-native-popable'
import { observer } from 'mobx-react'
import { Component, Cover, Flex, Portal, Skeleton, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _, subjectStore, systemStore, uiStore } from '@stores'
import { cnjp, navigationReference } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { BlurView } from '../blur-view'
import { Rank } from '../rank'
import { Stars } from '../stars'
import { getPosition } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as PopableProps } from './types'
export type { PopableProps }

export const Popable = observer(({ subjectId, visible, portalKey, x, y }: PopableProps) => {
  r(COMPONENT)

  const styles = memoStyles()
  const { images, name, name_cn, air_date, rank, rating, eps_count } =
    subjectStore.subject(subjectId)

  const year = String(air_date).match(/\d{4}/)
  const textTop = cnjp(name_cn, name)

  const temp = cnjp(name, name_cn)
  const textBottom = [temp !== textTop ? temp : '', eps_count ? `${eps_count} 话` : '']
    .filter(Boolean)
    .join(' · ')

  const position = getPosition(x, y)
  const src = images?.medium

  return (
    <Component id='base-popable'>
      <Portal key={String(portalKey)}>
        <RNPopable
          style={[styles.subject, position.style]}
          position={position.position}
          visible={visible}
          caret={false}
          backgroundColor='transparent'
        >
          {!!subjectId && (
            <BlurView style={styles.container} intensity={_.select(64, 80)}>
              {textTop ? (
                <Touchable
                  onPress={() => {
                    const navigation = navigationReference()
                    if (!navigation) return

                    uiStore.closePopableSubject()
                    setTimeout(() => {
                      navigation.push('Subject', {
                        subjectId,
                        _jp: name,
                        _cn: name_cn,
                        _image: getCoverSrc(src, IMG_WIDTH)
                      })

                      t('其他.缩略框跳转', {
                        subjectId,
                        to: 'Subject'
                      })
                    }, 40)
                  }}
                >
                  <Flex align='start'>
                    <Cover
                      key={subjectId}
                      style={styles.cover}
                      src={src}
                      width={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      borderWidth={_.hairlineWidth}
                    />

                    <Flex.Item>
                      <Flex style={styles.body} direction='column' justify='between' align='start'>
                        <View>
                          <Text size={12} lineHeight={13} numberOfLines={2} bold>
                            {textTop}
                            {year?.[0] && year?.[0] !== '0000' ? ` (${year[0]})` : ''}
                          </Text>

                          {textBottom && textBottom !== textTop && (
                            <Text
                              style={[_.mt.xs, _.mr.xs]}
                              type='sub'
                              size={10}
                              lineHeight={11}
                              numberOfLines={2}
                              ellipsizeMode='middle'
                            >
                              {textBottom}
                            </Text>
                          )}
                        </View>

                        <Flex>
                          <Rank style={styles.rank} value={rank} />
                          <Stars style={styles.stars} value={rating?.score} simple size={10} />
                          {!!rating?.total && (
                            <Flex.Item style={!systemStore.setting.hideScore && _.ml.xs}>
                              <Text type='sub' size={10} numberOfLines={1}>
                                ({rating.total}人评分)
                              </Text>
                            </Flex.Item>
                          )}
                        </Flex>
                      </Flex>
                    </Flex.Item>
                  </Flex>
                </Touchable>
              ) : (
                <Skeleton width={styles.container.width} height={styles.container.height} />
              )}
            </BlurView>
          )}
        </RNPopable>
      </Portal>
    </Component>
  )
})

export default Popable
