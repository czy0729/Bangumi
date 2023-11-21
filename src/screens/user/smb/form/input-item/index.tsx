/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 06:19:43
 */
import React from 'react'
import { Flex, Text, Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { styles } from './styles'

function InputItem(
  { label, placeholder, name, connectRef, onSubmitEditing },
  { $ }: Ctx
) {
  const value = $.state[name]
  return (
    <Flex style={_.mt.sm}>
      <Text style={styles.label} size={12}>
        {label}
      </Text>
      <Flex.Item>
        <Input
          ref={connectRef}
          style={styles.input}
          placeholder={placeholder}
          defaultValue={value}
          showClear
          returnKeyType='next'
          onChangeText={text => $.onChange(name, text)}
          onSubmitEditing={onSubmitEditing}
        />
      </Flex.Item>
    </Flex>
  )
}

export default obc(InputItem)
