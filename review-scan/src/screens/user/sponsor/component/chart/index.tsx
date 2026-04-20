/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 10:38:16
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import { USERS_MAP } from '../../ds'
import { useTreemapSquarify } from '../../utils'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Chart({ navigation }: NavigationProps) {
  r(COMPONENT)

  const styles = memoStyles()
  const { data, filterLength, filterCount, handleFilter, handleBatchFilter, handleResetFilter } =
    useTreemapSquarify()
  return useObserver(() => (
    <View style={_.container.header}>
      <Flex style={styles.filter} direction='column' justify='center'>
        <Flex>
          {filterLength ? (
            <>
              <Text size={12} bold>
                已隐藏 {filterLength} 格，还有 {filterCount} 格未显示
              </Text>
              <View style={styles.refresh}>
                <IconTouchable
                  name='md-refresh'
                  color={_.colorDesc}
                  size={18}
                  onPress={() => handleResetFilter()}
                />
              </View>
            </>
          ) : (
            <Text size={12} bold>
              还有 {filterCount} 格未显示，点击方格隐藏，点击色块显示区间
            </Text>
          )}
        </Flex>
        {!filterLength && (
          <Flex style={styles.block} justify='around'>
            <Touchable style={styles.touch} onPress={() => handleBatchFilter(200)}>
              <Flex>
                <View style={[styles.l, styles.l4]} />
                <Text style={_.mr.sm} size={10} bold>
                  ≥ 100
                </Text>
              </Flex>
            </Touchable>
            <Touchable onPress={() => handleBatchFilter(50)}>
              <Flex>
                <View style={[styles.l, styles.l3]} />
                <Text style={_.mr.sm} size={10} bold>
                  ≥ 50
                </Text>
              </Flex>
            </Touchable>
            <Touchable onPress={() => handleBatchFilter(20)}>
              <Flex>
                <View style={[styles.l, styles.l2]} />
                <Text style={_.mr.sm} size={10} bold>
                  ≥ 20
                </Text>
              </Flex>
            </Touchable>
            <Touchable onPress={() => handleBatchFilter(10)}>
              <Flex>
                <View style={[styles.l, styles.l1]} />
                <Text style={_.mr.sm} size={10} bold>
                  ≥ 10
                </Text>
              </Flex>
            </Touchable>
          </Flex>
        )}
      </Flex>
      <View style={styles.container}>
        {data.map(item => (
          <Item
            key={item.data}
            {...item}
            onPress={() => {
              handleFilter(item.data)
            }}
            onLongPress={
              systemStore.advance
                ? () => {
                    const userId = item.data
                    navigation.push('Zone', {
                      userId,
                      _name: USERS_MAP[item.data]?.n
                    })

                    t('赞助者.跳转', {
                      userId
                    })
                  }
                : undefined
            }
          />
        ))}
      </View>
    </View>
  ))
}

export default Chart
