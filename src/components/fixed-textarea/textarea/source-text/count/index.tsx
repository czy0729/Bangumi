/*
 * @Author: czy0729
 * @Date: 2023-08-01 04:39:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:04:56
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Text } from '../../../../text'

import type { Props } from './types'

function Count({ value = '' }: Props) {
  if (!value.length) return null

  return (
    <Text style={_.mr.sm} type='sub' size={11} align='center'>
      {value.length}
    </Text>
  )
}

export default observer(Count)
