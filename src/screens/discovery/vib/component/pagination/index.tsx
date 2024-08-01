/*
 * @Author: czy0729
 * @Date: 2024-05-04 19:28:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-01 15:30:25
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
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

            t('评分月刊.上一期', {
              title: data[prev].title
            })
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

            t('评分月刊.下一期', {
              title: data[next].title
            })
          }}
        >
          <Title text={data[next].title} size='primary' />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(Pagination, COMPONENT)
