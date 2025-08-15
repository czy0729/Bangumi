/*
 * @Author: czy0729
 * @Date: 2022-03-24 08:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 20:48:19
 */
import React, { useCallback } from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { HIT_SLOP } from './ds'
import { styles } from './styles'
import { IconProps } from './types'

function IconGame({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const handleSelect = useCallback((title: string) => {
      $.onGamePress(title, navigation)
    }, [])

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
  })
}

export default IconGame
