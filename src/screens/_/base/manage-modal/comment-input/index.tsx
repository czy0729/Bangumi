/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-21 13:41:28
 */
import React, { useCallback, useRef, useState } from 'react'
import { Flex, Iconfont, Input, Text, Touchable } from '@components'
import { _ } from '@stores'
import { alert, detectSensitiveWords, t2s } from '@utils'
import { useKeyboardHide, useObserver } from '@utils/hooks'
import CommentHistory from '../comment-history'
import { memoStyles } from './styles'

import type { InputInstance } from '@components'
import type { Props } from './types'

function CommentInput({
  forwardRef,
  comment = '',
  commentHistory,
  onFocus,
  onBlur,
  onChangeText,
  onShowHistory
}: Props) {
  useKeyboardHide(onBlur)

  const textInputRef = useRef<InputInstance['inputRef']>(null)
  const [selection, setSelection] = useState({ start: 0, end: 0 })

  const handleRef = useCallback(
    (ref: InputInstance) => {
      if (ref?.inputRef) {
        textInputRef.current = ref.inputRef
        forwardRef(ref)
      }
    },
    [forwardRef]
  )

  const handleSelection = useCallback(
    (word: string) => {
      const start = t2s(comment).indexOf(word)
      if (start === -1) return

      setSelection({ start, end: start + word.length })
      textInputRef.current?.focus()

      // 小延时清除选区，保持视觉闪动但不干扰输入
      setTimeout(() => setSelection({ start: 0, end: 0 }), 40)
    },
    [comment]
  )

  return useObserver(() => {
    const styles = memoStyles()
    const sensitiveWords = detectSensitiveWords(t2s(comment))
    const remaining = 380 - (comment?.length || 0)

    return (
      <>
        <Flex style={styles.comment} align='end'>
          <Flex.Item>
            <Input
              ref={handleRef}
              style={styles.input}
              defaultValue={comment}
              selection={selection}
              placeholder='吐槽点什么'
              multiline
              numberOfLines={_.isSmallDevice || (!_.isPad && _.isLandscape) ? 2 : 6}
              onFocus={onFocus}
              onBlur={onBlur}
              onChangeText={onChangeText}
            />
          </Flex.Item>

          {comment ? (
            <Text style={styles.length} type='icon' size={13} lineHeight={14}>
              {remaining}
            </Text>
          ) : (
            <CommentHistory data={commentHistory} onSelect={onChangeText} onShow={onShowHistory} />
          )}
        </Flex>

        {!!sensitiveWords?.length && (
          <Flex style={styles.sensitive} wrap='wrap'>
            <Touchable
              style={styles.touch}
              onPress={() =>
                alert(
                  '若吐槽中存在敏感词，保存后公开状态可能会被强制设置为「私密」。因官方词库会动态变化，结果不一定准确，仅供参考。'
                )
              }
            >
              <Flex>
                <Text type='sub' size={12}>
                  敏感词
                </Text>
                <Iconfont style={_.ml.xs} name='md-info-outline' size={14} color={_.colorSub} />
              </Flex>
            </Touchable>

            {sensitiveWords.map(word => (
              <Touchable key={word} style={styles.touch} onPress={() => handleSelection(word)}>
                <Text type='danger' size={12}>
                  {word}
                </Text>
              </Touchable>
            ))}
          </Flex>
        )}
      </>
    )
  })
}

export default CommentInput
