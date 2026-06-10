/*
 * @Author: czy0729
 * @Date: 2026-06-02 01:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 02:45:56
 */
import React from 'react'
import { View } from 'react-native'
import { Input, Text, Touchable } from '@components'
import { info } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'

/** 带锁定功能的输入框组件 */
function InputItem({
  value,
  placeholder,
  locked,
  focused,
  onChangeText,
  onFocus,
  onBlur,
  onToggleLock,
  extra
}: Props) {
  const styles = memoStyles()

  return (
    <>
      <View style={styles.inputWrap}>
        {locked ? (
          <Touchable
            style={styles.lockedText}
            onPress={() => {
              info('锁定时不允许编辑')
            }}
          >
            <Text type='sub' bold>
              {value || placeholder}
            </Text>
          </Touchable>
        ) : (
          <Input
            style={styles.input}
            defaultValue={value}
            placeholder={placeholder}
            showClear={false}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        )}
        {!focused && (
          <Touchable style={styles.lock} onPress={onToggleLock}>
            <Text size={12} lineHeight={14}>
              {locked ? '🔒' : '🔓'}
            </Text>
          </Touchable>
        )}
      </View>
      {extra}
    </>
  )
}

export default InputItem
