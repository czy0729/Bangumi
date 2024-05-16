/*
 * @Author: czy0729
 * @Date: 2024-05-04 19:28:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:40:22
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Title from '../title'
import { COMPONENT } from './ds'
import { Props } from './types'

function Pagination({ data, index, onSelect }: Props) {
  const { length } = data
  const prev = index >= length - 1 ? -1 : index + 1
  const next = index <= 0 ? -1 : index - 1
  return (
    <Flex style={_.mt.lg}>
      {prev !== -1 && (
        <Touchable
          onPress={() => {
            onSelect(prev)
          }}
        >
          <Title text={data[prev].title} size='primary' />
        </Touchable>
      )}
      <Flex.Item />
      {next !== -1 && (
        <Touchable
          onPress={() => {
            onSelect(next)
          }}
        >
          <Title text={data[next].title} size='primary' />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(Pagination, COMPONENT)
