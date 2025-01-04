/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-04 16:24:18
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { useBoolean } from '@utils/hooks'
import { FROZEN_FN } from '@constants'
import { ActionSheet } from '../action-sheet'
import { Button } from '../button'
import { Touchable } from '../touchable'
import { styles } from './styles'

export const Popover = ({ style, data = [], onSelect = FROZEN_FN, children }) => {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => (
    <>
      <Touchable style={style} onPress={setTrue}>
        {children}
      </Touchable>
      <ActionSheet height={720} show={state} onClose={setFalse}>
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
  ))
}
