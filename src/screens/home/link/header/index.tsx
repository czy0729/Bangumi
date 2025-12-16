/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 01:27:07
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { _name: name } = $.params
    const { node } = $.filterMap

    let text = '关联'
    if (name) text = `${name}的${text}`

    const length = node?.length
    if (length) text += ` (${length})`

    return (
      <HeaderV2
        title={text}
        hm={$.hm}
        headerRight={() => (
          <IconTouchable
            name='icon-setting'
            size={18}
            color={_.colorSub}
            onPress={() => $.setOptions('show', true)}
          />
        )}
      />
    )
  })
}

export default Header
