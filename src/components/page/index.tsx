/*
 * @Author: czy0729
 * @Date: 2022-05-01 14:26:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:26:47
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useFocusEffect } from '@react-navigation/native'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { Text } from '../text'
import { COMPONENT, DEV_DEBUG } from './ds'
import { styles } from './styles'

import type { Ctx, Props as PageProps } from './types'
export type { PageProps }

/** 页面容器 */
export const Page = observer(
  ({
    style,
    loaded,
    loadingColor,
    backgroundColor,
    loading,
    loadingText,
    children,
    statusBarEvent = true,
    ...other
  }: PageProps) => {
    const { $ } = useStore<Ctx>(COMPONENT)

    useFocusEffect(
      useCallback(() => {
        if (IOS && statusBarEvent) _.changeStatusBarStyle(false)
      }, [statusBarEvent])
    )

    const mergeStyle = stl(styles.page, IOS ? _.container.plain : _.container.flex, style)
    if (loaded || loaded === undefined) {
      const showDebug = DEV_DEBUG && typeof $?.state === 'object' && 'visibleBottom' in $.state
      return (
        <ErrorBoundary style={mergeStyle}>
          <View style={mergeStyle} {...other}>
            {children}
            {!!loading && (
              <View style={styles.loading}>
                <Loading>
                  {!!loadingText && (
                    <Text style={_.mt.sm} type='icon' size={12} bold>
                      {loadingText}
                    </Text>
                  )}
                </Loading>
              </View>
            )}
          </View>
          {showDebug && (
            <Text style={styles.visibleBottom} type='__plain__' size={8} bold shadow>
              vb:{$.state.visibleBottom}
            </Text>
          )}
        </ErrorBoundary>
      )
    }

    return <Loading style={mergeStyle} color={loadingColor} backgroundColor={backgroundColor} />
  }
)

export default Page
