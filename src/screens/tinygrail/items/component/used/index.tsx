/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:13:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:54:31
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, tinygrailStore, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { useObserver } from '@utils/hooks'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import Icon from '@tinygrail/_/icon'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Used({ name }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const memo = $.state.memoItemUsed[ITEMS_TYPE[name]]
    if (!memo.monoId) return null

    const styles = memoStyles()

    const renderMonoInfo = (mono: typeof memo, prefix = 'mono') => (
      <Flex>
        <Icon
          monoId={mono[`${prefix}Id`]}
          name={mono[`${prefix}Name`]}
          icon={mono[`${prefix}Avatar`]}
          size={28}
          radius={_.radiusXs}
        />
        <Flex.Item style={_.ml.sm}>
          <Touchable
            onPress={() => {
              navigation.push('TinygrailSacrifice', {
                monoId: String(mono[`${prefix}Id`])
              })
            }}
          >
            <Text type='tinygrailPlain' size={10} lineHeight={12} numberOfLines={1}>
              {HTMLDecode(mono[`${prefix}Name`])}
            </Text>
            <Text type='ask' size={9} lineHeight={11}>
              lv{mono[`${prefix}Lv`]}
            </Text>
          </Touchable>
        </Flex.Item>
      </Flex>
    )

    return (
      <Flex style={styles.memo}>
        <Flex.Item>{renderMonoInfo(memo)}</Flex.Item>
        {!!memo.toMonoId && <Flex.Item style={_.ml.md}>{renderMonoInfo(memo, 'toMono')}</Flex.Item>}
        <Touchable
          style={_.ml.md}
          onPress={() => {
            if (tinygrailStore.checkAuth()) $.doUse(memo, false)
          }}
        >
          <Flex>
            <Text type='tinygrailText'>使用</Text>
            <Iconfont style={_.mr._sm} name='md-navigate-next' color={_.colorTinygrailText} />
          </Flex>
        </Touchable>
      </Flex>
    )
  })
}

export default Used
