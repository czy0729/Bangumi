/*
 * @Author: czy0729
 * @Date: 2023-07-13 07:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 12:53:52
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
  const { $, navigation } = useStore<Ctx>(COMPONENT)

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
        <Setting navigation={navigation} length={length} />
      </>
    ),
    [$, length, navigation]
  )

  const { userId } = $.params
  let title = '猜你喜欢'
  if (userId) title = `${userId}的${title}`

  return <HeaderV2 title={title} hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
