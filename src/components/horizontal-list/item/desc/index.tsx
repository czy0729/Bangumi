/*
 * @Author: czy0729
 * @Date: 2024-05-07 04:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 17:41:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Katakana } from '../../../katakana'
import { Touchable } from '../../../touchable'
import { REASON_MAP } from './ds'
import { styles } from './styles'

import type { TextProps } from '../../../text'
import type { ItemData } from '../../types'
import type { Props } from './types'

function Desc<T extends ItemData>({ item, typeCn, onPress }: Props<T>) {
  const text = String(item?.desc || item?.reason || '')
  if (!text) return null

  const textProps: TextProps = {
    type: 'sub',
    size: text.length >= 6 ? 9 : 10,
    numberOfLines: 2,
    bold: true
  } as const

  return (
    <Touchable
      style={_.mt.xs}
      animate
      scale={0.85}
      onPress={() => {
        onPress?.(item, typeCn)
      }}
    >
      <Katakana.Provider itemStyle={styles.itemStyle} {...textProps}>
        <Katakana {...textProps}>{REASON_MAP[text] || text}</Katakana>
      </Katakana.Provider>
    </Touchable>
  )
}

export default observer(Desc) as <T extends ItemData>(props: Props<T>) => React.JSX.Element
