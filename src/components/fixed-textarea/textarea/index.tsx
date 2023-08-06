/*
 * @Author: czy0729
 * @Date: 2023-07-29 04:25:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-02 00:35:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { _ } from '@stores'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Touchable } from '../../touchable'
import SourceText from './source-text'
import { memoStyles } from './styles'

function Textarea({
  forwardRef,
  simple,
  marks,
  source,
  placeholder,
  value,
  editing,
  showSource,
  showSourceText,
  showTextarea,
  onFocus,
  onChange,
  onSelectionChange,
  onSubmit,
  onAddSymbolText,
  onToggleSource,
  onToggleSourceText
}) {
  const styles = memoStyles()
  return (
    <SafeAreaBottom style={styles.container}>
      <Flex align='start'>
        <Flex.Item style={editing ? styles.body : styles.fixed}>
          <TextareaItem
            ref={forwardRef}
            style={styles.textarea}
            value={value}
            placeholder={simple || editing ? placeholder || '我要吐槽' : ''}
            placeholderTextColor={_.colorDisabled}
            rows={8}
            selectionColor={_.colorMain}
            clear
            onFocus={onFocus}
            onChange={onChange}
            onSelectionChange={onSelectionChange}
          />
        </Flex.Item>
        {editing && (
          <Touchable style={styles.touch} onPress={onSubmit}>
            <Flex style={styles.send} justify='center'>
              <Iconfont
                name='md-send'
                size={16}
                color={value !== '' ? _.colorMain : _.colorSub}
              />
            </Flex>
          </Touchable>
        )}
        <SourceText
          source={source}
          marks={marks}
          value={value}
          showTextarea={showTextarea}
          showSource={showSource}
          showSourceText={showSourceText}
          onAddSymbolText={onAddSymbolText}
          onToggleSource={onToggleSource}
          onToggleSourceText={onToggleSourceText}
        />
      </Flex>
    </SafeAreaBottom>
  )
}

export default observer(Textarea)
