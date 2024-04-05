/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:37:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 04:39:34
 */
import React from 'react'
import { SubjectType } from '@types'
import List from '../list'

export function renderItem(item: any) {
  return <List key={item.key} id={item.key as SubjectType} />
}
