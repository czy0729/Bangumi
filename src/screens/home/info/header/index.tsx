/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:58:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 19:02:07
 */
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { getHeaderTitleSize } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const title = $.params.name || '详情'

  return (
    <HeaderV2
      title={title}
      headerTitleSize={getHeaderTitleSize(title)}
      hm={$.hm}
    />
  )
}

export default observer(Header)
