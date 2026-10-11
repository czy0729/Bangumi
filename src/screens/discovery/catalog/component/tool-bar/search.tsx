/*
 * @Author: czy0729
 * @Date: 2026-04-12 01:55:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 搜索入口
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from '../../ds'
import { COMPONENT_SEARCH } from './ds'

import type { Ctx } from '../../types'

function Search() {
  const { navigation } = useStore<Ctx>(COMPONENT_SEARCH)

  return (
    <ToolBar.Icon
      icon='md-search'
      iconSize={18}
      iconColor={_.colorDesc}
      onSelect={() => {
        navigation.push('Search', {
          type: '目录',
          _from: COMPONENT
        })
      }}
    />
  )
}

export default observer(Search)
