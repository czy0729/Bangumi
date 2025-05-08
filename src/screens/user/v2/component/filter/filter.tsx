/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:28:02
 */
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Flex, Input, Loading } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Filter = memo(
  ({
    styles,
    showFilter = false,
    fliterInputText = '',
    isTabActive = false,
    isFiltering = false,
    onFilterChange = FROZEN_FN
  }) => {
    const inputRef = useRef(null)
    const aHeight = useRef(new Animated.Value(0))

    useEffect(() => {
      setTimeout(
        () => {
          Animated.timing(aHeight.current, {
            toValue: showFilter ? 1 : 0,
            duration: 160,
            useNativeDriver: false
          }).start()

          if (showFilter && isTabActive) {
            setTimeout(() => {
              if (typeof inputRef.current?.onFocus === 'function') {
                inputRef.current.onFocus()
              }
            }, 160)
          }
        },
        showFilter ? 160 : 0
      )
    }, [isTabActive, showFilter])

    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: aHeight.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, styles.filter.height]
            })
          }
        ]}
      >
        <Flex style={styles.filter} justify='center'>
          <Input
            ref={inputRef}
            inputStyle={styles.input}
            value={fliterInputText}
            placeholder='搜索'
            clearButtonMode='never'
            onChangeText={onFilterChange}
          />
          {isFiltering && (
            <Flex style={styles.loading} justify='center'>
              <Loading.Normal color={_.colorSub} size={16} />
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
