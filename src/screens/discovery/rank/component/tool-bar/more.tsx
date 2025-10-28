/*
 * @Author: czy0729
 * @Date: 2022-06-03 13:18:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:58:29
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'

import type { Ctx } from '../../types'

/** 额外选项 */
function More() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ToolBar.Popover
      data={$.toolBar}
      icon='md-more-vert'
      iconColor={_.colorDesc}
      iconSize={16}
      type='desc'
      transparent
      onSelect={$.onToolBar}
    />
  ))
}

export default More
