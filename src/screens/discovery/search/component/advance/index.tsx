/*
 * @Author: czy0729
 * @Date: 2022-07-30 16:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-30 18:11:30
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Cover, Flex, Highlight, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { HOST_BGM_STATIC, IMG_INFO_ONLY } from '@constants'
import { useMonoResult, useResult } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

/** 模糊联想 */
function Advance() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)
  const { cat, value } = $.state

  const handleSubmit = useCallback(
    (text: string) => {
      $.onAdvance(text, navigation)
    },
    [$, navigation]
  )

  const { showAdvance } = $
  const isMono = cat === 'mono_all'
  const { result, substrings } = useResult(cat, value, showAdvance)
  const monoResult = useMonoResult(value, isMono && showAdvance)

  const styles = memoStyles()

  if (!showAdvance) return null

  const isSubjectId = /\d+/.test(value)

  return (
    <View>
      {isMono ? (
        <>
          {isSubjectId && (
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
          {monoResult.map(item => {
            const cover = item.c ? `${HOST_BGM_STATIC}/pic/crt/g/${item.c}.jpg` : ''
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
                    handleSubmit(item.n)

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
        </>
      ) : (
        <>
          {/* 条目 ID 直达 */}
          {isSubjectId && (
            <Flex style={styles.itemId}>
              <Touchable
                style={styles.item}
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId: value
                  })

                  t('搜索.条目直达', {
                    subjectId: value
                  })
                }}
              >
                <Text size={12} bold>
                  #{value}
                </Text>
              </Touchable>
            </Flex>
          )}

          {/* 模糊联想列表 */}
          {!!value &&
            result.map(item => {
              return (
                <Flex key={item} style={styles.item}>
                  <Flex.Item>
                    <Touchable
                      onPress={() => {
                        // 此时依据最新的安全时序，无论是否就绪，都能稳定拿到 subjectId
                        const subjectId = substrings.current[item]
                        navigation.push('Subject', {
                          subjectId,
                          _cn: item
                        })

                        t('搜索.模糊查询跳转', {
                          subjectId
                        })
                      }}
                    >
                      <Highlight bold value={value} numberOfLines={2}>
                        {item}
                      </Highlight>
                    </Touchable>
                  </Flex.Item>

                  {/* 填入搜索框二次确认按钮 */}
                  <Touchable
                    style={styles.open}
                    onPress={() => {
                      handleSubmit(item)

                      t('搜索.模糊查询点击', {
                        text: item
                      })
                    }}
                  >
                    <Iconfont name='md-search' size={20} />
                  </Touchable>
                </Flex>
              )
            })}
        </>
      )}
    </View>
  )
}

export default observer(Advance)
