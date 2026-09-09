/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-19 19:40:45
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import HeaderTitle from './header-title'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function HeaderTitleWrap() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <HeaderTitle
      cover={$.thumb}
      tinygrail={$.tinygrail}
      nameTop={$.nameTop}
      nameBottom={[$.nameBottom, $.position].filter(item => !!item).join(' · ')}
    />
  )
}

export default observer(HeaderTitleWrap)
