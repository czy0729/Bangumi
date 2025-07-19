/*
 * @Author: czy0729
 * @Date: 2025-07-18 06:16:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 06:18:07
 */
import React from 'react'
import { Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <TinygrailHeader
      title='刮刮乐日榜'
      hm={HM}
      headerRight={() =>
        !!$.userInfo?.username && (
          <Touchable
            style={_.mr.md}
            onPress={() => {
              confirm('是否切换你的刮刮乐用户公开状态?', $.updateUserStatus, '小圣杯助手')
            }}
          >
            <Text type='tinygrailText' size={13} bold>
              {$.userStatus($.userInfo.username) ? '公开' : '匿名'}中
            </Text>
          </Touchable>
        )
      }
    />
  ))
}

export default Header
