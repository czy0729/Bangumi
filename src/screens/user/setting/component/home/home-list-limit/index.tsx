/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:25:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-18 23:32:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { TEXTS } from '../ds'

import type { WithFilterProps } from '../../../types'

/** 列表显示最大收藏数 */
function HomeListLimit({ filter }: WithFilterProps) {
  return (
    <ItemSetting
      style={[_.mt.sm, _.mb.md]}
      ft={
        <Text style={_.mt.md} size={13} bold>
          {systemStore.advance ? '当前 300 项' : '当前 100 项'}
        </Text>
      }
      information={systemStore.advance ? '普通用户 100，网页版 25' : '高级用户 300，网页版 25'}
      filter={filter}
      sub
      {...TEXTS.homeListLimit}
    />
  )
}

export default observer(HomeListLimit)
