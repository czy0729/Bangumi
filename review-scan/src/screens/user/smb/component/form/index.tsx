/*
 * @Author: czy0729
 * @Date: 2022-04-01 04:04:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:20:55
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Form from './form'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export default ob(() => {
  const { $ } = useStore<Ctx>()
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
