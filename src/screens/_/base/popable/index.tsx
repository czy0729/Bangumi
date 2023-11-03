/*
 * @Author: czy0729
 * @Date: 2022-08-13 04:56:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-26 01:57:27
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Popover } from 'react-native-popable'
import { Portal, Flex, Text, Touchable, Skeleton } from '@components'
import { _, subjectStore, systemStore, uiStore } from '@stores'
import { cnjp, navigationReference } from '@utils'
import { t } from '@utils/fetch'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { BlurView } from '../blur-view'
import { Cover } from '../cover'
import { Rank } from '../rank'
import { Stars } from '../stars'
import { getPosition } from './utils'
import { memoStyles } from './styles'

export const Popable = ({ subjectId, visible, portalKey, x, y }) => {
  return useObserver(() => {
    const styles = memoStyles()
    const { hideScore } = systemStore.setting
    const { images, name, name_cn, air_date, rank, rating, _loaded } =
      subjectStore.subject(subjectId)
    const year = String(air_date).match(/\d{4}/)
    const textTop = cnjp(name_cn, name)
    const textBottom = cnjp(name, name_cn)
    const position = getPosition(x, y)
    return (
      <Portal key={String(portalKey)}>
        <Popover
          style={[styles.subject, position.style]}
          position={position.position}
          visible={visible}
          caret={false}
          backgroundColor='transparent'
        >
          {!!subjectId && (
            <BlurView style={styles.container} intensity={_.select(64, 80)}>
              {_loaded ? (
                <Touchable
                  onPress={() => {
                    const navigation = navigationReference()
                    if (navigation) {
                      t('其他.缩略框跳转', {
                        to: 'Subject',
                        subjectId
                      })

                      uiStore.closePopableSubject()
                      setTimeout(() => {
                        navigation.push('Subject', {
                          subjectId
                        })
                      }, 40)
                    }
                  }}
                >
                  <Flex align='start'>
                    <Cover
                      key={subjectId}
                      style={styles.cover}
                      src={images?.medium}
                      width={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      borderWidth={_.hairlineWidth}
                      shadow={false}
                      textOnly={false}
                    />
                    <Flex.Item>
                      <Flex
                        style={styles.body}
                        direction='column'
                        justify='between'
                        align='start'
                      >
                        <View>
                          <Text size={12} lineHeight={13} numberOfLines={2} bold>
                            {textTop}
                            {year?.[0] && year?.[0] !== '0000' ? ` (${year[0]})` : ''}
                          </Text>
                          <Text
                            style={_.mt.xs}
                            type='sub'
                            size={10}
                            lineHeight={11}
                            numberOfLines={2}
                          >
                            {textBottom}
                          </Text>
                        </View>
                        <Flex>
                          <Rank style={styles.rank} value={rank} />
                          <Stars
                            style={styles.stars}
                            value={rating?.score}
                            simple
                            size={10}
                          />
                          {!!rating?.total && (
                            <Flex.Item style={!hideScore && _.ml.xs}>
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
                <Skeleton
                  width={styles.container.width}
                  height={styles.container.height}
                />
              )}
            </BlurView>
          )}
        </Popover>
      </Portal>
    )
  })
}
