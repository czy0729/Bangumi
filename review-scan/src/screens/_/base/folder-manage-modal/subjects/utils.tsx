/*
 * @Author: czy0729
 * @Date: 2025-03-20 10:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 11:17:36
 */
import React from 'react'
import Subject from '../subject'
import { Props as ItemProps } from '../subject/types'

export function renderItem(props: ItemProps) {
  return <Subject {...props} />
}
