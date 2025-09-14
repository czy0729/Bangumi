/*
 * @Author: czy0729
 * @Date: 2024-08-14 07:25:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 21:41:52
 */
import React from 'react'
import Li from '../li'

export function li({ key, style, className, children }) {
  return (
    <Li key={key} style={style} className={className}>
      {children}
    </Li>
  )
}
