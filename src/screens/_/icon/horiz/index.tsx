/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:29:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-14 01:06:15
 */
import React from 'react'
import { Component, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Props as IconHorizProps } from './types'

export { IconHorizProps }

export const IconHoriz = ob(({ name = 'md-more-horiz' }: IconHorizProps) => (
  <Component id='icon-horiz'>
    <Iconfont name={name} color={_.colorTitle} />
  </Component>
))
