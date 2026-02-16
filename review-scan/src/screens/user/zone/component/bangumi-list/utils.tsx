/*
 * @Author: czy0729
 * @Date: 2024-08-22 23:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 23:42:36
 */
import React from 'react'
import Item from './item'
import SectionHeader from './section-header'

export function renderSectionHeader({ section: { title, count } }) {
  return <SectionHeader title={title} count={count} />
}

export function renderItem({ item, section: { title } }) {
  return <Item item={item} title={title} />
}
