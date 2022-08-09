/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-08 12:06:39
 */
import React, { useRef, useEffect, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Input, Loading } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
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
    global.rerender('User.Filter.Main')

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
      // @ts-ignore
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
                  <Loading.Raw color={_.colorSub} size={16} />
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
