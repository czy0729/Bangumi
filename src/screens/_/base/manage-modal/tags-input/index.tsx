/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:53:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 16:28:10
 */
import React from 'react'
import { Input } from '@components'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

import type { Props } from './types'

function TagsInput({ tags, onChangeText, onSubmitEditing }: Props) {
  return useObserver(() => (
    <Input
      style={styles.input}
      defaultValue={tags}
      placeholder='标签'
      returnKeyType='next'
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  ))
}

export default TagsInput
