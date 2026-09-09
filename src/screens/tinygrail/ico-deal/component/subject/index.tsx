/*
 * @Author: czy0729
 * @Date: 2025-06-07 16:50:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:30:35
 */
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { appNavigate } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Subject() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const subject = $.mono?.jobs?.[0]
  if (!subject) return null

  return (
    <Touchable
      style={_.mv.sm}
      onPress={() => {
        appNavigate(subject.href, navigation)
      }}
    >
      <Text type='tinygrailText' align='center' underline>
        {subject.nameCn || subject.name}
      </Text>
    </Touchable>
  )
}

export default observer(Subject)
