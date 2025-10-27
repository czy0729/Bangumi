/*
 * @Author: czy0729
 * @Date: 2024-11-19 18:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 09:09:43
 */
import { useCallback, useState } from 'react'
import { useInitStore } from '@stores'
import { alert, info } from '@utils'
import { t } from '@utils/fetch'
import { useRunAfter } from '@utils/hooks'
import i18n from '@constants/i18n'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 资产分析页面逻辑 */
export function useTinygrailTreePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, navigation } = context

  useRunAfter(() => {
    $.init()
  })

  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)

    await $.refresh()
    $.generateTreeMap()

    info('已刷新')
    setRefreshing(false)

    t('资产分析.刷新')
  }, [$])

  const handleShowMenu = useCallback(
    ({ id, name, title }) => {
      if (!id) return

      t('资产分析.人物菜单', {
        key: title,
        id
      })

      switch (title) {
        case 'K线':
          navigation.push('TinygrailTrade', {
            monoId: `character/${id}`
          })
          return

        case '买入':
          navigation.push('TinygrailDeal', {
            monoId: `character/${id}`,
            type: 'bid'
          })
          return

        case '卖出':
          navigation.push('TinygrailDeal', {
            monoId: `character/${id}`,
            type: 'ask'
          })
          return

        case '资产重组':
          navigation.push('TinygrailSacrifice', {
            monoId: `character/${id}`
          })
          return

        case '隐藏':
          $.onToggleItem({
            id,
            name
          })
          return

        default:
          navigation.push('Mono', {
            monoId: `character/${id}`,
            _name: name
          })
      }
    },
    [$, navigation]
  )

  const handleAlert = useCallback(() => {
    alert(
      // eslint-disable-next-line max-len
      `1. 单击方格展开功能菜单, 长按隐藏方格\n2. 本功能处于实验性阶段, 不保证能正常渲染, 不正常请尝试刷新或者在讨论组等${i18n.contact()}作者\n3. 计算的数据只供参考, 不排除会出现不准确丢失的情况\n4. 因角色数量可能导致流量变大, 页面当有缓存数据不会自动刷新, 请点击旁边的按钮刷新\n5. 部分数据可能毫无意义, 只是顺便调出来, 还请自己把握(bgm38)`,
      '小圣杯助手'
    )

    t('资产分析.提醒')
  }, [])

  return {
    ...context,
    refreshing,
    handleRefresh,
    handleShowMenu,
    handleAlert
  }
}
