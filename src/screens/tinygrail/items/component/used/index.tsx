/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:13:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:13:32
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { ITEMS_TYPE } from '@screens/tinygrail/_/characters-modal'
import Icon from '@tinygrail/_/icon'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Used({ name }: Props) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

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
          <Text type='tinygrailPlain' size={10} lineHeight={12} numberOfLines={1}>
            {HTMLDecode(mono[`${prefix}Name`])}
          </Text>
          <Text type='ask' size={9} lineHeight={11}>
            lv{mono[`${prefix}Lv`]}
          </Text>
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
            $.doUse(memo, false)
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
