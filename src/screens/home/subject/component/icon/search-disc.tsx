/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:12:56
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { stl } from '@utils'
import { COMPONENT_SEARCH_DISC, HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { IconProps } from './types'

function IconSearchDisc({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>(COMPONENT_SEARCH_DISC)

  const handleSelect = useCallback(
    (title: string) => {
      $.onDiscPress(title, navigation)
    },
    [$, navigation]
  )

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
}

export default observer(IconSearchDisc)
