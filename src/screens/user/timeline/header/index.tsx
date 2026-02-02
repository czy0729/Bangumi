/*
 * @Author: czy0729
 * @Date: 2022-03-16 02:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 07:45:57
 */
import React, { useCallback } from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { info } from '@utils'
import { useObserver } from '@utils/hooks'
import { HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>()

  const handleHeaderRight = useCallback(
    () => (
      <IconTouchable
        name='md-info-outline'
        size={21}
        color={_.colorDesc}
        onPress={() => {
          info('进度瓷砖会有延迟, 若无数据可过段时间再来')
        }}
      />
    ),
    []
  )

  return useObserver(() => {
    const { userName } = $.params

    return (
      <HeaderV2
        title={userName ? `${userName}的时间线` : '时间线'}
        alias='时间线'
        hm={HM}
        headerRight={handleHeaderRight}
      />
    )
  })
}

export default Header
