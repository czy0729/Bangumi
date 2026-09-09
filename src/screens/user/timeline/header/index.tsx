/*
 * @Author: czy0729
 * @Date: 2022-03-16 02:01:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:58:55
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { info } from '@utils'
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

  const { userName } = $.params

  return (
    <HeaderV2
      title={userName ? `${userName}的时间线` : '时间线'}
      alias='时间线'
      hm={HM}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
