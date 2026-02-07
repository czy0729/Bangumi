/*
 * @Author: czy0729
 * @Date: 2025-07-18 06:16:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 09:10:24
 */
import React, { useCallback } from 'react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { userInfo } = $
    const status = $.userStatus(userInfo?.username) ? '公开' : '匿名'

    const handleHeaderRight = useCallback(
      () =>
        !!userInfo?.username && (
          <Touchable
            style={_.mr.md}
            onPress={() => {
              confirm('是否切换你的刮刮乐用户公开状态?', $.updateUserStatus, '小圣杯助手')
            }}
          >
            <Text type='tinygrailText' size={13} bold>
              {status}中
            </Text>
          </Touchable>
        ),
      [status, userInfo?.username]
    )

    return <TinygrailHeader title='刮刮乐日榜' hm={HM} headerRight={handleHeaderRight} />
  })
}

export default Header
