/*
 * @Author: czy0729
 * @Date: 2022-09-07 15:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:41:32
 */
import React, { useCallback } from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { timeDiff } from '../utils'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { list } = $.state
    const handleHeaderRight = useCallback(
      () => (
        <>
          <IconTouchable
            style={_.mr.sm}
            name={list ? 'md-insert-chart-outlined' : 'md-sort'}
            color={_.colorTitle}
            onPress={$.onToggle}
          />
          <IconTouchable
            name='md-info-outline'
            size={21}
            color={_.colorTitle}
            onPress={() => {
              navigation.push('Information', {
                title: '支持者',
                message: [
                  `生存情况：已存活 ${timeDiff()}`,
                  '图表根据支持额按比例划分',
                  '点击方格隐藏 1 格，若你为支持者长按可进入空间',
                  '除此外还有 50 多个支持者没有留名',
                  '@senken 提供的 100 刀 iOS 开发账号',
                  '@magma 提供的服务器和 OSS 服务',
                  '数据不定期更新，感谢各位的支持！'
                ]
              })

              t('赞助者.提示')
            }}
          />
        </>
      ),
      [list]
    )

    return <HeaderV2 title='支持者' hm={HM} headerRight={handleHeaderRight} />
  })
}

export default Header
