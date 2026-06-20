/*
 * @Author: czy0729
 * @Date: 2026-06-21 02:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 02:45:38
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { feedback } from '@utils'
import { memoStyles } from './styles'

import type { Props } from './types'
/** 折叠区块 */
function Collapse({ title, children }: Props) {
  const [expanded, setExpanded] = useState(false)
  const styles = memoStyles()

  return (
    <>
      <Text
        style={[_.mt.md, _.mb.sm]}
        type='sub'
        size={16}
        lineHeight={20}
        bold
        onPress={() => {
          setExpanded(!expanded)
          feedback(true)
        }}
      >
        {expanded ? '▼' : '▶'} {title}
      </Text>
      {expanded && <View style={styles.content}>{children}</View>}
    </>
  )
}

export default observer(Collapse)
