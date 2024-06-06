/*
 * @Author: czy0729
 * @Date: 2024-05-08 04:26:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 13:39:48
 */
import React from 'react'
import { SectionHeader } from '@_'
import Item from './item'

export function keyExtractor(item: { topicId: any }) {
  return String(item.topicId)
}

export function renderSectionHeader({ section: { title } }) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

export function renderItem({ item }) {
  return <Item {...item} />
}
