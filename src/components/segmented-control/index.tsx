/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 20:38:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Component } from '../component'
import Comp from './comp'
import { Props as SegmentedControlProps } from './types'

export { SegmentedControlProps }

/**
 * 分段选择器
 * @doc https://github.com/react-native-community/segmented-control/tree/master/js
 */
export const SegmentedControl = observer(
  ({
    tintColor,
    fontStyle,
    activeFontStyle,
    backgroundColor,
    ...other
  }: SegmentedControlProps) => (
    <Component id='component-segmented-control'>
      <Comp
        tintColor={tintColor || _.select(_.colorPlain, _._colorDarkModeLevel2)}
        backgroundColor={backgroundColor || _.colorBg}
        {...other}
      />
    </Component>
  )
)
