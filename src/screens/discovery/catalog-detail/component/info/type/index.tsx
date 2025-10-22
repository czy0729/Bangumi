/*
 * @Author: czy0729
 * @Date: 2025-01-07 15:35:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:13:30
 */
import React, { useMemo } from 'react'
import { Flex, SegmentedControl } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Type() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    const { type, typeData } = $
    const data = typeData.slice()
    const selectedIndex = useMemo(() => data.findIndex(item => item.startsWith(type)), [data, type])
    if (data.length <= 1) return null

    return (
      <Flex style={_.mt.md} justify='center'>
        <SegmentedControl
          style={[
            styles.segment,
            {
              width: 64 * data.length
            }
          ]}
          size={11}
          values={data}
          selectedIndex={selectedIndex}
          onValueChange={$.onType}
        />
      </Flex>
    )
  })
}

export default Type
