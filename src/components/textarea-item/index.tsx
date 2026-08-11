/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { observer } from 'mobx-react'
import t from '@styles/theme'
import { syncThemeStore } from '@utils/async'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { fixControlledValue, getHeightByRows } from './utils'

import type { Props as TextareaItemProps } from './types'
export type { TextareaItemProps }

/**
 * 文本域, 支持行数/自动增高/计数/错误态
 */
function TextareaItem({
  autoHeight = false,
  clear = true,
  count = 0,
  error = false,
  rows = 1,
  onChange,
  style,
  value,
  defaultValue,
  ...restProps
}: TextareaItemProps) {
  r(COMPONENT)

  const [inputCount, setInputCount] = useState(typeof value === 'string' ? value.length : 0)
  const [measuredHeight, setMeasuredHeight] = useState(0)
  const _ = syncThemeStore()
  const styles = memoStyles()

  const itemHeight = getHeightByRows(rows, t.list_item_height)

  const handleChange = (event: any) => {
    const text = event.nativeEvent.text
    setInputCount(text.length)
    if (onChange) onChange(text)
  }

  const handleContentSizeChange = (event: any) => {
    let height: number
    if (autoHeight) {
      height = event.nativeEvent.contentSize.height
    } else {
      height = itemHeight
    }
    setMeasuredHeight(height)
    if (restProps.onContentSizeChange) restProps.onContentSizeChange(event)
  }

  const height = measuredHeight || itemHeight

  const valueProps =
    value !== undefined ? { value: fixControlledValue(value) } : { defaultValue }

  return (
    <View style={[styles.container, { position: 'relative' }]}>
      <TextInput
        {...restProps}
        {...valueProps}
        clearButtonMode={clear ? 'while-editing' : 'never'}
        underlineColorAndroid='transparent'
        style={[
          styles.input,
          {
            color: error ? _.colorDanger : _.colorDesc,
            paddingRight: error ? 2 * _.md : 0,
            height: Math.max(45, height)
          },
          style
        ]}
        onChange={handleChange}
        onContentSizeChange={handleContentSizeChange}
        multiline={rows > 1 || autoHeight}
        numberOfLines={rows}
        maxLength={count > 0 ? count : undefined}
      />
      {rows > 1 && count > 0 ? (
        <View style={styles.count}>
          <Text>
            {inputCount} / {count}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export default observer(TextareaItem)