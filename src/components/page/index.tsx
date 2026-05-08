/*
 * @Author: czy0729
 * @Date: 2022-05-01 14:26:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-07 23:36:51
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useFocusEffect } from '@react-navigation/native'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { DEV, IOS } from '@constants'
import { INVIEW_SHOW } from '@src/config'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { StatusBar } from '../status-bar'
import { Text } from '../text'
import { COMPONENT } from './ds'
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
        if (IOS && statusBarEvent) {
          StatusBar.setBarStyle(_.isDark ? 'light-content' : 'dark-content')
        }
      }, [statusBarEvent])
    )

    const mergeStyle = stl(_.container.plain, style)
    if (loaded || loaded === undefined) {
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
          {DEV && INVIEW_SHOW && typeof $?.state === 'object' && 'visibleBottom' in $.state && (
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
