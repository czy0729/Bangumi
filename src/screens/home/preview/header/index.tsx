/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:58:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:16:57
 */
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return <HeaderV2 title={$.name ? `${$.name}的预览` : '预览'} alias='预览' hm={$.hm} />
}

export default observer(Header)
