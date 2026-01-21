/*
 * @Author: czy0729
 * @Date: 2024-02-01 16:45:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 22:07:41
 */
import { rakuenStore } from '@stores'
import { BlockedUsersItem } from '@stores/rakuen/types'
import { confirm, feedback, info } from '@utils'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Fn } from '@types'

/** 绝交用户 */
export function handleBlockUser(keyword: string, success: Fn) {
  if (!keyword.length) {
    info('不能为空')
    return
  }

  rakuenStore.doBlockUser(
    {
      keyword: keyword.trim()
    },
    async () => {
      t('超展开设置.绝交')

      await rakuenStore.fetchPrivacy()
      feedback()
      success()
    },
    () => {
      info('添加失败, 可能不存在此用户或者授权信息过期')
    }
  )
}

/** 取消绝交用户 */
export function handleDeleteBlockUser(item: BlockedUsersItem) {
  confirm(`取消绝交 ${item.userName}, 确定?`, () => {
    rakuenStore.doCancelBlockUser(
      {
        url: `${HOST}${item.href}`
      },
      async () => {
        t('超展开设置.取消绝交')

        await rakuenStore.fetchPrivacy()
        feedback()
      },
      () => {
        info('取消失败, 可能授权信息过期')
      }
    )
  })
}
