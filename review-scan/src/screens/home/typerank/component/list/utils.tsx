/*
 * @Author: czy0729
 * @Date: 2024-06-02 17:19:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:20:14
 */
import React from 'react'
import { SubjectId } from '@types'
import Item from '../item'

export function keyExtractor(item: SubjectId) {
  return String(item)
}

export function renderItem({ item, index }) {
  return <Item subjectId={item} index={index} />
}
