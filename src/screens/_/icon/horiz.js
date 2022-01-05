/*
 * @Author: czy0729
 * @Date: 2022-01-06 07:29:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 07:29:56
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const IconHoriz = ob(() => (
  <Iconfont name='md-more-horiz' color={_.colorTitle} />
))
