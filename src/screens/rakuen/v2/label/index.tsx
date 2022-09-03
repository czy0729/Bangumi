/*
 * @Author: czy0729
 * @Date: 2021-02-10 02:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 10:58:36
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

function Label({ focused, model, label, value }, { $ }: Ctx) {
  return (
    <Popover
      style={styles.label}
      data={model.data.map(item => item.label)}
      onSelect={$.onGroupMenuPress}
    >
      <Flex style={styles.label} justify='center'>
        <Text type='title' size={13} bold={focused}>
          {label}
        </Text>
        <Text size={10} lineHeight={13} type='sub'>
          {' '}
          {model.getLabel(value)}{' '}
        </Text>
      </Flex>
    </Popover>
  )
}

export default obc(Label)
