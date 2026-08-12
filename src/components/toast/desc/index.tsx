/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 07:22:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '../../text'

import type { Props } from './types'

function Desc({ showClose, children }: Props) {
  return (
    <>
      <Text size={15}>{children}</Text>
      {showClose && (
        <Text type='icon' size={18}>
          {'  '}×
        </Text>
      )}
    </>
  )
}

export default observer(Desc)
