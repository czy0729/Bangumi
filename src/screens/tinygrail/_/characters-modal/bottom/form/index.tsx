/*
 * @Author: czy0729
 * @Date: 2025-05-02 20:16:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 22:57:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import SearchInput from '../../search-input'

import type { Props } from './types'

function BottomForm({ amount, onFocus, onBlur, onChangeText }: Props) {
  return (
    <>
      <Text type='tinygrailText' size={10}>
        消耗股份
      </Text>
      <Flex.Item style={_.ml.sm}>
        <SearchInput
          keyboardType='numeric'
          placeholder='数量'
          value={String(amount)}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />
      </Flex.Item>
    </>
  )
}

export default observer(BottomForm)
