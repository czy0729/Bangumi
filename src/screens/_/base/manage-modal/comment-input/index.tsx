/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:37:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:03:28
 */
import React from 'react'
import { Flex, Input, Text } from '@components'
import { _ } from '@stores'
import { useKeyboardHide, useObserver } from '@utils/hooks'
import CommentHistory from '../comment-history'
import { memoStyles } from './styles'

function CommentInput({
  forwardRef,
  comment,
  commentHistory,
  onFocus,
  onBlur,
  onChangeText,
  onShowHistory
}) {
  useKeyboardHide(onBlur)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Flex style={styles.comment} align='end'>
        <Flex.Item>
          <Input
            ref={forwardRef}
            style={styles.input}
            defaultValue={comment}
            placeholder='吐槽点什么'
            multiline
            numberOfLines={_.isSmallDevice || (!_.isPad && _.isLandscape) ? 2 : 6}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
          />
        </Flex.Item>
        {!!comment?.length && (
          <Text style={styles.length} type='icon' size={13} lineHeight={14}>
            {380 - (comment?.length || 0)}
          </Text>
        )}
        {!comment && (
          <CommentHistory data={commentHistory} onSelect={onChangeText} onShow={onShowHistory} />
        )}
      </Flex>
    )
  })
}

export default CommentInput
