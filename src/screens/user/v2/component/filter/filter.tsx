/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 搜索框展开 / 收起动画 (props 驱动, 浅比较)
 */
import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Flex, Input, Loading } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

import type { FilterProps } from './types'

const Filter = memo(
  ({
    styles,
    showFilter = false,
    fliterInputText = '',
    isFiltering = false,
    onFilterChange = FROZEN_FN
  }: FilterProps) => {
    const aHeight = useRef(new Animated.Value(0))

    useEffect(() => {
      const animation = aHeight.current
      const timer = setTimeout(
        () => {
          Animated.timing(animation, {
            toValue: showFilter ? 1 : 0,
            duration: 160,
            useNativeDriver: false
          }).start()
        },
        showFilter ? 160 : 0
      )

      return () => {
        clearTimeout(timer)
        animation.stopAnimation(() => {})
      }
    }, [showFilter])

    return (
      <Animated.View
        style={stl(styles.container, {
          height: aHeight.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, styles.filter.height]
          })
        })}
      >
        <Flex style={styles.filter} justify='center'>
          <Input
            inputStyle={styles.input}
            value={fliterInputText}
            placeholder='搜索'
            clearButtonMode='never'
            onChangeText={onFilterChange}
          />
          {isFiltering && (
            <Flex style={styles.loading} justify='center'>
              <Loading.Medium color={_.colorSub} />
            </Flex>
          )}
        </Flex>
      </Animated.View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Filter
