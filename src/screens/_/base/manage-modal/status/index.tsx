/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:56:04
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { StatusBtnGroup } from '../../status-btn-group'
import { Props } from './types'

function Status({ status, action, onSelect }: Props) {
  return <StatusBtnGroup style={_.mt.md} value={status} action={action} onSelect={onSelect} />
}

export default ob(Status)
