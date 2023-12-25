/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:41:12
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Form from './form'
import { memoStyles } from './styles'

export default obc((props, { $ }: Ctx) => {
  const { visible, name } = $.state
  return (
    <Form
      store={$}
      styles={memoStyles()}
      visible={visible}
      name={name}
      onClose={$.onClose}
    />
  )
})
