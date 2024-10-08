/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:08:27
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Form from './form'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default obc((_props, { $ }: Ctx) => {
  return (
    <Form
      store={$}
      styles={memoStyles()}
      visible={$.state.visible}
      name={$.state.name}
      onClose={$.onClose}
    />
  )
}, COMPONENT)
