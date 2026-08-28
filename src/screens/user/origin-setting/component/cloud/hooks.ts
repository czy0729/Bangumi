/*
 * @Author: czy0729
 * @Date: 2024-01-13 20:36:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 21:21:22
 */
import { useState } from 'react'
import { userStore } from '@stores'
import { date } from '@utils'
import { useMount } from '@utils/hooks'
import { get } from '@utils/kv'

import type { ResultData } from '@utils/kv/type'

/** 检测云端是否有上传过源头数据 */
export function useCloud() {
  const [text, setText] = useState('')

  useMount(() => {
    setTimeout(async () => {
      try {
        const { id } = userStore.userInfo
        if (!id) return

        const data = await get<ResultData>(`origin_${id}`)
        if (data) {
          setText(date('y-m-d H:i', data?.ts))
        }
      } catch {}
    }, 2400)
  })

  return text
}
