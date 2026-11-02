/*
 * @Author: czy0729
 * @Date: 2024-01-13 20:36:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 云端快照时间与上传下载逻辑
 */
import { useCallback, useState } from 'react'
import { subjectStore, userStore } from '@stores'
import { confirm, date, feedback, info, loading } from '@utils'
import { t } from '@utils/fetch'
import { useMount } from '@utils/hooks'
import { get } from '@utils/kv'
import i18n from '@constants/i18n'

import type { ResultData } from '@utils/kv/type'
import type { Props } from './types'

/** 检测云端是否有上传过源头数据 */
export function useCloudText() {
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

/** 云端上传与下载 */
export function useCloudSync({ isLogin, onDownloaded }: Pick<Props, 'isLogin' | 'onDownloaded'>) {
  const handleDownload = useCallback(() => {
    if (!isLogin) return info(`下载需先${i18n.login()}`)

    setTimeout(() => {
      confirm('确定恢复到云端的设置?', async () => {
        const hide = loading('下载中...')
        const flag = await subjectStore.downloadOrigin()
        hide()
        feedback()
        info(flag ? '已恢复' : '下载失败')
        if (!flag) return

        onDownloaded()
        t('自定义源头.下载')
      })
    }, 160)
  }, [isLogin, onDownloaded])

  const handleUpload = useCallback(() => {
    if (!isLogin) return info(`上传需先${i18n.login()}`)

    setTimeout(() => {
      confirm('确定上传当前设置到云端?', async () => {
        const hide = loading('上传中...')
        const flag = await subjectStore.uploadOrigin()
        hide()
        feedback()
        info(flag ? '已上传' : '上传失败，云服务异常，请待作者修复')
        if (!flag) return

        t('自定义源头.上传')
      })
    }, 160)
  }, [isLogin])

  return {
    /** 从云端恢复设置 */
    handleDownload,

    /** 上传当前设置到云端 */
    handleUpload
  }
}
