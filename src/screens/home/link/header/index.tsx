/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 21:25:44
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'
function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { name } = $.params
    const { map } = $.state

    let text = '关联图'
    if (map.node?.length) {
      text = `${cnjp(map.node[0].nameCN, map.node[0].name)}的${text}`
    } else if (name) {
      text = `${name}的${text}`
    }

    const length = map?.node?.length
    if (length) text += ` (${length})`

    return <HeaderV2 title={text} hm={$.hm} />
  })
}

export default Header
