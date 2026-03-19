/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:39:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { StatusBtnGroup } from '../../status-btn-group'

import type { Props } from './types'

function Status({ status, action, onSelect }: Props) {
  return <StatusBtnGroup style={_.mt.md} value={status} action={action} onSelect={onSelect} />
}

export default observer(Status)
