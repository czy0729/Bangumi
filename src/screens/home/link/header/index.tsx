/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 22:44:57
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'
function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { extra, _name: name } = $.params
    const { node } = $.filterMap

    let prefix = name || ''
    if (extra && prefix.includes('(') && node?.length) {
      prefix = cnjp(node[0].nameCN, node[0].name)
    }

    let text = `${prefix ? `${prefix}的` : ''}关联`
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
