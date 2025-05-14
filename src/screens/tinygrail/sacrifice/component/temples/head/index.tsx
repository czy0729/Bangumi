/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-29 04:17:36
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'

import { TEMPLES_SORT_DS } from '../../../ds'
import { Ctx } from '../../../types'
import Refine from '../refine'
import { memoStyles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
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
}

export default ob(Head)
