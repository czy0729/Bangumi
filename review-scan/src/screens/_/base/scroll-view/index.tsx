/*
 * @Author: czy0729
 * @Date: 2025-08-15 14:52:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 20:32:55
 */
import React, { useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView as ScrollViewComp } from '@components'
import { _ } from '@stores'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { Props as ScrollViewProps } from './types'

export { ScrollViewProps }

/** 支持下拉刷新的 ScrollView */
export const ScrollView = ({
  forwardRef,
  style,
  contentContainerStyle,
  colors,
  titleColor,
  tintColor,
  progressBackgroundColor,
  onRefresh,
  onScroll,
  children
}: ScrollViewProps) => {
  r(COMPONENT)

  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return

    setRefreshing(true)
    try {
      await onRefresh()
      setRefreshing(false)
      feedback(true)
    } catch (ex) {
      setRefreshing(false)
    }
  }, [onRefresh])

  return useObserver(() => (
    <ScrollViewComp
      forwardRef={forwardRef}
      style={style}
      contentContainerStyle={contentContainerStyle}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            colors={colors || [_.colorMain]}
            titleColor={titleColor || _.colorSub}
            tintColor={tintColor || _.colorSub}
            progressBackgroundColor={
              progressBackgroundColor || _.select(_.colorPlain, _._colorDarkModeLevel2)
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        ) : null
      }
      keyboardDismissMode='on-drag'
      onScroll={onScroll}
    >
      {children}
    </ScrollViewComp>
  ))
}

export default ScrollView
