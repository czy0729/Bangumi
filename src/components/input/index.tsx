/*
 * @Author: czy0729
 * @Date: 2019-03-19 01:43:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 14:30:00
 */
import React, { useImperativeHandle } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, IOS } from '@constants'
import { Component } from '../component'
import Clear from './clear'
import { useInputRef, useInputValue } from './hooks'
import TextInput from './text-input'
import { CLEAR_PADDING_RIGHT, COMPONENT, INPUT_LINE_HEIGHT } from './ds'
import { memoStyles } from './styles'

import type { TextInputProps } from 'react-native'
import type { Override, TextInputInstance, TextInputSubmitEditingEvent } from '@types'
import type { Props as InputProps } from './types'
export type { InputProps }

/** 输入框对外实例 */
export type InputInstance = {
  inputRef: TextInputInstance | null
}

/**
 * 通用输入框
 * @doc https://www.react-native.cn/docs/textinput
 * @tutorial https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options
 */
const InputComponent = React.forwardRef<InputInstance, InputProps>(
  (
    {
      style,
      inputStyle,
      multiline = false,
      numberOfLines = 1,
      showClear = false,
      colorClear,
      autoFocus = false,
      placeholderTextColor,
      onChange = FROZEN_FN,
      onChangeText = FROZEN_FN,
      onScrollIntoViewIfNeeded,
      value,
      defaultValue,
      editable,
      onFocus,
      onBlur,
      onSubmitEditing,
      ...other
    }: InputProps,
    ref
  ) => {
    r(COMPONENT)

    const styles = memoStyles()
    const { text, handleChange, handleClear } = useInputValue({
      value,
      defaultValue,
      onChange,
      onChangeText
    })

    /** 受控时才下发 value; 非受控保持 undefined, 文本由原生维护 (下发 value 会干扰安卓中文组合输入) */
    const isControlled = value !== undefined
    const textValue = isControlled ? value : undefined

    /** 判断清空图标用的文本: 受控取 props, 非受控取内部镜像 */
    const textForClear = isControlled ? value : text
    const { inputRef, focused, handleRef, onTouch, blur, handleFocus, handleBlur } = useInputRef({
      autoFocus,
      onFocus,
      onBlur,
      onScrollIntoViewIfNeeded
    })

    /** 对外实例, inputRef 取读取时的最新值 */
    useImperativeHandle(
      ref,
      (): InputInstance => ({
        get inputRef(): TextInputInstance | null {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
          return inputRef.current
        }
      }),
      [inputRef]
    )

    // 安卓使用了模拟按钮代替原生按钮
    const clearButtonMode = !IOS ? 'never' : showClear ? 'while-editing' : 'never'
    const overrideProps: Override<
      Partial<TextInputProps>,
      {
        forwardRef: (ref: TextInputInstance | null) => void
      }
    > = {
      forwardRef: handleRef,
      numberOfLines,
      allowFontScaling: false,
      autoCapitalize: 'none',
      autoCorrect: false,
      underlineColorAndroid: 'transparent',
      clearButtonMode,
      placeholderTextColor: placeholderTextColor || _.colorDisabled,
      selectionColor: _.colorMain,
      cursorColor: _.colorMain,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur
    }

    /** 有内容且聚焦时显示, 与 iOS 原生按钮的 while-editing 一致 */
    const showClearIcon = showClear && !!textForClear && focused

    /** 非 iOS 预留图标位置, 避免文字被遮挡 */
    const clearPadding = !IOS && showClear ? { paddingRight: CLEAR_PADDING_RIGHT } : undefined

    const handleSubmitEditing = (evt: TextInputSubmitEditingEvent) => {
      if (typeof onSubmitEditing === 'function') {
        onSubmitEditing(evt)
        blur()
      }
    }

    const handleClearPress = () => {
      // 非受控时文本在原生侧, 需要显式清空
      if (!isControlled) inputRef.current?.clear?.()
      handleClear()
    }

    if (multiline) {
      const containerHeight = INPUT_LINE_HEIGHT * numberOfLines + 18
      return (
        <Component id='component-input' data-editable={editable} style={_.container.block}>
          <TouchableWithoutFeedback onPress={onTouch}>
            <View
              style={stl(
                styles.multiline,
                {
                  height: containerHeight,
                  borderRadius: _.radiusXs
                },
                style
              )}
            >
              <TextInput
                editable={editable}
                multiline
                value={textValue}
                defaultValue={defaultValue}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                {...other}
                {...overrideProps}
                style={stl(inputStyle, clearPadding)}
              />
            </View>
          </TouchableWithoutFeedback>
          {showClearIcon && <Clear multiline colorClear={colorClear} onPress={handleClearPress} />}
        </Component>
      )
    }

    return (
      <Component id='component-input' data-editable={editable} style={_.container.block}>
        <TextInput
          editable={editable}
          value={textValue}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          {...other}
          {...overrideProps}
          style={stl(styles.input, style, inputStyle, clearPadding)}
          onSubmitEditing={handleSubmitEditing}
        />
        {showClearIcon && <Clear colorClear={colorClear} onPress={handleClearPress} />}
      </Component>
    )
  }
)

export const Input = observer(InputComponent)

export default Input
