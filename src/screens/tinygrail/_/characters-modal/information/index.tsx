/*
 * @Author: czy0729
 * @Date: 2025-05-02 05:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 23:10:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { navigationReference } from '@utils'
import { ITEMS_NOTIFY } from '../ds'
import { styles } from './styles'

import type { Props } from './types'

function Information({ title, onClose }: Props) {
  const params = ITEMS_NOTIFY[title]
  if (!params) return null

  return (
    <IconTouchable
      style={styles.information}
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
