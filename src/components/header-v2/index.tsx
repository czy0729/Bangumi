/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:43:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:16:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '../component'
import { Track } from '../track'
import Header from './header'
import { useHeaderV2 } from './hooks'
import HeaderV2Popover from './popover'

export { HeaderV2Popover }

import type { Props as HeaderV2Props } from './types'
export type { HeaderV2Props }

export const HeaderV2 = observer(
  ({
    transparent,
    backgroundStyle,
    title,
    domTitle,
    hm,
    alias,
    color,
    headerTitleAlign,
    headerTitleStyle,
    headerTitleSize,
    headerTitleAppend,
    headerTitleTextStyle,
    headerRight
  }: HeaderV2Props) => {
    const { bridgedHeaderRight, headerTitleAlignValue, headerTitleStyleValue } = useHeaderV2({
      headerRight,
      headerTitleAlign,
      headerTitleStyle
    })

    return (
      <Component id='component-header-v2'>
        <Header
          style={backgroundStyle}
          transparent={transparent}
          title={title}
          color={color}
          headerTitleAlign={headerTitleAlignValue}
          headerTitleStyle={headerTitleStyleValue}
          headerTitleSize={headerTitleSize}
          headerTitleAppend={headerTitleAppend}
          headerTitleTextStyle={headerTitleTextStyle}
          headerRight={bridgedHeaderRight}
        />
        <Track title={title} domTitle={domTitle} hm={hm} alias={alias} />
      </Component>
    )
  }
)

export default HeaderV2
