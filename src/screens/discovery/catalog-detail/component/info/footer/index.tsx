/*
 * @Author: czy0729
 * @Date: 2024-08-10 13:59:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 01:10:29
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST } from '@constants'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function Footer() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { userId, replyCount } = $.detail
    const replyText = replyCount == 5 ? '5+' : replyCount

    return (
      <Flex>
        <Touchable
          onPress={() => {
            navigation.push('WebBrowser', {
              url: `${HOST}/index/${$.catalogId}/comments`,
              title: '目录留言'
            })

            t('目录详情.跳转', {
              to: 'WebBrowser',
              catalogId: $.catalogId,
              userId
            })
          }}
        >
          <Text type='sub' size={12} bold>
            留言{replyText ? ` (${replyText})` : ''}
          </Text>
        </Touchable>
        <Text type='sub' size={12} bold>
          {' · '}
        </Text>
        <Touchable
          onPress={() => {
            navigation.push('Catalogs', {
              userId
            })

            t('目录详情.跳转', {
              to: 'Catalogs',
              catalogId: $.catalogId,
              userId
            })
          }}
        >
          <Text type='sub' size={12} bold>
            TA 的其他目录
          </Text>
        </Touchable>
      </Flex>
    )
  })
}

export default Footer
