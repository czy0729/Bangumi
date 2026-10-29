/*
 * @Author: czy0729
 * @Date: 2024-03-29 11:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { getData } from './utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Onair({ list, adapt, tag, origin }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { adapts, tags, origins } = getData(list)

  return (
    <>
      {adapts.length > 1 && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={adapts}
          value={adapt ? adapts.find(item => item.split(' (')[0] === adapt) : '全部'}
          text={adapt || '改编'}
          type='desc'
          onSelect={$.onAdapt}
        />
      )}
      {tags.length > 1 && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={tags}
          value={tag ? tags.find(item => item.split(' (')[0] === tag) : '全部'}
          text={tag || '标签'}
          type='desc'
          onSelect={$.onTag}
        />
      )}
      {origins.length > 1 && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={origins}
          value={origin ? origins.find(item => item.split(' (')[0] === origin) : '全部'}
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
