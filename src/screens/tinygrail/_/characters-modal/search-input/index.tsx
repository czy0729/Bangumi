/*
 * @Author: czy0729
 * @Date: 2020-07-09 10:30:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:27:25
 */
import React from 'react'
import { Flex, Iconfont, Input, Touchable } from '@components'
import { _ } from '@stores'
import { useKeyboardHide, useObserver } from '@utils/hooks'
import { FROZEN_FN } from '@constants'
import { HIT_SLOP } from './ds'
import { memoStyles } from './styles'

function SearchInput({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing = undefined,
  onBlur = FROZEN_FN,
  ...other
}) {
  useKeyboardHide(onBlur)

  return useObserver(() => {
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
            onBlur={onBlur}
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
  })
}

export default SearchInput
