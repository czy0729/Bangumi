/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:48:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 20:15:19
 */
import React from 'react'
import { Component } from '@components'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { Props } from './types'

function Container({ id, subLength, isNew, children }: Props) {
  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component
        id='item-post'
        data-key={id}
        style={stl(styles.item, subLength && styles.itemWithSub, isNew && styles.new)}
      >
        {children}
      </Component>
    )
  })
}

export default Container
