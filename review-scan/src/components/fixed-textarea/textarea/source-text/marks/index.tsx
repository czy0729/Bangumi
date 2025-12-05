/*
 * @Author: czy0729
 * @Date: 2023-08-01 04:51:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 05:01:19
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Touchable } from '../../../../touchable'
import { Text } from '../../../../text'
import { styles } from './styles'

function Marks({ marks = [], showSource, showSourceText, onAddSymbolText }) {
  if (!marks?.length) return null

  return (
    <>
      {(marks as string[])
        .filter((item, index) => {
          if (!showSourceText) return index < (showSource ? 3 : 10)
          return index < (showSource ? 2 : 10)
        })
        .map(item => (
          <Touchable
            key={item}
            style={styles.mark}
            onPress={() => onAddSymbolText(item, true)}
          >
            <Text type='sub' size={12} align='center'>
              {item}
            </Text>
          </Touchable>
        ))}
    </>
  )
}

export default observer(Marks)
