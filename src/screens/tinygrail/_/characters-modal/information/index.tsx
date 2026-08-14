/*
 * @Author: czy0729
 * @Date: 2025-05-02 05:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 21:43:21
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { navigationReference } from '@utils'
import { ITEMS_NOTIFY } from '../ds'

import type { Props } from './types'

function Information({ title, onClose }: Props) {
  const params = ITEMS_NOTIFY[title]
  if (!params) return null

  return (
    <IconTouchable
      name='md-info-outline'
      size={20}
      onPress={() => {
        const navigation = navigationReference()
        if (!navigation) return

        onClose?.()
        setTimeout(() => {
          navigation.push('Information', params)
        }, 800)
      }}
    />
  )
}

export default observer(Information)
