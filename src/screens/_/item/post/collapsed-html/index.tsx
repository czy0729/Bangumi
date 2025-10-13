/*
 * @Author: czy0729
 * @Date: 2024-03-13 20:09:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 22:06:17
 */
import React, { useState } from 'react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { useNavigation, useObserver } from '@utils/hooks'
import { HTML, HTMLProps } from '../../../base'
import { COLLAPSED_HTML } from './ds'

function CollapsedHtml({ msg, ...other }: HTMLProps) {
  const navigation = useNavigation()
  const [collapsed, setCollapsed] = useState(!!msg && msg.includes(COLLAPSED_HTML))

  return useObserver(() => {
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

    return <HTML {...other} navigation={navigation} msg={msg.replace(COLLAPSED_HTML, '')} />
  })
}

export default CollapsedHtml
