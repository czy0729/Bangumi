/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:22:51
 */
import React from 'react'
import { Flex, Input, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { s2tAsync } from '@utils/async'
import { ob } from '@utils/decorators'
import { AnyObject } from '@types'
import { Ctx } from '../../../types'
import { styles } from './styles'

function InputItem({
  store,
  label,
  information = '',
  placeholder,
  name,
  connectRef,
  onSubmitEditing
}: AnyObject<{
  store: Ctx['$']
}>) {
  let { $ } = useStore<Ctx>()
  $ = $?.state ? $ : store

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

export default ob(InputItem)
