/*
 * @Author: czy0729
 * @Date: 2024-03-29 11:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 04:00:57
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { getData } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Onair({ list, adapt, tag, origin }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { adapts, tags, origins } = getData(
    list
    // { adapt, tag, origin }
  )
  const adaptsDS = useMemo(() => ['全部', ...adapts], [adapts])
  const tagsDS = useMemo(() => ['全部', ...tags], [tags])
  const originDS = useMemo(() => ['全部', ...origins], [origins])

  return (
    <>
      {!!adapts?.length && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={adaptsDS}
          text={adapt || '改编'}
          type='desc'
          onSelect={$.onAdapt}
        />
      )}
      {!!tags?.length && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={tagsDS}
          text={tag || '标签'}
          type='desc'
          onSelect={$.onTag}
        />
      )}
      {!!origins?.length && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={originDS}
          text={origin || '制作'}
          type='desc'
          onSelect={$.onOrigin}
        />
      )}
      {!!(adapt || tag || origin) && (
        <ToolBar.Icon icon='md-close' iconColor={_.colorDesc} onSelect={$.onClear} />
      )}
    </>
  )
}

export default observer(Onair)
