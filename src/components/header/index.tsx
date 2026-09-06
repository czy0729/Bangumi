/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:10:13
 */
import { useEffect, useMemo } from 'react'
import { observer } from 'mobx-react'
import { _, useStoreContextBridge } from '@stores'
import { r } from '@utils/dev'
import { useNavigation } from '@utils/hooks'
import { WEB } from '@constants'
import { Track } from '../track'
import HeaderComponent from './header-component'
import Placeholder from './placeholder'
import Popover from './popover'
import { updateHeader } from './utils'
import { COMPONENT } from './ds'

import type { Props as HeaderProps, HeaderComponentType } from './types'
export type { HeaderProps }

/**
 * 自定义适配 react-navigation@6
 *  - 完全替代 @utils/decorators/withHeader.js
 */
const Header = observer(
  ({
    mode,
    fixed = false,
    title,
    domTitle,
    hm,
    alias,
    headerLeft = null,
    headerRight = null,
    headerTitle = null,
    headerTitleAlign = 'center',
    headerTitleStyle,
    statusBarEventsType,
    onBackPress
  }: HeaderProps) => {
    r(COMPONENT)

    const navigation = useNavigation()

    /**
     * 原生头部渲染 headerLeft / headerRight 时位于 StoreContext.Provider 之外,
     * 通过桥接 hook 把当前页面的上下文 id 包进渲染函数, 再传给 updateHeader
     */
    const bridge = useStoreContextBridge()
    const bridgedHeaderLeft = useMemo(
      () => (headerLeft ? bridge(() => headerLeft) : undefined),
      [headerLeft, bridge]
    )
    const bridgedHeaderRight = useMemo(
      () => (headerRight ? bridge(headerRight) : undefined),
      [headerRight, bridge]
    )

    useEffect(() => {
      updateHeader({
        navigation,
        headerLeft: bridgedHeaderLeft,
        headerRight: bridgedHeaderRight,
        mode,
        fixed,
        title,
        headerTitleAlign: _.device(headerTitleAlign, 'center'),
        headerTitleStyle,
        statusBarEventsType,
        onBackPress
      })
    }, [
      navigation,
      bridgedHeaderLeft,
      bridgedHeaderRight,
      mode,
      fixed,
      title,
      headerTitleAlign,
      headerTitleStyle,
      statusBarEventsType,
      onBackPress
    ])

    const passProps = {
      navigation,
      fixed,
      mode,
      title,
      statusBarEventsType,
      headerTitle,
      headerLeft,
      headerRight,
      onBackPress
    }

    return (
      <>
        {mode ? (
          <HeaderComponent {...passProps} />
        ) : WEB ? (
          <>
            <Placeholder />
            <HeaderComponent {...passProps} fixed />
          </>
        ) : null}
        <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
      </>
    )
  }
) as unknown as HeaderComponentType

Header.Popover = Popover
Header.Placeholder = Placeholder

export { Header }
export default Header
