/*
 * @Author: czy0729
 * @Date: 2022-09-06 18:13:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:01:40
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../types'
import { FILTER_DS } from './ds'
import { memoStyles } from './styles'

function Filter(props, { $ }: Ctx) {
  const { type } = $.state
  if (type !== 'advance') return null

  const styles = memoStyles()
  return (
    <View style={styles.filter}>
      {FILTER_DS.map(item => (
        <Flex key={item.key} style={styles.row}>
          <View>
            <Text size={12} bold>
              {item.title}
            </Text>
          </View>
          <Flex.Item style={_.ml.md}>
            <ScrollView
              style={styles.contentContainerStyle}
              horizontal
              {...SCROLL_VIEW_RESET_PROPS}
            >
              {item.data.map((i, index) => {
                // 因为只设计了一行, 屏幕外面的选择了, 复制一个放在前面用于提示
                if (
                  item.key === 'filterKey' &&
                  !index &&
                  $.state.filterKey &&
                  // @ts-expect-error
                  item.data.indexOf($.state.filterKey) >= 7
                ) {
                  return (
                    <>
                      <Touchable
                        key={i}
                        style={styles.item}
                        onPress={() => $.onFilterChange(item.key, i)}
                      >
                        <Text size={11}>{i}</Text>
                      </Touchable>
                      <Touchable
                        key={i}
                        style={[styles.item, styles.itemActive]}
                        onPress={() => $.onFilterChange(item.key, $.state.filterKey)}
                      >
                        <Text size={11}>{$.state.filterKey}</Text>
                      </Touchable>
                    </>
                  )
                }

                const isActive = $.state[item.key] === i
                return (
                  <Touchable
                    key={i}
                    style={[styles.item, isActive && styles.itemActive]}
                    onPress={() => $.onFilterChange(item.key, i)}
                  >
                    <Text size={11}>{i}</Text>
                  </Touchable>
                )
              })}
            </ScrollView>
          </Flex.Item>
        </Flex>
      ))}
    </View>
  )
}

export default obc(Filter)
