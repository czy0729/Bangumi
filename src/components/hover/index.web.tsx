/*
 * @Author: czy0729
 * @Date: 2023-11-24 08:49:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 08:53:41
 */
import React from 'react'
import { Component } from '../component'
import { Props as HoverProps } from './types'
import './index.scss'

export { HoverProps }

export const Hover = ({ style, children }: HoverProps) => {
  return (
    <Component id='component-hover' style={style}>
      {children}
    </Component>
  )
}
