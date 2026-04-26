/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:09:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import Comp from './comp'
import { COMPONENT } from './ds'

import type { DataSource } from '@types'
import type { Props as SegmentedControlProps } from './types'
export type { SegmentedControlProps }

/**
 * 分段选择器
 * @doc https://github.com/react-native-community/segmented-control/tree/master/js
 */
export const SegmentedControl = observer(
  <T extends DataSource>({
    values,
    tintColor,
    fontStyle,
    activeFontStyle,
    backgroundColor,
    ...other
  }: SegmentedControlProps<T>) => {
    r(COMPONENT)

    return (
      <Component id='component-segmented-control'>
        <Comp
          // key={values.join()}
          values={values}
          tintColor={tintColor || _.select(_.colorPlain, _._colorDarkModeLevel2)}
          backgroundColor={backgroundColor || _.colorBg}
          {...other}
        />
      </Component>
    )
  }
)

export default SegmentedControl
