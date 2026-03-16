/*
 * @Author: czy0729
 * @Date: 2020-06-24 22:32:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 04:09:04
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import './styles'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import Comp from './comp'
import { COMPONENT } from './ds'

import type { Props as SwitchProProps } from './types'

export type { SwitchProProps }

export function SwitchPro(props: SwitchProProps) {
  r(COMPONENT)

  return useObserver(() => (
    <Component id='component-switch-pro'>
      <Comp
        {...props}
        backgroundActive={props.backgroundActive || _.colorSuccess}
        backgroundInactive={props.backgroundInactive || _.select(_.colorBg, _._colorDarkModeLevel2)}
      />
    </Component>
  ))
}

export default SwitchPro
