/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:54:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:54:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { COMPONENT } from '../ds'
import SwitchRow from '../switch-row'

import type { Ctx } from '../../../types'

/** 封面与评分设置行 */
function RowsCover() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { bg, radius, autoHeight, cnFirst, lastTime, starsFull, starsColor, nsfw } = $.state

  return (
    <>
      <SwitchRow
        hd='渐变背景'
        information='建议在进行长截屏前关闭'
        value={bg}
        onSyncPress={() => $.setOptions('bg')}
      />
      <SwitchRow hd='封面圆角' value={radius} onSyncPress={() => $.setOptions('radius')} />
      <SwitchRow
        hd='封面可变高度'
        information='仅建议在游戏、音乐中开启'
        value={autoHeight}
        onSyncPress={() => $.setOptions('autoHeight')}
      />
      <SwitchRow hd='标题中文优先' value={cnFirst} onSyncPress={() => $.setOptions('cnFirst')} />
      <SwitchRow
        hd='时间换算'
        information='开启后收藏时间会换成 x 天前格式'
        value={lastTime}
        onSyncPress={() => $.setOptions('lastTime')}
      />
      <SwitchRow
        hd='完整评分星星'
        value={starsFull}
        onSyncPress={() => $.setOptions('starsFull')}
      />
      <SwitchRow
        hd='评分星星颜色'
        value={starsColor}
        onSyncPress={() => $.setOptions('starsColor')}
      />
      <SwitchRow
        hd='显示 NSFW'
        value={nsfw}
        onSyncPress={() => {
          $.setOptions('nsfw')

          setTimeout(() => {
            $.fetchUserCollections(true)
          }, 0)
        }}
      />
    </>
  )
}

export default observer(RowsCover)
