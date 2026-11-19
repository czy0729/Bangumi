/*
 * @Author: czy0729
 * @Date: 2023-03-07 16:47:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 10:00:00
 *
 * 目录表单
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Flex, Input, Text, TextareaItem } from '@components'
import { _ } from '@stores'
import { info } from '@utils'
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
  const canSubmit = !!title && !!desc

  return (
    <View style={styles.create}>
      {showTitle && <Text bold>{titleText}</Text>}
      <Input
        style={styles.textarea}
        value={title}
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
      <Flex style={_.mt.md}>
        {showCancel && (
          <Flex.Item style={_.mr.sm}>
            <Button type='ghostPlain' onPress={() => onCreate(false)}>
              取消
            </Button>
          </Flex.Item>
        )}
        <Flex.Item>
          <Button
            type={canSubmit ? 'main' : 'disabled'}
            onPress={
              canSubmit
                ? onSubmitCatalog
                : () => info(!title ? '请填写目录标题' : '请填写目录介绍')
            }
          >
            确定
          </Button>
        </Flex.Item>
      </Flex>
    </View>
  )
}

export default observer(Create)
