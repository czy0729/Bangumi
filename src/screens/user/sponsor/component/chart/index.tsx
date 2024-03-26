/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-10 13:56:09
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { Navigation } from '@types'
import { USERS_MAP } from '../../ds'
import { useTreemapSquarify } from '../../utils'
import Item from '../item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Chart({ navigation }: { navigation: Navigation }) {
  r(COMPONENT)

  const styles = memoStyles()
  const { data, filterLength, filterCount, setFilter, resetFilter } = useTreemapSquarify()
  return useObserver(() => (
    <>
      <Flex style={styles.filter} justify='center'>
        {filterLength ? (
          <>
            <Text size={13} bold>
              已隐藏 {filterLength} 格，还有 {filterCount} 格未显示
            </Text>
            <View style={styles.refresh}>
              <IconTouchable
                name='md-refresh'
                color={_.colorDesc}
                size={18}
                onPress={() => resetFilter()}
              />
            </View>
          </>
        ) : (
          <Text size={13} bold>
            还有 {filterCount} 格未显示，点击方格隐藏
          </Text>
        )}
      </Flex>
      <View style={styles.container}>
        {data.map(item => (
          <Item
            key={item.data}
            {...item}
            onPress={() => {
              setFilter(item.data)
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
    </>
  ))
}

export default Chart
