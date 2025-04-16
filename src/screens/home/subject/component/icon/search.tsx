/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:58:16
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

function IconSearch({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const handleSelect = useCallback((title: string) => {
      $.onComicPress(title, navigation)
    }, [])

    return (
      <Popover
        style={stl(!children && styles.touch, style)}
        data={$.comicData}
        hitSlop={HIT_SLOP}
        onSelect={handleSelect}
      >
        {children || (
          <Flex style={styles.searchBtn} justify='center'>
            <Iconfont name='md-airplay' size={18} />
          </Flex>
        )}
      </Popover>
    )
  })
}

export default IconSearch
