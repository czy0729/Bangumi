/*
 * @Author: czy0729
 * @Date: 2025-05-02 20:16:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:28:18
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import SearchInput from '../../search-input'

function BottomForm({ amount, onFocus, onBlur, onChangeText }) {
  return useObserver(() => (
    <>
      <Text type='tinygrailText' size={10}>
        消耗股份
      </Text>
      <Flex.Item style={_.ml.sm}>
        <SearchInput
          keyboardType='numeric'
          placeholder='数量'
          value={amount}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />
      </Flex.Item>
    </>
  ))
}

export default BottomForm
