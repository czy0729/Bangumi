/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:51:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:53:28
 */
import React from 'react'
import { Heatmap } from '@components'
import { ob } from '@utils/decorators'
import Modal from '../component/modal'
import { COMPONENT } from './ds'

function Extra() {
  return (
    <>
      <Modal />
      <Heatmap id='条目' screen='Subject' />
    </>
  )
}

export default ob(Extra, COMPONENT)
