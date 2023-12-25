/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:43:13
 */
import React from 'react'
import { Flex, Text, Input } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { s2tAsync } from '@utils/async'
import { AnyObject } from '@types'
import { Ctx } from '../../types'
import { styles } from './styles'

function InputItem(
  {
    store,
    label,
    information = '',
    placeholder,
    name,
    connectRef,
    onSubmitEditing
  }: AnyObject<{
    store: Ctx['$']
  }>,
  { $ }: Ctx
) {
  $ = $ || store

  const value = $.state[name]
  return (
    <Flex style={_.mt.sm}>
      <Flex style={styles.label}>
        <Text size={12}>{label}</Text>
        {!!information && (
          <IconTouchable
            style={_.ml._xs}
            name='md-info-outline'
            size={14}
            onPress={() => {
              alert(s2tAsync(information))
            }}
          />
        )}
      </Flex>
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
