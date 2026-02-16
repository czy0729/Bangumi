/*
 * @Author: czy0729
 * @Date: 2024-04-24 09:25:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-09 23:11:03
 */
import React from 'react'
import { Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'

/** 列表显示最大收藏数 */
function HomeListLimit({ filter }) {
  return useObserver(() => (
    <ItemSetting
      style={[_.mt.sm, _.mb.md]}
      ft={
        <Text size={13} bold>
          {systemStore.advance ? '当前 300 项' : '当前 100 项'}
        </Text>
      }
      information={systemStore.advance ? '非打赏用户 100，网页版 25' : '打赏用户 300，网页版 25'}
      filter={filter}
      sub
      {...TEXTS.homeListLimit}
    />
  ))
}

export default HomeListLimit
