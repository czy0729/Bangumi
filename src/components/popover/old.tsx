/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:28:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { useBoolean } from '@utils/hooks'
import { FROZEN_FN } from '@constants'
import { ActionSheet } from '../action-sheet'
import { Button } from '../button'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'

export const Popover = observer(({ style, data = [], onSelect = FROZEN_FN, children }) => {
  const { state, setTrue, setFalse } = useBoolean(false)

  const styles = memoStyles()

  return (
    <>
      <Touchable style={style} onPress={setTrue}>
        {children}
      </Touchable>
      <ActionSheet
        height={Math.max(280, Math.min(_.window.height * 0.64, data.length * 100))}
        show={state}
        onClose={setFalse}
      >
        {data.map((item, index) => (
          <Button
            key={item}
            style={!!index && styles.item}
            onPress={() => {
              setFalse()
              onSelect(item)
            }}
          >
            {item}
          </Button>
        ))}
      </ActionSheet>
    </>
  )
})
