/*
 * @Author: czy0729
 * @Date: 2025-04-04 07:48:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:48:53
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { HM } from '../ds'
import { COMPONENT } from './ds'

function Header() {
  return <HeaderV2 backgroundStyle={_.container.tinygrail} title='人物直达' hm={HM} />
}

export default ob(Header, COMPONENT)
