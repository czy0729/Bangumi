/*
 * @Author: czy0729
 * @Date: 2022-11-22 20:40:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:17:50
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { IconProps } from './types'

function IconActions({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  const handleSelect = useCallback(
    (title: string) => {
      $.onActionsPress(title, navigation)
    },
    [$, navigation]
  )

  return (
    <Popover
      style={stl(!children && styles.action, style)}
      data={$.actionsData}
      hitSlop={HIT_SLOP}
      onSelect={handleSelect}
    >
      {children || (
        <Flex style={styles.actionBtn} justify='center'>
          <Iconfont name='md-read-more' color={_.colorIcon} size={25} />
        </Flex>
      )}
    </Popover>
  )
}

export default observer(IconActions)
