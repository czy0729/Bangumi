/*
 * @Author: czy0729
 * @Date: 2024-10-15 16:32:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 16:49:45
 */
import React from 'react'
import Ul from '../ul'

export function ul({ key, children }) {
  return <Ul key={key}>{children}</Ul>
}
