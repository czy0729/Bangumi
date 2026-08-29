/*
 * @Author: czy0729
 * @Date: 2023-07-13 07:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 06:47:38
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { WEB } from '@constants'
import Setting from '../component/setting'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { list, type } = $.state
  const length = list?.[type]?.length
  const handleHeaderRight = useCallback(
    () => (
      <>
        {WEB && !!$.userId && (
          <IconTouchable
            style={_.mr.xs}
            name='md-refresh'
            color={_.colorDesc}
            size={22}
            onPress={$.onHeaderRefresh}
          />
        )}
        <Setting length={length} />
      </>
    ),
    [$, length]
  )

  const { userId } = $.params
  let title = '猜你喜欢'
  if (userId) title = `${userId}的${title}`

  return <HeaderV2 title={title} hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
