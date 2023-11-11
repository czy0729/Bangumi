/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 02:07:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../component'
import { PlaceholderProps } from './types'

function Placeholder({ style }: PlaceholderProps) {
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
