/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:12:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../../component'
import { COMPONENT } from './ds'
import { Props } from './types'

/** component-header-placeholder */
function Placeholder({ style }: Props) {
  r(COMPONENT)

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
