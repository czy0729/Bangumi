/*
 * @Author: czy0729
 * @Date: 2024-04-03 22:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:46:22
 */
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return <HeaderV2 title='Bangumi年鉴' hm={HM} />
}

export default observer(Header)
