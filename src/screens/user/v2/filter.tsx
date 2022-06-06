/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 05:58:29
 */
import React, { useRef, useEffect, useMemo } from 'react'
import { Animated, View } from 'react-native'
import { Flex, Input, Loading } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { tabs } from './store'

const defaultProps = {
  styles: {},
  showFilter: false,
  fliterInputText: '',
  isTabActive: false,
  isFiltering: false,
  onFilterChange: Function.prototype
}

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showFilter])

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
  defaultProps
)

export default obc(({ page }, { $ }) => {
  global.rerender('User.Filter')

  const { subjectType, showFilter, fliterInputText } = $.state
  const { key: type } = tabs[page]
  const isTabActive = $.isTabActive(subjectType, type)
  const isFiltering = $.isFiltering(subjectType, type)
  return (
    <Filter
      styles={memoStyles()}
      page={page}
      showFilter={showFilter}
      fliterInputText={fliterInputText}
      isTabActive={isTabActive}
      isFiltering={isFiltering}
      onFilterChange={$.onFilterChange}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    height: 56
  },
  filter: {
    paddingTop: _.sm - 2,
    paddingBottom: _.sm
  },
  wrap: {
    width: 248
  },
  input: {
    ..._.fontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: 40
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  loading: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    width: 44,
    height: 44
  }
}))
