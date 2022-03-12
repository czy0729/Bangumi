/*
 * 适配 react-navigation@5
 * 完全替代 @utils/decorators/withHeader.js
 *
 * @Author: czy0729
 * @Date: 2022-03-10 17:27:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 22:11:59
 */
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { _ } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import { hm as utilsHM } from '@utils/fetch'
import { IOS } from '@constants'
import { StatusBarEvents } from '../status-bar-events'
import { UM } from '../um'
import { Heatmap } from '../heatmap'
import Popover from './popover'
import Placeholder from './placeholder'
import { updateHeader } from './utils'

const Header = ({
  /* 模式: null | float | transition */
  mode,

  /* 模式为 float | transition 时有效 */
  fixed = false,

  /* 标题 */
  title,

  /* 统计参数: [url地址, 对应页面key] */
  hm,

  /* 统计别名 */
  alias,

  /*
   * 右侧element
   * https://reactnavigation.org/docs/5.x/stack-navigator#headerright
   */
  headerRight = null,

  /* 是否变动状态栏主题 */
  statusBarEvents = true
}) => {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    updateHeader({
      navigation,
      mode,
      fixed,
      title,
      headerRight
    })
  }, [navigation, mode, fixed, title, headerRight])

  useRunAfter(() => {
    if (Array.isArray(hm)) utilsHM(...hm)
  })

  return useObserver(() => {
    let backgroundColor
    if (!IOS && _.isDark) backgroundColor = _._colorPlainHex
    return (
      <>
        {statusBarEvents && <StatusBarEvents backgroundColor={backgroundColor} />}
        <UM screen={title} />
        {!!hm?.[1] && (
          <Heatmap id={alias || title} screen={hm[1]} bottom={_.bottom + _.sm} />
        )}
      </>
    )
  })
}

Header.Popover = Popover
Header.Placeholder = Placeholder

export { Header }
