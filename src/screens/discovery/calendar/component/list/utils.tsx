/*
 * @Author: czy0729
 * @Date: 2024-01-09 15:44:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import { SectionHeader } from '@_'
import Item from '../item'
import { memoStyles } from './styles'

import type { Props as ItemProps } from '../item/types'

export function renderSectionHeader({
  section: { title }
}: {
  section: {
    title: string
  }
}) {
  const styles = memoStyles()

  return (
    <SectionHeader style={styles.section} size={14}>
      {title}
    </SectionHeader>
  )
}

export function renderItem({ item, section }: ItemProps) {
  return <Item item={item} section={section} />
}
