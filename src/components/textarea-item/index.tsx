/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 11:00:00
 */
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { TextInput, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Text } from '../text'
import { useTextareaItem } from './hooks'
import { fixControlledValue, getHeightByRows } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as TextareaItemProps } from './types'
export type { TextareaItemProps }

/**
 * 文本域, 支持行数/自动增高/计数/错误态
 */
export const TextareaItem = observer(
  forwardRef(function TextareaItem(
    {
      autoHeight = false,
      clear = true,
      count = 0,
      error = false,
      rows = 1,
      onChange,
      style,
      value,
      defaultValue,
      onContentSizeChange,
      ...restProps
    }: TextareaItemProps,
    ref: React.Ref<{ textAreaRef: TextInput }>
  ) {
    r(COMPONENT)

    const textAreaRef = useRef<TextInput>(null)
    // commit 阶段 textAreaRef 已挂载, 非空断言暴露给调用方 (fixed-textarea 通过 ?. 防御)
    useImperativeHandle(ref, () => ({
      textAreaRef: textAreaRef.current!
    }))

    const styles = memoStyles()

    const itemHeight = getHeightByRows(rows, 44)
    const { inputCount, height, handleChange, handleContentSizeChange } = useTextareaItem({
      value,
      autoHeight,
      itemHeight,
      onChange,
      onContentSizeChange
    })

    const valueProps = value !== undefined ? { value: fixControlledValue(value) } : { defaultValue }

    return (
      <View style={styles.container}>
        <TextInput
          ref={textAreaRef}
          {...restProps}
          {...valueProps}
          style={stl(
            styles.input,
            {
              height: Math.max(45, height),
              paddingRight: error ? 2 * _.md : 0,
              color: error ? _.colorDanger : _.colorDesc
            },
            style
          )}
          clearButtonMode={clear ? 'while-editing' : 'never'}
          underlineColorAndroid='transparent'
          multiline={rows > 1 || autoHeight}
          numberOfLines={rows}
          maxLength={count > 0 ? count : undefined}
          onChange={handleChange}
          onContentSizeChange={handleContentSizeChange}
        />
        {rows > 1 && count > 0 ? (
          <View style={styles.count}>
            <Text type='sub'>
              {inputCount} / {count}
            </Text>
          </View>
        ) : null}
      </View>
    )
  })
)

export default TextareaItem
