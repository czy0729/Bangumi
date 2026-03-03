/*
 * @Author: czy0729
 * @Date: 2022-03-23 13:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-03 15:48:53
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { Flex, Input, Text } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { InputInstance, TextProps } from '@components'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Form({ style, name, url, isBase = false, onScrollIntoViewIfNeeded }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const urlInputRef = useRef<InputInstance>(null)
  const sortInputRef = useRef<InputInstance>(null)

  const handleChange = useCallback(
    (key: 'name' | 'url' | 'sort') => (text: string) => {
      $.onChangeText(key, text)
    },
    [$]
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
      lineHeight: 13,
      bold: true
    } as const

    const renderLockTip = () =>
      !editable ? (
        <Text type='sub' {...textProps}>
          {'  '}
          默认项不允许修改
        </Text>
      ) : null

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
            支持参数：
            <Text type='warning' underline {...textProps}>
              [CN]
            </Text>{' '}
            会被替换成条目中文名，
            <Text type='warning' underline {...textProps}>
              [JP]
            </Text>{' '}
            日文名，
            <Text type='warning' underline {...textProps}>
              [CN_S2T]
            </Text>{' '}
            中文繁体名，
            <Text type='warning' underline {...textProps}>
              [TIME]
            </Text>{' '}
            时间戳，
            <Text type='warning' underline {...textProps}>
              [ID]
            </Text>{' '}
            bgm条目ID
          </Text>

          <Input
            ref={urlInputRef}
            style={_.mt.sm}
            defaultValue={String(url)}
            multiline
            numberOfLines={4}
            textAlignVertical='top'
            placeholder='https://'
            editable={editable}
            returnKeyType='next'
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            onChangeText={handleChange('url')}
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
