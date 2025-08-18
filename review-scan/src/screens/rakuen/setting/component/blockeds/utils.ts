/*
 * @Author: czy0729
 * @Date: 2024-01-30 17:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-31 20:38:24
 */
import { rakuenStore } from '@stores'
import { t } from '@utils/fetch'

/** 取消屏蔽小组 */
export function handleDeleteBlockGroup(item: string) {
  t('超展开设置.取消屏蔽小组', {
    item
  })

  rakuenStore.deleteBlockGroup(item)

  setTimeout(() => {
    rakuenStore.uploadSetting()
  }, 1000)
}
