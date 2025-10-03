/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:50:54
 */
import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useInternal } from '../../hooks'
import { BORDER_DARK_COLOR, BORDER_LIGHT_COLOR } from './constants'

const Separator = () => {
  const { theme } = useInternal()

  const separatorStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: theme.value === 'dark' ? BORDER_DARK_COLOR : BORDER_LIGHT_COLOR
    }
  }, [theme])

  return <Animated.View style={[styles.separator, { ...separatorStyles }]} />
}

export default memo(Separator)

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 8
  }
})
