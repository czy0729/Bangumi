/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:57:08
 */
import React from 'react'
import { SegmentedControl } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const DS = ['简介', '详情'] as const

function Type() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { type } = $.state
  return (
    <SegmentedControl
      key={type}
      style={styles.segment}
      size={11}
      values={DS}
      selectedIndex={type === '简介' ? 0 : 1}
      onValueChange={type => {
        $.setState({
          type
        })
      }}
    />
  )
}

export default ob(Type, COMPONENT)
