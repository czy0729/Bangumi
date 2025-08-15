/*
 * @Author: czy0729
 * @Date: 2024-01-07 16:58:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 00:45:08
 */
import React from 'react'
import { SectionHeader } from '@_'
import { t } from '@utils/fetch'
import { Navigation } from '@types'

export function renderSectionHeader({ section: { title } }) {
  return <SectionHeader size={14}>{title}</SectionHeader>
}

export function handleToQiafan(navigation: Navigation) {
  t('空间.跳转', {
    from: '高级会员',
    to: 'Qiafan'
  })

  navigation.push('Qiafan')
}
