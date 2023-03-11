/*
 * @Author: czy0729
 * @Date: 2023-03-11 13:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 13:40:55
 */
import React from 'react'
import { TextInput as RNTextInput, TextInputProps } from 'react-native'
import { observer } from 'mobx-react-lite'
import { stl } from '@utils'
import { Fn } from '@types'
import { memoStyles } from './styles'

type Props = TextInputProps & {
  forwardRef: Fn
}

function TextInput({ style, forwardRef, multiline, ...other }: Props) {
  const styles = memoStyles()
  return (
    <RNTextInput
      ref={forwardRef}
      style={stl(multiline ? styles.inputMulti : styles.input, style)}
      multiline={multiline}
      {...other}
      textAlignVertical={multiline ? 'top' : 'center'}
    />
  )
}

export default observer(TextInput)
