/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:59:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:24:56
 */
import React from 'react'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import ButtonComp from './button'
import { memoStyles } from './styles'

export const Button = ob(props => (
  <ButtonComp styles={memoStyles()} heatMap={systemStore.setting.heatMap} {...props} />
))
