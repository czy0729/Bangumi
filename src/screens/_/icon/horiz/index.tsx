/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:29:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:26:22
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IconfontNames } from '@types'

type Props = {
  name?: IconfontNames
}

export const IconHoriz = ob(({ name = 'md-more-horiz' }: Props) => (
  <Iconfont name={name} color={_.colorTitle} />
))
