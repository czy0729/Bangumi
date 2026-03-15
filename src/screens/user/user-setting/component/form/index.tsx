/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:15:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:53:19
 */
import React, { useCallback } from 'react'
import { Flex, Input, Text, Touchable } from '@components'
import { IconTouchable, Notice } from '@_'
import { _, useStore } from '@stores'
import { confirm, open, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { HOST_IMAGE_UPLOAD_RYMK, IOS } from '@constants'
import { COMPONENT, FIELDS } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Form({ expand, onExpand, onScrollIntoViewIfNeeded }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleShowTip = useCallback(
    (message: string) => () => {
      confirm(
        message,
        () => {
          open(HOST_IMAGE_UPLOAD_RYMK)
        },
        '提示'
      )
    },
    []
  )
  const handleChangeText = useCallback(
    (key: string) => (text: string) => {
      $.onChangeText(key, text)
    },
    [$]
  )

  return useObserver(() => (
    <>
      {expand &&
        FIELDS.map((item, index) => (
          <Flex key={item.key} style={[_.mt.md, index === FIELDS.length - 1 && _.mb.md]}>
            <Text>{item.label}</Text>
            <Flex.Item style={_.ml.md}>
              <Input
                style={styles.inputContainer}
                inputStyle={IOS && styles.input}
                defaultValue={$.state[item.key]}
                placeholder={item.placeholder}
                autoCapitalize='none'
                showClear
                onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                onChangeText={handleChangeText(item.key)}
              />
            </Flex.Item>
            {'tip' in item && (
              <IconTouchable
                style={_.ml.xs}
                name='md-info-outline'
                onPress={handleShowTip(item.tip)}
              />
            )}
          </Flex>
        ))}

      <Touchable style={stl(styles.more, expand && _.mb.md)} onPress={onExpand}>
        <Flex justify='center'>
          <Text style={[_.mt.sm, _.mb.sm]} size={13} type='sub' bold>
            {expand ? '收起资料' : '展开资料'}
          </Text>
        </Flex>
      </Touchable>

      {!expand && (
        <Notice style={styles.notice}>
          <Text size={12} lineHeight={13} bold>
            这是一个过时的功能，背景和头像仅在客户端中生效，建议到官方网页中设置。
          </Text>
        </Notice>
      )}
    </>
  ))
}

export default Form
