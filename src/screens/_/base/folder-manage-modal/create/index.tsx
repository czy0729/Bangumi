/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:47:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:30:50
 *
 * 目录表单
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Input, Text, TextareaItem } from '@components'
import { _ } from '@stores'
import { IconTouchable } from '../../../icon'
import PrivacyRow from '../privacy'
import { memoStyles } from './styles'

import type { Props } from './types'

function Create({
  titleText = '新建目录',
  showTitle = true,
  showCancel = true,
  title,
  desc,
  privacy,
  onChange,
  onCreate,
  onSubmitCatalog
}: Props) {
  const styles = memoStyles()

  return (
    <View style={styles.create}>
      {showTitle && <Text bold>{titleText}</Text>}
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
      {!!privacy && (
        <PrivacyRow value={privacy} onChange={value => onChange(value, 'privacy')} />
      )}
      {showCancel && (
        <View style={styles.cancel}>
          <IconTouchable
            name='md-close'
            size={22}
            color={_.colorSub}
            onPress={() => onCreate(false)}
          />
        </View>
      )}
      <View style={styles.submit}>
        <IconTouchable name='md-check' size={22} color={_.colorSub} onPress={onSubmitCatalog} />
      </View>
    </View>
  )
}

export default observer(Create)
