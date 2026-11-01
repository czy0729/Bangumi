/*
 * @Author: czy0729
 * @Date: 2022-02-27 16:26:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 05:52:07
 *
 * 用户数据与运行环境调试信息
 */
import { useState } from 'react'
import { Platform } from 'react-native'
import { observer } from 'mobx-react'
import Constants from 'expo-constants'
import { _, userStore } from '@stores'
import { date, omit, pick } from '@utils'
import { r } from '@utils/dev'
import { useMount } from '@utils/hooks'
import { get } from '@utils/kv'
import Block from './block'
import { COMPONENT, KEYS } from './ds'
import { formatString } from './utils'

import type { Props } from './types'

function Detail({ userId }: Props) {
  r(COMPONENT)

  const [value, setValue] = useState<Record<string, any>>({})

  useMount(() => {
    if (!userId) return

    setTimeout(async () => {
      const data = await get<Record<string, any>>(`u_${userId}`)
      if (data && typeof data === 'object') {
        if (data.ts) data.ts = date(data.ts)
        setValue(data)
      }
    }, 0)
  })

  return (
    <>
      {userStore.isDeveloper && !!userId && (
        <Block
          title='User'
          value={[pick(value, KEYS), formatString(omit(value, KEYS))]}
          defaultOpen
        />
      )}
      <Block
        title='Login'
        value={JSON.stringify({
          tourist: 1,
          accessToken: userStore.accessToken,
          userCookie: userStore.userCookie
        })}
      />
      <Block title='Window' value={[_.window]} />
      <Block title='Platform' value={[Platform]} />
      <Block title='Constants' value={[Constants]} />
    </>
  )
}

export default observer(Detail)
