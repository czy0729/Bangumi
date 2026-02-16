/*
 * @Author: czy0729
 * @Date: 2025-05-02 05:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 05:35:14
 */
import React from 'react'
import { IconTouchable } from '@_'
import { navigationReference } from '@utils'
import { useObserver } from '@utils/hooks'
import { ITEMS_NOTIFY } from '../ds'
import { styles } from './styles'

function Information({ title, onClose }) {
  return useObserver(() => {
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

          onClose()
          setTimeout(() => {
            navigation.push('Information', params)
          }, 800)
        }}
      />
    )
  })
}

export default Information
