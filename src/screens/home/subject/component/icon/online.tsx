/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 20:52:43
 */
import React, { useCallback } from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import IconActions from './actions'
import { HIT_SLOP } from './ds'
import { styles } from './styles'
import { IconProps } from './types'

function IconOnline({ style, children }: IconProps) {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const handleSelect = useCallback((title: string) => {
      $.onOnlinePress(title, navigation)
    }, [])

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
  })
}

export default IconOnline
