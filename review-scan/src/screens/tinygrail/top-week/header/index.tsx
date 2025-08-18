/*
 * @Author: czy0729
 * @Date: 2025-07-27 04:52:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-29 16:40:55
 */
import React from 'react'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  return useObserver(() => <TinygrailHeader title='每周萌王' hm={HM} />)
}

export default Header
