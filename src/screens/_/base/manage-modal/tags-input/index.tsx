/*
 * @Author: czy0729
 * @Date: 2024-07-28 04:53:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:41:20
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Input } from '@components'
import { styles } from './styles'

import type { Props } from './types'

function TagsInput({ tags, onChangeText, onSubmitEditing }: Props) {
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

export default observer(TagsInput)
