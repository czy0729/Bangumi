/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 15:45:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../../component'
import { Props } from './types'

/** component-header-placeholder */
function Placeholder({ style }: Props) {
  return (
    <Component
      id='component-header-placeholder'
      style={stl(
        {
          height: _.headerHeight
        },
        style
      )}
    />
  )
}

export default observer(Placeholder)
