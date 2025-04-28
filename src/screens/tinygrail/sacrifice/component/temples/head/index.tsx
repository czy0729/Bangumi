/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:20:25
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { calculateRate } from '@screens/tinygrail/_/utils'
import { TEMPLES_SORT_DS } from '../../../ds'
import { Ctx } from '../../../types'
import Refine from '../refine'
import { memoStyles } from './styles'

function Head() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { showTemples, templesSort } = $.state
  const isActive = templesSort !== '默认'
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
            / 股息{toFixed(calculateRate($.rate, $.rank, $.stars), 1)}
          </Text>
          <Refine rate={$.rate} rank={$.rank} stars={$.stars} level={$.level} />
        </Flex>
      </Flex.Item>
      {showTemples && (
        <Popover data={TEMPLES_SORT_DS} onSelect={$.selectTemplesSort}>
          <Flex style={styles.touch}>
            <Iconfont
              name='md-sort'
              size={19}
              color={isActive ? _.colorMain : _.colorTinygrailIcon}
            />
            {isActive && (
              <Text style={_.ml.xs} type='main' size={11}>
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
