/*
 * @Author: czy0729
 * @Date: 2023-02-18 04:03:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:38:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Text, Touchable } from '@components'
import { useBoolean } from '@utils/hooks'
import { IconTouchable } from '../../../icon'
import { memoStyles } from './styles'

import type { Props } from './types'

function CommentHistory({ data, onShow, onSelect }: Props) {
  const { state: show, setTrue, setFalse } = useBoolean(false)

  const styles = memoStyles()

  const handlePress = async () => {
    await onShow()
    setTrue()
  }

  return (
    <>
      <IconTouchable style={styles.icon} name='icon-history' size={22} onPress={handlePress} />
      <ActionSheet show={show} title='吐槽历史' onClose={setFalse}>
        {data.map((item, index) => (
          <Touchable key={index} style={styles.commentHistory} onPress={() => onSelect(item)}>
            <Text lineHeight={18}>{item}</Text>
          </Touchable>
        ))}
      </ActionSheet>
    </>
  )
}

export default observer(CommentHistory)
