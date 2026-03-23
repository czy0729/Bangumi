/*
 * @Author: czy0729
 * @Date: 2024-06-02 17:19:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 18:50:24
 */
import React from 'react'
import Item from '../item'

import type { SubjectId } from '@types'

export function keyExtractor(item: SubjectId) {
  return String(item)
}

export function renderItem({ item, index }) {
  return <Item subjectId={item} index={index} />
}
