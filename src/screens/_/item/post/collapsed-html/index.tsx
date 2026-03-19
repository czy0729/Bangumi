/*
 * @Author: czy0729
 * @Date: 2024-03-13 20:09:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:30:14
 */
import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { HTML } from '../../../base'
import { COLLAPSED_HTML } from './ds'

import type { HTMLProps } from '../../../base'

function CollapsedHtml({ msg, ...other }: HTMLProps) {
  const navigation = useNavigation()
  const [collapsed, setCollapsed] = useState(!!msg && msg.includes(COLLAPSED_HTML))

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
}

export default observer(CollapsedHtml)
