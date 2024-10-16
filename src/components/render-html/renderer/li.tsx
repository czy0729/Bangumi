/*
 * @Author: czy0729
 * @Date: 2024-08-14 07:25:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-16 06:33:18
 */
import React from 'react'
import Li from '../li'

export function li({ key, style, children }) {
  return (
    <Li key={key} style={style}>
      {children}
    </Li>
  )
}
