/*
 * @Author: czy0729
 * @Date: 2024-10-30 22:21:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:06:47
 */
import React from 'react'
import { View } from 'react-native'
import { Cover, Flex, Highlight, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_FN, IMG_INFO_ONLY } from '@constants'
import { useMonoResult } from './hooks'
import { COMPONENT_MAIN, DEFAULT_PROPS_MONO } from './ds'

const AdvanceMono = memo(
  ({ navigation, styles, value = '', onSubmit = FROZEN_FN }) => {
    const result = useMonoResult(value)
    const isMonoId = /\d+/.test(value)
    return (
      <View>
        {isMonoId && (
          <>
            <Flex style={_.mt.md}>
              <Touchable
                style={styles.item}
                onPress={() => {
                  const monoId = `character/${value}` as const
                  navigation.push('Mono', {
                    monoId
                  })

                  t('搜索.人物直达', {
                    monoId
                  })
                }}
              >
                <Text size={12} bold>
                  虚拟人物 #{value}
                </Text>
              </Touchable>
            </Flex>
            <Flex style={_.mv.sm}>
              <Touchable
                style={styles.item}
                onPress={() => {
                  const monoId = `person/${value}` as const
                  navigation.push('Mono', {
                    monoId
                  })

                  t('搜索.人物直达', {
                    monoId
                  })
                }}
              >
                <Text size={12} bold>
                  现实人物 #{value}
                </Text>
              </Touchable>
            </Flex>
          </>
        )}
        {result.map(item => {
          const cover = item.c ? `https://lain.bgm.tv/pic/crt/g/${item.c}.jpg` : ''
          return (
            <Flex key={item.i} style={styles.itemMono}>
              <View style={_.mr.sm}>
                <Cover src={cover || IMG_INFO_ONLY} size={32} radius />
              </View>
              <Flex.Item>
                <Touchable
                  onPress={() => {
                    const monoId = `${item.p ? 'person' : 'character'}/${item.i}` as const
                    navigation.push('Mono', {
                      monoId,
                      _name: item.n,
                      _image: cover,
                      _count: item.r
                    })

                    t('搜索.模糊查询跳转', {
                      monoId
                    })
                  }}
                >
                  <Flex>
                    <Highlight bold value={value} numberOfLines={2}>
                      {`${item.n.slice(0, 16)}${item.n.length > 16 ? '...' : ''}`}
                    </Highlight>
                    {!!item.r && (
                      <Text style={_.ml.xs} type='main' size={12}>
                        +{item.r}
                      </Text>
                    )}
                  </Flex>
                </Touchable>
              </Flex.Item>
              <Touchable
                style={styles.open}
                onPress={() => {
                  onSubmit(item.n)

                  t('搜索.模糊查询点击', {
                    text: item.n
                  })
                }}
              >
                <Iconfont name='md-search' size={20} />
              </Touchable>
            </Flex>
          )
        })}
      </View>
    )
  },
  DEFAULT_PROPS_MONO,
  COMPONENT_MAIN
)

export default AdvanceMono
