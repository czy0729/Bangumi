/*
 * @Author: czy0729
 * @Date: 2022-06-06 08:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:47:07
 */
import React from 'react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ColorValue } from '@types'
import { Ctx } from '../../types'

function Expand() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    let color: ColorValue = _.colorIcon
    if (
      $.state.filter ||
      $.state.filterSub ||
      $.state.tag !== '全部' ||
      $.state.source !== '全部' ||
      $.state.area !== '全部' ||
      $.state.target !== '全部' ||
      $.state.classification !== '全部' ||
      $.state.theme !== '全部'
    ) {
      color = _.colorDesc
    }

    return (
      <ToolBar.Icon
        icon={$.state.expand ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
        iconColor={color}
        onSelect={$.onExpand}
      />
    )
  })
}

export default Expand
