/*
 * @Author: czy0729
 * @Date: 2024-08-14 07:25:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-14 07:28:07
 */
import React from 'react'
import Li from '../li'

export function li({ key, children }) {
  return <Li key={key}>{children}</Li>
}
