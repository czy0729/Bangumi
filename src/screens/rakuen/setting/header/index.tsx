/*
 * @Author: czy0729
 * @Date: 2024-02-01 18:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return <HeaderV2 title='超展开设置' hm={HM} />
}

export default observer(Header)
