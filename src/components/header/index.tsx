/*
 * 适配 react-navigation@5
 * 完全替代 @utils/decorators/withHeader.js
 *
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 08:51:42
 */
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { StatusBarEvents } from '../status-bar-events'
import { Track } from '../track'
import Popover from './popover'
import Placeholder from './placeholder'
import { updateHeader } from './utils'
import HeaderComponent from './header-component'
import { statusBarEventsTypes } from './styles'
import { IHeader } from './types'

const Header: IHeader = ({
  mode,
  fixed = false,
  title,
  hm,
  alias,
  headerRight = null,
  headerTitle = null,
  headerTitleAlign = 'center',
  headerTitleStyle,
  statusBarEvents = true,
  statusBarEventsType
}) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    updateHeader({
      navigation,
      mode,
      fixed,
      title,
      headerRight,
      headerTitleAlign,
      headerTitleStyle,
      statusBarEventsType
    })
  }, [
    navigation,
    mode,
    fixed,
    title,
    headerRight,
    headerTitleAlign,
    headerTitleStyle,
    statusBarEventsType
  ])

  return useObserver(() => {
    let statusBarEventsProps = {}
    if (statusBarEvents) {
      if (statusBarEventsType && statusBarEventsTypes[statusBarEventsType]) {
        statusBarEventsProps = statusBarEventsTypes[statusBarEventsType](fixed)
      } else if (mode) {
        statusBarEventsProps = {
          barStyle: fixed ? 'light-content' : 'dark-content',
          backgroundColor: 'transparent',
          action: 'onWillFocus'
        }
      } else if (!IOS && _.isDark) {
        statusBarEventsProps = {
          backgroundColor: _._colorPlainHex
        }
      }
    }

    return (
      <>
        {!!mode && (
          <HeaderComponent
            navigation={navigation}
            fixed={fixed}
            title={title}
            statusBarEventsType={statusBarEventsType}
            headerTitle={headerTitle}
            headerRight={headerRight}
          />
        )}
        {statusBarEvents && <StatusBarEvents {...statusBarEventsProps} />}
        <Track title={title} hm={hm} alias={alias} />
      </>
    )
  })
}

Header.Popover = Popover

Header.Placeholder = Placeholder

export { Header }
