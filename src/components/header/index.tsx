/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-28 21:15:21
 */
import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
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

    useEffect(() => {
      updateHeader({
        navigation,
        mode,
        fixed,
        title,
        headerLeft,
        headerRight,
        headerTitleAlign,
        headerTitleStyle,
        statusBarEventsType,
        onBackPress
      })
    }, [
      navigation,
      mode,
      fixed,
      title,
      headerLeft,
      headerRight,
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
