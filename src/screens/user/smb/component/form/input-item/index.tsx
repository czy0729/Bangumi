/*
 * @Author: czy0729
 * @Date: 2023-11-17 04:28:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 22:38:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Input, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { alert } from '@utils'
import { syncS2T } from '@utils/async'
import { memoStyles } from './styles'

import type { AnyObject } from '@types'
import type { Ctx } from '../../../types'

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

  const styles = memoStyles()

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
              alert(syncS2T(information))
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

export default observer(InputItem)
