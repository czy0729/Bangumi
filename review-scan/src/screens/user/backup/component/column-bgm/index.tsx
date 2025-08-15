/*
 * @Author: czy0729
 * @Date: 2022-12-08 10:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 16:20:58
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function ColumnBgm({ select, text, next }) {
  return (
    <Text style={_.mt.md} type={!text ? 'sub' : select ? 'sub' : 'desc'} size={11} bold>
      {text || '__'}
      {select && (
        <Text size={11} bold type='desc'>
          {' '}
          → {next}
        </Text>
      )}
    </Text>
  )
}

export default ob(ColumnBgm, COMPONENT)
