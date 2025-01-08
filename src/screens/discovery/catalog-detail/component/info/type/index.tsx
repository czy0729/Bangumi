/*
 * @Author: czy0729
 * @Date: 2025-01-07 15:35:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-07 17:27:10
 */
import React from 'react'
import { Flex, SegmentedControl } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Type() {
  const { $ } = useStore<Ctx>()
  const data = [...$.typeData]
  if (data.length <= 1) return null

  const styles = memoStyles()
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
        selectedIndex={data.findIndex(item => item.startsWith($.type))}
        onValueChange={$.onType}
      />
    </Flex>
  )
}

export default ob(Type, COMPONENT)
