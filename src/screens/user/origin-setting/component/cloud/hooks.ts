/*
 * @Author: czy0729
 * @Date: 2024-01-13 20:36:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 21:21:22
 */
import { useState } from 'react'
import { userStore } from '@stores'
import { date } from '@utils'
import { read } from '@utils/db'
import { useMount } from '@utils/hooks'
import { get } from '@utils/kv'

/** 检测云端是否有上传过源头数据 */
export function useCloud() {
  const [text, setText] = useState('')
  useMount(() => {
    setTimeout(async () => {
      try {
        const { id } = userStore.userInfo
        if (!id) return

        const data = await get(`origin_${id}`)
        if (data) {
          setText(date('y-m-d H:i', data?.ts))
          return
        }

        const { content } = await read({
          path: `origin/${id}.json`
        })
        setText(`${((content?.length || 0) / 1000).toFixed(1)} kb`)
      } catch (error) {}
    }, 2400)
  })

  return text
}
