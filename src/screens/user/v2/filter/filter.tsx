/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-21 18:44:30
 */
import React, { useRef, useEffect, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Input, Loading } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { DEFAULT_PROPS } from './ds'

const Filter = memo(
  ({
    styles,
    showFilter,
    fliterInputText,
    isTabActive,
    isFiltering,
    onFilterChange
  }) => {
    rerender('User.Filter.Main')

    const inputRef = useRef(null)
    const aHeight = useRef(new Animated.Value(0))
    const animatedStyles = useMemo(
      () => ({
        height: aHeight.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 56]
        }),
        overflow: 'hidden'
      }),
      []
    )

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
      // @ts-expect-error
      <Animated.View style={animatedStyles}>
        <View style={styles.container}>
          <Flex style={styles.filter} justify='center'>
            <View style={styles.wrap}>
              <Input
                ref={inputRef}
                style={styles.input}
                clearButtonMode='never'
                value={fliterInputText}
                placeholder='搜索'
                onChangeText={onFilterChange}
              />
              {isFiltering && (
                <Flex style={styles.loading} justify='center'>
                  <Loading.Normal color={_.colorSub} size={16} />
                </Flex>
              )}
            </View>
          </Flex>
        </View>
      </Animated.View>
    )
  },
  DEFAULT_PROPS
)

export default Filter
