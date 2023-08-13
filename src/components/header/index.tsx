/*
 * 适配 react-navigation@5
 * 完全替代 @utils/decorators/withHeader.js
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-13 22:03:13
 */
import React, { useLayoutEffect } from 'react'
import { useNavigation, useObserver } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import { Track } from '../track'
import Popover from './popover'
import Placeholder from './placeholder'
import { updateHeader } from './utils'
import HeaderComponent from './header-component'
import { IHeader } from './types'

const Header: IHeader = ({
  mode,
  fixed = false,
  title,
  hm,
  alias,
  headerLeft = null,
  headerRight = null,
  headerTitle = null,
  headerTitleAlign = 'center',
  headerTitleStyle,
  statusBarEventsType
}) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    updateHeader({
      navigation,
      mode,
      fixed,
      title,
      headerLeft,
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
    headerLeft,
    headerRight,
    headerTitleAlign,
    headerTitleStyle,
    statusBarEventsType
  ])

  return useObserver(() => {
    const passProps = {
      navigation,
      fixed,
      mode,
      title,
      statusBarEventsType,
      headerTitle,
      headerLeft,
      headerRight
    }
    return (
      <>
        {!!mode && <HeaderComponent {...passProps} />}
        {STORYBOOK && !mode && (
          <>
            <Placeholder />
            <HeaderComponent {...passProps} fixed />
          </>
        )}
        <Track title={title} hm={hm} alias={alias} />
      </>
    )
  })
}

Header.Popover = Popover

Header.Placeholder = Placeholder

export { Header }
