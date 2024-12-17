/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:41:20
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT, HM } from './ds'

function Header() {
  return <HeaderV2 backgroundStyle={_.container.tinygrail} title='ICO 榜单' hm={HM} />
}

export default ob(Header, COMPONENT)
