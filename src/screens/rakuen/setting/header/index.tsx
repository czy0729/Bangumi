/*
 * @Author: czy0729
 * @Date: 2024-02-01 18:24:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:33:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { r } from '@utils/dev'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return <HeaderV2 title='超展开设置' hm={HM} />
}

export default observer(Header)
