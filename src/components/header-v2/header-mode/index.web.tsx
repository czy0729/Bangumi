/*
 * @Author: czy0729
 * @Date: 2026-09-09 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Component } from '../../component'
import { Flex } from '../../flex'
import Back from '../back'
import Transition from '../transition'
import { colors } from '../utils'
import { COMPONENT } from './ds'
import { styles } from './styles'
import './index.scss'

import type { Props } from './types'

/** 模式头部 [WEB] (transition / float) */
function HeaderMode({
  mode,
  fixed,
  title,
  statusBarEventsType,
  onBackPress,
  headerLeft,
  headerTitle,
  color,
  headerRight
}: Props) {
  r(COMPONENT)

  const backColor = color || colors[statusBarEventsType]?.(fixed)

  return (
    <Component
      id='component-header'
      data-mode={mode || 'normal'}
      style={{
        ...styles.header,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Transition fixed={fixed} title={title} headerTitle={headerTitle} />
      <Component id='component-header-back'>
        <Back color={backColor} onPress={onBackPress} />
      </Component>
      {headerLeft}
      <Flex.Item />
      {!!headerRight && <Component id='component-header-right'>{headerRight()}</Component>}
    </Component>
  )
}

export default observer(HeaderMode)
