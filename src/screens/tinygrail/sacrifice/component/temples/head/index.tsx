/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 09:23:36
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { HTML_SINGLE_DOC } from '@constants'
import { TEMPLES_SORT_DS } from '../../../ds'
import Refine from '../refine'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
function Head() {
  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { showTemples, templesSort } = $.state

    return (
      <Flex style={styles.info}>
        <Flex.Item>
          <Flex>
            <Text type='tinygrailPlain' lineHeight={16}>
              固定资产
            </Text>
            <Text style={_.ml.xs} type='warning' size={16}>
              {$.charaTemple.list.length || '-'}
            </Text>
            <Text style={_.ml.xs} type='tinygrailText' size={11}>
              / 圣殿股息
              {/* {toFixed(calculateRate($.rate, $.rank, $.stars), 1)} */}
            </Text>
            <Refine rate={$.rate} rank={$.rank} stars={$.stars} level={$.level} />
          </Flex>
        </Flex.Item>
        <IconTouchable
          name='md-info-outline'
          color={_.colorTinygrailText}
          size={18}
          onPress={() => {
            navigation.push('WebBrowser', {
              url: HTML_SINGLE_DOC('acauisbz0gn28vpg'),
              title: '设置角色塔图'
            })
          }}
        />
        {showTemples && (
          <Popover data={TEMPLES_SORT_DS} onSelect={$.selectTemplesSort}>
            <Flex style={styles.touch}>
              <Iconfont name='md-sort' color={_.colorTinygrailText} size={19} />
              {templesSort !== '默认' && (
                <Text style={_.ml.xs} type='tinygrailText' size={11} bold>
                  {templesSort}
                </Text>
              )}
            </Flex>
          </Popover>
        )}
      </Flex>
    )
  })
}

export default Head
