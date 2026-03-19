/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:47:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:49:41
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { Input, Text } from '@components'
import { _ } from '@stores'
import { IconTouchable } from '../../../icon'
import { memoStyles } from './styles'

import type { Props } from './types'

function Create({ title, desc, onChange, onCreate, onSubmitCatalog }: Props) {
  const styles = memoStyles()

  return (
    <View style={styles.create}>
      <Text bold>新建目录</Text>
      <Input
        style={styles.textarea}
        defaultValue={title}
        placeholder='输入标题'
        showClear
        onChangeText={text => onChange(text, 'title')}
      />
      <TextareaItem
        style={styles.textarea}
        value={desc}
        placeholder='输入介绍'
        placeholderTextColor={_.colorDisabled}
        rows={4}
        selectionColor={_.colorMain}
        clear
        onChange={text => onChange(text, 'desc')}
      />
      <View style={styles.cancel}>
        <IconTouchable
          name='md-close'
          size={22}
          color={_.colorSub}
          onPress={() => onCreate(false)}
        />
      </View>
      <View style={styles.submit}>
        <IconTouchable name='md-check' size={22} color={_.colorSub} onPress={onSubmitCatalog} />
      </View>
    </View>
  )
}

export default observer(Create)
