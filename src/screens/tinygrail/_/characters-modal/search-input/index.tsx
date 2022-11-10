/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 07:13:03
 */
import React from 'react'
import { Touchable, Flex, Iconfont, Input } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

const HIT_SLOP = {
  top: 6,
  right: 4,
  bottom: 6,
  left: 6
} as const

function SearchInput({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing = undefined,
  ...other
}) {
  const styles = memoStyles()
  return (
    <Flex style={styles.wrap}>
      <Flex.Item>
        <Input
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={_.colorTinygrailText}
          value={String(value)}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          {...other}
        />
      </Flex.Item>
      {!!onSubmitEditing && (
        <Touchable hitSlop={HIT_SLOP} onPress={onSubmitEditing}>
          <Iconfont
            style={styles.search}
            name='md-search'
            size={14}
            color={_.colorTinygrailText}
          />
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(SearchInput)
