/*
 * @Author: czy0729
 * @Date: 2024-03-13 20:09:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 20:19:09
 */
import React, { useState } from 'react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { HTML } from '../../../base'
import { COLLAPSED_HTML } from './ds'

function CollapsedHtml({ msg, ...other }: any) {
  const [collapsed, setCollapsed] = useState(msg && msg.includes(COLLAPSED_HTML))

  if (collapsed) {
    return (
      <Touchable
        style={_.mt.sm}
        onPress={() => {
          setCollapsed(false)
        }}
      >
        <Text underline>回复被折叠</Text>
      </Touchable>
    )
  }

  return <HTML msg={msg.replace(COLLAPSED_HTML, '')} {...other} />
}

export default CollapsedHtml
