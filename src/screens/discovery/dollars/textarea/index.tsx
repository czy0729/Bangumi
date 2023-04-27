/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:04:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 20:06:51
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text, Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Textarea(props, { $ }: Ctx) {
  const { show, text } = $.state
  if (!show) return null

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Input
        style={styles.textarea}
        inputStyle={styles.input}
        multiline
        numberOfLines={3}
        value={text}
        placeholder='单击头像可以@某人，长按前往空间'
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

export default obc(Textarea)
