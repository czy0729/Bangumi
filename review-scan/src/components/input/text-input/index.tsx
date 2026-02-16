/*
 * @Author: czy0729
 * @Date: 2023-03-11 13:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-31 16:11:29
 */
import React from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { s2t } from '@utils/thirdParty/open-cc'
import { memoStyles } from './styles'
import { Props } from './types'

function TextInput({ style, forwardRef, multiline, placeholder, selection, ...other }: Props) {
  const styles = memoStyles()
  return (
    <RNTextInput
      ref={forwardRef}
      style={stl(multiline ? styles.inputMulti : styles.input, style)}
      multiline={multiline}
      {...other}
      placeholder={systemStore.setting.s2t ? s2t(placeholder) : placeholder}
      textAlignVertical={multiline ? 'top' : 'center'}
      selection={selection?.start === 0 && selection?.end === 0 ? undefined : selection}
    />
  )
}

export default observer(TextInput)
