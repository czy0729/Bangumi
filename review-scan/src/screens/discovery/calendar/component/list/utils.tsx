/*
 * @Author: czy0729
 * @Date: 2024-01-09 15:44:17
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-09 15:44:17
 */
import React from 'react'
import { SectionHeader } from '@_'
import Item from '../item'
import { memoStyles } from './styles'

export function renderSectionHeader({ section: { title } }) {
  const styles = memoStyles()
  return (
    <SectionHeader style={styles.section} size={14}>
      {title}
    </SectionHeader>
  )
}

export function renderItem({ item, section = {} }) {
  return <Item item={item} section={section} />
}
