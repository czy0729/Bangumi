/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 16:51:58
 */
import React, { useCallback, useRef, useState } from 'react'
import { View } from 'react-native'
import { Flex, Input, Text, Touchable } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { feedback, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT, PARAMS } from './ds'
import { memoStyles } from './styles'

import type { InputInstance, TextProps } from '@components'
import type { Ctx } from '../../types'
import type { Props } from './types'
function Form({ style, name, url, isBase = false, onScrollIntoViewIfNeeded }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const urlInputRef = useRef<InputInstance>(null)
  const sortInputRef = useRef<InputInstance>(null)

  const [selection, setSelection] = useState({ start: 0, end: 0 })

  const handleChange = useCallback(
    (key: 'name' | 'url' | 'sort') => (text: string) => {
      $.onChangeText(key, text)
    },
    [$]
  )
  const handleSelectionChange = useCallback(
    (e: { nativeEvent: { selection: React.SetStateAction<{ start: number; end: number }> } }) => {
      setSelection(e.nativeEvent.selection)
    },
    []
  )
  const handleInsert = useCallback(
    (key: string, insert: boolean) => {
      const current = String(url || '')
      const { start, end } = selection

      const insertText = insert ? key : `[${key}]`
      const newValue = current.slice(0, start) + insertText + current.slice(end)

      const newCursor = start + insertText.length

      $.onChangeText('url', newValue)
      feedback(true)

      setSelection({
        start: newCursor,
        end: newCursor
      })

      urlInputRef.current?.inputRef?.focus()
    },
    [url, selection, $]
  )

  const handleSubmitEditing = useCallback(
    (key: 'name' | 'url' | 'sort') => () => {
      try {
        if (key === 'name') {
          urlInputRef.current.inputRef.focus()
          return
        }

        if (key === 'url') {
          sortInputRef.current.inputRef.focus()
          return
        }

        if (key === 'sort') {
          $.submitEdit()
          return
        }
      } catch {}
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()

    const editable = !isBase
    const textProps: TextProps = {
      size: 10,
      lineHeight: 16,
      bold: true
    } as const

    const renderLockTip = () =>
      !editable ? (
        <Text type='sub' {...textProps}>
          {'  '}
          默认项不允许修改
        </Text>
      ) : null

    const renderParams = (list: typeof PARAMS) => (
      <Flex style={{ marginRight: -24 }} wrap='wrap'>
        {list.map(({ key, label, insert }) => (
          <Touchable key={key} onPress={() => handleInsert(key, insert)}>
            <Text style={_.mr.sm} type='sub' {...textProps}>
              <Text type={insert ? 'sub' : 'warning'} {...textProps} underline={insert}>
                {insert ? key : `[${key}]`}
              </Text>{' '}
              {label}
            </Text>
          </Touchable>
        ))}
      </Flex>
    )

    return (
      <Flex style={stl(styles.form, style)} align='end'>
        <Flex.Item>
          <Text size={13} bold>
            名字
            {renderLockTip()}
          </Text>
          <Input
            style={styles.input}
            defaultValue={String(name)}
            placeholder='菜单显示名称，唯一'
            keyboardType='default'
            autoCapitalize='none'
            autoCorrect={false}
            editable={editable}
            autoFocus={editable}
            returnKeyType='next'
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            onChangeText={handleChange('name')}
            onSubmitEditing={handleSubmitEditing('name')}
          />

          <Text style={_.mt.md} size={13} bold>
            网址
            {renderLockTip()}
          </Text>

          <Text style={_.mt.xs} type='sub' {...textProps}>
            支持参数 (下列选项可点击粘贴)：
          </Text>
          {[true, false].map(flag => renderParams(PARAMS.filter(item => !!item.insert === flag)))}

          <Input
            ref={urlInputRef}
            style={_.mt.sm}
            defaultValue={String(url)}
            selection={selection}
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            placeholder='https://'
            keyboardType={IOS ? 'url' : 'default'}
            autoCapitalize='none'
            autoCorrect={false}
            editable={editable}
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            onChangeText={handleChange('url')}
            onSelectionChange={handleSelectionChange}
          />

          <Text style={_.mt.md} size={13} bold>
            排序
          </Text>
          <Text style={_.mt.xs} type='sub' {...textProps}>
            数字，越大越前，选填
          </Text>
          <Input
            ref={sortInputRef}
            style={styles.input}
            value={String($.state.edit.item.sort)}
            keyboardType='number-pad'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={!editable}
            returnKeyType='done'
            returnKeyLabel='更新'
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            onChangeText={handleChange('sort')}
            onSubmitEditing={handleSubmitEditing('sort')}
          />
        </Flex.Item>

        <IconTouchable
          style={_.ml.md}
          name='md-check'
          size={22}
          color={_.colorDesc}
          onPress={$.submitEdit}
        />
        <View style={styles.close}>
          <IconTouchable name='md-close' size={22} color={_.colorDesc} onPress={$.closeEdit} />
        </View>
      </Flex>
    )
  })
}

export default Form
