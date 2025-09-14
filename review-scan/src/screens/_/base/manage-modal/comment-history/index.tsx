/*
 * @Author: czy0729
 * @Date: 2023-02-18 04:03:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-18 04:42:21
 */
import React from 'react'
import { ActionSheet, Flex, Text, Touchable } from '@components'
import { useBoolean, useObserver } from '@utils/hooks'
import { IconTouchable } from '../../../icon'
import { memoStyles } from './styles'

function CommentHistory({
  data,
  onShow,
  onSelect
}: {
  data: string[]
  onShow: () => any
  onSelect: (text: string) => any
}) {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <IconTouchable
          style={styles.icon}
          name='icon-history'
          size={22}
          onPress={async () => {
            await onShow()
            setTrue()
          }}
        />
        <ActionSheet show={state} title='吐槽历史' onClose={setFalse}>
          {data.map((item, index) => (
            <Flex key={index} style={styles.commentHistory}>
              <Flex.Item>
                <Touchable style={styles.commentHistoryItem} onPress={() => onSelect(item)}>
                  <Text lineHeight={18}>{item}</Text>
                </Touchable>
              </Flex.Item>
            </Flex>
          ))}
        </ActionSheet>
      </>
    )
  })
}

export default CommentHistory
