/*
 * @Author: czy0729
 * @Date: 2023-08-01 04:51:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 05:01:19
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Text } from '../../../../text'
import { Touchable } from '../../../../touchable'
import { styles } from './styles'

function Marks({ marks = [], showSource, showSourceText, onAddSymbolText }) {
  return useObserver(() => {
    if (!marks?.length) return null

    return (
      <>
        {(marks as string[])
          .filter((_, index) => {
            if (!showSourceText) return index < (showSource ? 3 : 10)
            return index < (showSource ? 2 : 10)
          })
          .map(item => (
            <Touchable key={item} style={styles.mark} onPress={() => onAddSymbolText(item, true)}>
              <Text type='sub' size={12} align='center'>
                {item}
              </Text>
            </Touchable>
          ))}
      </>
    )
  })
}

export default Marks
