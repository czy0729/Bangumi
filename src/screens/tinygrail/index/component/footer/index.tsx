/*
 * @Author: czy0729
 * @Date: 2021-05-04 16:25:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 08:27:01
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Text, Touchable } from '@components'
import { Popover } from '@_'
import { _, systemStore, useStore } from '@stores'
import { alert, feedback, info, open } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { APP_ID_SAY_TINYGRAIL, WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Footer() {
  const { navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const memoMenu = useMemo(() => {
      const jump = (to: any, params: any = {}, title: string) => {
        navigation.push(to, params)
        t('小圣杯.跳转', { to, title })
      }

      return [
        { title: '高级功能', action: () => jump('TinygrailAdvance', {}, '高级功能') },
        { title: '小组讨论', action: () => jump('Group', { groupId: 'tinygrail' }, '小组讨论') },
        { title: '粘贴板', action: () => jump('TinygrailClipboard', {}, '粘贴板') },
        {
          title: '意见反馈',
          action: () => jump('Say', { sayId: APP_ID_SAY_TINYGRAIL }, '意见反馈')
        },
        { title: 'QQ群', action: () => alert('1038257138') },
        { title: '设置', action: () => jump('Setting', { open: 'Tinygrail' }, '设置') }
      ]
    }, [])

    const memoData = useMemo(() => memoMenu.map(item => item.title), [memoMenu])

    const handleSelect = useCallback(
      (title: string) => {
        setTimeout(() => {
          const found = memoMenu.find(item => item.title === title)
          found?.action()
        }, 400)
      },
      [memoMenu]
    )

    return (
      <Flex style={_.mv.sm} justify='center'>
        <Touchable
          style={styles.touch}
          onPress={() => {
            navigation.push('TinygrailLotteryRank')
            t('小圣杯.跳转', { to: 'TinygrailLotteryRank', title: '刮刮乐榜单' })
          }}
        >
          <Text type='tinygrailText' size={12}>
            刮刮乐日榜
          </Text>
        </Touchable>
        <Text style={styles.split} type='tinygrailText'>
          ·
        </Text>

        <Touchable style={styles.touch} onPress={() => open('https://fuyuake.top/xsb/chara/all')}>
          <Text type='tinygrailText' size={12}>
            fuyuake
          </Text>
        </Touchable>
        <Text style={styles.split} type='tinygrailText'>
          ·
        </Text>

        {!WEB && (
          <>
            <Touchable
              style={styles.touch}
              onPress={() => {
                const { routes } = navigation.getState()
                if (!routes?.length) return

                // 若在首屏操作, 则先推进 Tinygrail 页面再更新设置
                const isFromHomeTab = !routes[0].key.startsWith('HomeTab')
                if (isFromHomeTab) navigation.push('Tinygrail')

                setTimeout(() => {
                  const value = systemStore.calcHomeRenderTabs('Tinygrail')
                  systemStore.setSetting('homeRenderTabs', value)

                  info(value.includes('Tinygrail') ? '已常驻' : '已取消常驻')
                  feedback()
                }, 0)
              }}
            >
              <Text type='tinygrailText' size={12}>
                {systemStore.setting.homeRenderTabs.includes('Tinygrail') ? '已' : '启用'}常驻
              </Text>
            </Touchable>
            <Text style={styles.split} type='tinygrailText'>
              ·
            </Text>
          </>
        )}

        <Popover style={styles.touch} data={memoData} onSelect={handleSelect}>
          <Text type='tinygrailText' size={12}>
            更多功能
          </Text>
        </Popover>
      </Flex>
    )
  })
}

export default Footer
