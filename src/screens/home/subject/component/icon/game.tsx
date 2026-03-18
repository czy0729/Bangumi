/*
 * @Author: czy0729
 * @Date: 2022-03-24 08:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:24:45
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { stl } from '@utils'
import { HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { IconProps } from './types'

function IconGame({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  const handleSelect = useCallback(
    (title: string) => {
      $.onGamePress(title, navigation)
    },
    [$, navigation]
  )

  if (!$.titleLabel.includes('游戏')) return null

  return (
    <Popover
      style={stl(!children && styles.game, style)}
      data={$.gameData}
      hitSlop={HIT_SLOP}
      onSelect={handleSelect}
    >
      {children || (
        <>
          <Flex style={styles.btn2} justify='center'>
            <Iconfont name='md-airplay' size={18} />
          </Flex>
          <Heatmap right={55} bottom={-7} id='条目.搜索源' />
        </>
      )}
    </Popover>
  )
}

export default observer(IconGame)
