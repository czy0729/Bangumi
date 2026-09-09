/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:08:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:44:36
 */
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return <HeaderV2 title='社区项目' hm={HM} />
}

export default observer(Header)
