/*
 * 适配 react-navigation@5
 * 完全替代 @utils/decorators/withHeader.js
 *
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-24 00:54:16
 */
import React, { useLayoutEffect } from 'react'
import { StyleProp, TextStyle } from 'react-native'
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

type Props = {
  /** 模式 */
  mode?: 'float' | 'transition'

  /** 是否锁定, 模式不为空时有效 */
  fixed?: boolean

  /** onScroll 垂直y坐标, 模式不为空时有效 */
  y?: number

  /** 标题 */
  title?: string

  /** 统计参数: [url地址, 对应页面key] */
  hm?: string[]

  /** 统计别名 */
  alias?: string

  /**
   * 右侧element
   * https://reactnavigation.org/docs/5.x/stack-navigator#headerright
   */
  headerRight?: React.ReactNode

  /** 模式为 'transition' 时有效, 代替 title 显示 */
  headerTitle?: React.ReactNode

  /** 标题对齐 */
  headerTitleAlign?: 'center' | 'left'

  /** 标题样式 */
  headerTitleStyle?: StyleProp<TextStyle>

  /** 是否变动状态栏主题 */
  statusBarEvents?: boolean

  /** 预设的状态栏主题 */
  statusBarEventsType?: 'Subject' | 'Topic' | 'Tinygrail'
}

const Header = ({
  mode,
  fixed = false,
  y = 0,
  title,
  hm,
  alias,
  headerRight = null,
  headerTitle = null,
  headerTitleAlign = 'center',
  headerTitleStyle,
  statusBarEvents = true,
  statusBarEventsType
}: Props) => {
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
            y={y}
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
