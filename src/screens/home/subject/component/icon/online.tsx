/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:25:22
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { stl } from '@utils'
import IconActions from './actions'
import { HIT_SLOP } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { IconProps } from './types'

function IconOnline({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  const handleSelect = useCallback(
    (title: string) => {
      $.onOnlinePress(title, navigation)
    },
    [$, navigation]
  )

  return (
    <>
      <Popover
        style={stl(!children && styles.touch, style)}
        data={$.onlineData}
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
      {!children && !!$.actions.length && <IconActions style={styles.actions} />}
    </>
  )
}

export default observer(IconOnline)
