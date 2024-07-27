/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:53:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-28 05:03:39
 */
import React from 'react'
import { Input } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function TagsInput({ tags, onChangeText, onSubmitEditing }) {
  return (
    <Input
      style={styles.input}
      defaultValue={tags}
      placeholder='标签'
      returnKeyType='next'
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  )
}

export default ob(TagsInput)
