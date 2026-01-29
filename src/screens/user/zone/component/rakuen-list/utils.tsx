/*
 * @Author: czy0729
 * @Date: 2024-01-07 16:58:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 00:45:08
 */
import React from 'react'
import { SectionHeader } from '@_'
import { t } from '@utils/fetch'
import Item from './item'

import type { UserTopicsFromCDNItem } from '@stores/rakuen/types'
import type { Navigation, RenderItem, RenderSectionHeader } from '@types'

export function keyExtractor(item: UserTopicsFromCDNItem) {
  return item.topicId
}

export function renderSectionHeader({ section: { title } }: RenderSectionHeader<string>) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

export function renderItem({ item }: RenderItem<UserTopicsFromCDNItem>) {
  return <Item {...item} />
}

export function handleToQiafan(navigation: Navigation) {
  navigation.push('Qiafan')

  t('空间.跳转', {
    from: '高级会员',
    to: 'Qiafan'
  })
}
