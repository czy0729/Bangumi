/*
 * @Author: czy0729
 * @Date: 2024-01-30 17:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-30 17:31:03
 */
import { rakuenStore } from '@stores'
import { t } from '@utils/fetch'

/** 取消屏蔽小组条目 */
export function handleDeleteBlockUser(item: string) {
  t('超展开设置.取消用户', {
    item
  })

  rakuenStore.deleteBlockUser(item)

  // 因为相关保存结构是数组, 需要及时同步, 以避免以后自动同步会还原已删除关键字的问题
  setTimeout(() => {
    rakuenStore.uploadSetting()
  }, 1000)
}

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

/** 取消屏蔽小组条目 */
export function handleDeleteBlockGroup(item: string) {
  t('超展开设置.取消关键字', {
    item
  })

  rakuenStore.deleteBlockKeyword(item)

  setTimeout(() => {
    rakuenStore.uploadSetting()
  }, 1000)
}
