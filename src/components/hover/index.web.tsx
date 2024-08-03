/*
 * @Author: czy0729
 * @Date: 2023-11-24 08:49:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:37:20
 */
import React from 'react'
import { r } from '@utils/dev'
import { Component } from '../component'
import { COMPONENT } from './ds'
import { Props as HoverProps } from './types'
import './index.scss'

export { HoverProps }

export const Hover = ({ style, type, children }: HoverProps) => {
  r(COMPONENT)

  return (
    <Component id='component-hover' data-type={type} style={style}>
      {children}
    </Component>
  )
}

export default Hover
