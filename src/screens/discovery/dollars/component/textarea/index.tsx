/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:36:45
 */
import React from 'react'
import { View } from 'react-native'
import { Input, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Textarea() {
  const { $ } = useStore<Ctx>()
  if (!$.state.show) return null

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Input
        ref={$.forwardInputRef}
        style={styles.textarea}
        inputStyle={styles.input}
        multiline
        numberOfLines={3}
        value={$.state.text}
        placeholder='单击头像可以@某人，长按则前往空间'
        autoFocus
        returnKeyType='done'
        returnKeyLabel='发送'
        onChangeText={$.onChangeText}
        onSubmitEditing={$.onSubmit}
      />
      <Touchable style={_.mt.md} onPress={$.onSubmit}>
        <View style={styles.btn}>
          <Text size={16} bold align='center'>
            POST
          </Text>
        </View>
      </Touchable>
    </View>
  )
}

export default ob(Textarea, COMPONENT)
