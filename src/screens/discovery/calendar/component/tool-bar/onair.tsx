/*
 * @Author: czy0729
 * @Date: 2024-03-29 11:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 13:23:58
 */
import React from 'react'
import { ToolBar } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { getData } from './utils'
import { styles } from './styles'

function Onair(props, { $ }: Ctx) {
  const { adapt, tag, origin } = $.state
  const { adapts, tags, origins } = getData($.calendar.list, {
    adapt,
    tag,
    origin
  })
  return (
    <>
      {!!adapts?.length && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={['全部', ...adapts]}
          text={adapt || '改编'}
          type='desc'
          onSelect={$.onAdapt}
        />
      )}
      {!!tags?.length && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={['全部', ...tags]}
          text={tag || '标签'}
          type='desc'
          onSelect={$.onTag}
        />
      )}
      {!!origins?.length && (
        <ToolBar.Popover
          itemStyle={styles.item}
          data={['全部', ...origins]}
          text={origin || '动画制作'}
          type='desc'
          onSelect={$.onOrigin}
        />
      )}
    </>
  )
}

export default obc(Onair)
