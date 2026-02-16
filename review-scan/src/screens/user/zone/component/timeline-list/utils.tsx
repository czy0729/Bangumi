/*
 * @Author: czy0729
 * @Date: 2024-08-23 00:19:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 00:19:55
 */
import React from 'react'
import { SectionHeader } from '@_'

export function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>
}
