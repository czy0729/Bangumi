/*
 * @Author: czy0729
 * @Date: 2019-09-02 14:59:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:55:26
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { useStore } from '@stores'

import type { Ctx } from '../types'

function BtnChange({ value, text }) {
  const { $ } = useStore<Ctx>()

  const { distance } = $.state

  return (
    <Text
      type={distance === value ? 'warning' : 'tinygrailText'}
      size={13}
      onPress={() => $.changeDistance(value)}
    >
      {text}
    </Text>
  )
}

export default observer(BtnChange)
