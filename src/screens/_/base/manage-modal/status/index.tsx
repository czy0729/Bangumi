/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 13:42:39
 */
import React from 'react'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { StatusBtnGroup } from '../../status-btn-group'

import type { Props } from './types'

function Status({ status, action, onSelect }: Props) {
  return useObserver(() => (
    <StatusBtnGroup style={_.mt.md} value={status} action={action} onSelect={onSelect} />
  ))
}

export default Status
