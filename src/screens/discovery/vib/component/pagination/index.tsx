/*
 * @Author: czy0729
 * @Date: 2024-05-04 19:28:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 20:38:51
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { DATA } from '../../ds'
import Title from '../title'
import { COMPONENT } from './ds'

function Pagination({ index, onSelect }: { index: number; onSelect: (index: number) => void }) {
  const { length } = DATA
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
          <Title text={DATA[prev].title} size='primary' />
        </Touchable>
      )}
      <Flex.Item />
      {next !== -1 && (
        <Touchable
          onPress={() => {
            onSelect(next)
          }}
        >
          <Title text={DATA[next].title} size='primary' />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(Pagination, COMPONENT)
