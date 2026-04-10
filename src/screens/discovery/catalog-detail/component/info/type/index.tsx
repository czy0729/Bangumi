/*
 * @Author: czy0729
 * @Date: 2025-01-07 15:35:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 01:30:39
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, SegmentedControl } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Type() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { type, typeData } = $
  const data = typeData.slice()
  const { length } = data

  const selectedIndex = useMemo(() => data.findIndex(item => item.startsWith(type)), [data, type])
  if (length <= 1) return null

  const styles = memoStyles()
  const isMini = length > 5

  return (
    <Flex style={_.mt.md} justify='center'>
      <SegmentedControl
        style={[
          styles.segment,
          {
            width: (isMini ? 52 : 62) * length
          }
        ]}
        size={isMini ? 10 : 11}
        values={data}
        selectedIndex={selectedIndex}
        onValueChange={$.onType}
      />
    </Flex>
  )
}

export default observer(Type)
