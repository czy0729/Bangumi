/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:40:45
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function HeaderTitleWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <HeaderTitle
      cover={$.thumb}
      tinygrail={$.tinygrail}
      nameTop={$.nameTop}
      nameBottom={[$.nameBottom, $.position].filter(item => !!item).join(' · ')}
    />
  ))
}

export default HeaderTitleWrap
