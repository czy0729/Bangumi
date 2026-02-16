/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:29:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 04:17:37
 */
import React from 'react'
import { Component, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { Props as IconHorizProps } from './types'

export { IconHorizProps }

export const IconHoriz = ob(
  ({ name = 'md-more-horiz' }: IconHorizProps) => (
    <Component id='icon-horiz'>
      <Iconfont name={name} color={_.colorTitle} />
    </Component>
  ),
  COMPONENT
)

export default IconHoriz
