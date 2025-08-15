/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-16 01:28:57
 */
import React, { useCallback } from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import { HIT_SLOP } from './ds'
import { styles } from './styles'
import { IconProps } from './types'

function IconSearchDisc({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const handleSelect = useCallback((title: string) => {
      $.onDiscPress(title, navigation)
    }, [])

    return (
      <Popover
        style={stl(!children && styles.touch, style)}
        data={$.discData}
        hitSlop={HIT_SLOP}
        onSelect={handleSelect}
      >
        {children || (
          <Flex style={styles.searchDiscBtn} justify='center'>
            <Iconfont name='md-airplay' size={18} />
          </Flex>
        )}
      </Popover>
    )
  })
}

export default IconSearchDisc
