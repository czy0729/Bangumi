/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:29:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:51:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Iconfont } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as IconHorizProps } from './types'
export type { IconHorizProps }

export const IconHoriz = observer(({ name = 'md-more-horiz' }: IconHorizProps) => {
  r(COMPONENT)

  return (
    <Component id='icon-horiz'>
      <Iconfont name={name} color={_.colorTitle} />
    </Component>
  )
})

export default IconHoriz
