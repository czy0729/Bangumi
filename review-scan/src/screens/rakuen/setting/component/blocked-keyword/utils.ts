/*
 * @Author: czy0729
 * @Date: 2024-01-30 17:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 20:30:49
 */
import { rakuenStore } from '@stores'
import { t } from '@utils/fetch'

/** 取消关键字 */
export function handleDeleteKeyword(item: string) {
  t('超展开设置.取消关键字', {
    item
  })

  rakuenStore.deleteBlockKeyword(item)

  setTimeout(() => {
    rakuenStore.uploadSetting()
  }, 1000)
}
