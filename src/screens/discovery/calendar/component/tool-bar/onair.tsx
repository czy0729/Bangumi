/*
 * @Author: czy0729
 * @Date: 2024-03-29 11:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 15:20:00
 */
import { observer } from 'mobx-react'
import { ToolBar } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Onair({ adapt, tag, origin }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** 菜单数字与选中联动: 候选沿用全量分布, 数字为「完整条件下去掉自身维, 切换到该选项」的结果数 */
  const { adapts, tags, origins } = $.onAirMenus

  /** 菜单项可能是带颜色的对象形态 (零结果置灰), 取回原始文案 */
  const toText = (item: string | { text: string }) => (typeof item === 'string' ? item : item.text)

  return (
    <>
      {adapts.length > 1 && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={adapts}
          value={adapt ? adapts.find(item => toText(item).split(' (')[0] === adapt) : '全部'}
          text={adapt || '改编'}
          type='desc'
          onSelect={item => $.onAdapt(toText(item))}
        />
      )}
      {tags.length > 1 && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={tags}
          value={tag ? tags.find(item => toText(item).split(' (')[0] === tag) : '全部'}
          text={tag || '标签'}
          type='desc'
          onSelect={item => $.onTag(toText(item))}
        />
      )}
      {origins.length > 1 && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={origins}
          value={origin ? origins.find(item => toText(item).split(' (')[0] === origin) : '全部'}
          text={origin || '制作'}
          type='desc'
          onSelect={item => $.onOrigin(toText(item))}
        />
      )}
      {!!(adapt || tag || origin) && (
        <ToolBar.Icon icon='md-close' iconColor={_.colorDesc} onSelect={$.onClear} />
      )}
    </>
  )
}

export default observer(Onair)
