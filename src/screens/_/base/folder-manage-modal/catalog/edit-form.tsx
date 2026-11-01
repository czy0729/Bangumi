/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录编辑表单 (标题 / 介绍 / 隐私)
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Input, Text, TextareaItem } from '@components'
import { _ } from '@stores'
import PrivacyRow from '../privacy'
import { memoStyles } from './styles'

import type { EditFormProps } from './types'

function EditForm({ title, desc, privacy, onChange }: EditFormProps) {
  const styles = memoStyles()

  return (
    <View style={_.mb.sm}>
      <Text bold>编辑目录</Text>
      <Input
        style={styles.textarea}
        defaultValue={title}
        placeholder='输入标题'
        showClear
        onChangeText={text => onChange(text, 'title')}
      />
      <TextareaItem
        style={styles.textarea}
        defaultValue={desc}
        placeholder='输入介绍'
        placeholderTextColor={_.colorDisabled}
        rows={4}
        selectionColor={_.colorMain}
        clear
        onChange={text => onChange(text, 'desc')}
      />
      <PrivacyRow value={privacy} onChange={value => onChange(value, 'privacy')} />
    </View>
  )
}

export default observer(EditForm)
