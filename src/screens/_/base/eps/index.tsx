/*
 * 章节按钮组
 *
 * @Author: czy0729
 * @Date: 2021-08-10 00:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 14:22:48
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import EpsComp from './eps'
import { Props as EpsProps } from './types'

export { EpsProps }

export const Eps = ob((props: EpsProps) => (
  <EpsComp {...props} orientation={_.orientation} />
))
