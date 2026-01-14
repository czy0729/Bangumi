/*
 * @Author: czy0729
 * @Date: 2024-03-07 05:43:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 07:01:18
 */
import React from 'react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import Bonus from '@tinygrail/_/bonus'
import Level from '@tinygrail/_/level'
import Rank from '@tinygrail/_/rank'

import type { Ctx } from '../../../types'

function Title() {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const size = 13

    return (
      <Flex style={$.state.showCover && _.mt.md} justify='center'>
        <Touchable
          style={_.mr._sm}
          onPress={() => {
            navigation.push('Mono', {
              monoId: `character/${$.id}`,
              _name: $.name
            })

            t('资产重组.跳转', {
              to: 'Mono',
              from: '顶部',
              monoId: $.id
            })
          }}
        >
          <Flex justify='center'>
            <Rank value={$.rank} />
            <Text
              style={_.mh.xs}
              type='tinygrailPlain'
              size={size}
              lineHeight={1}
              align='center'
              bold
            >
              #{$.id} - {$.name}
            </Text>
            <Level value={$.level} size={size - 1} lineHeight={size} st={$.chara.st} />
            <Bonus value={$.chara.crown} size={size - 1} lineHeight={size} />
            <Iconfont name='md-navigate-next' color={_.colorTinygrailText} />
          </Flex>
        </Touchable>
      </Flex>
    )
  })
}

export default Title
