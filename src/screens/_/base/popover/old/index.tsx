/*
 * @Author: czy0729
 * @Date: 2019-12-14 16:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-05 08:18:04
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { ActionSheet, Button, Touchable } from '@components'
import { useBoolean } from '@utils/hooks'
import { FROZEN_FN } from '@constants'
import { memoStyles } from './styles'

export default ({ style, data = [], onSelect = FROZEN_FN, children }) => {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Touchable style={style} onPress={setTrue}>
          {children}
        </Touchable>
        <ActionSheet
          height={Math.max(280, Math.min(720, data.length * 100))}
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
}
