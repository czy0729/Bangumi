/*
 * @Author: czy0729
 * @Date: 2025-01-25 23:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 19:04:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _ } from '@stores'
import { Tag } from '../../../base'

function Postions({ position }) {
  return (
    <Flex style={_.mt.sm} wrap='wrap'>
      {position.map((item: string) => (
        <Tag key={item} style={_.mr.sm} value={item} />
      ))}
    </Flex>
  )
}

export default observer(Postions)
