/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:13:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 07:46:03
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { ITEMS_TYPE } from '@tinygrail/_/characters-modal'
import Icon from '@tinygrail/_/icon'
import { Ctx, ItemsKeys } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Used({ name }: { name: ItemsKeys }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const memo = $.state.memoItemUsed[ITEMS_TYPE[name]]
    if (!memo.monoId) return null

    const styles = memoStyles()
    return (
      <Flex style={styles.memo}>
        <Flex.Item>
          <Flex>
            <Icon
              monoId={memo.monoId}
              name={memo.monoName}
              icon={memo.monoAvatar}
              size={28}
              radius={_.radiusXs}
            />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={11} numberOfLines={1}>
                {HTMLDecode(memo.monoName)}
              </Text>
              <Text type='ask' size={10} lineHeight={11}>
                lv{memo.monoLv}
              </Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        {!!memo.toMonoId && (
          <Flex.Item style={_.ml.md}>
            <Flex>
              <Icon
                size={28}
                monoId={memo.toMonoId}
                name={memo.toMonoName}
                icon={memo.toMonoAvatar}
              />
              <Flex.Item style={_.ml.sm}>
                <Text type='tinygrailPlain' size={11} numberOfLines={1}>
                  {HTMLDecode(memo.toMonoName)}
                </Text>
                <Text type='ask' size={10} lineHeight={11}>
                  lv{memo.toMonoLv}
                </Text>
              </Flex.Item>
            </Flex>
          </Flex.Item>
        )}
        <Touchable
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
