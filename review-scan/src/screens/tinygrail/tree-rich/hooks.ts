/*
 * @Author: czy0729
 * @Date: 2024-11-19 18:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 09:50:32
 */
import { useCallback, useState } from 'react'
import { useInitStore } from '@stores'
import { info } from '@utils'
import { t } from '@utils/fetch'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 前百首富页面逻辑 */
export function useTinygrailTreeRichPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, navigation } = context

  useRunAfter(() => {
    $.init()
  })

  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)

    await $.fetchRich()
    $.generateTreeMap()

    info('已刷新')
    setRefreshing(false)

    t('前百首富.刷新')
  }, [$])

  const handleShowMenu = useCallback(
    ({ id, name, title }) => {
      if (!id) return

      t('前百首富.人物菜单', {
        key: title,
        id
      })

      switch (title) {
        case '资产分析':
          navigation.push('TinygrailTree', {
            userName: id,
            name
          })
          return

        case '隐藏':
          $.onToggleItem({
            id,
            name
          })
          return

        default:
          navigation.push('Zone', {
            userId: id
          })
      }
    },
    [$, navigation]
  )

  return {
    ...context,
    refreshing,
    handleRefresh,
    handleShowMenu
  }
}
