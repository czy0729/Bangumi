/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-01 21:14:40
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { Component } from '../../component'
import { COMPONENT } from './ds'

import type { WithViewStyles } from '@types'

/** component-header-placeholder */
function Placeholder({ style }: WithViewStyles) {
  r(COMPONENT)

  const { headerHeight } = useInsets()

  return useObserver(() => (
    <Component
      id='component-header-placeholder'
      style={stl(
        {
          height: headerHeight
        },
        style
      )}
    />
  ))
}

export default Placeholder
