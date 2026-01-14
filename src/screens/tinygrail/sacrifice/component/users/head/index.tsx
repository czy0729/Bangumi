/*
 * @Author: czy0729
 * @Date: 2024-03-08 17:38:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:21:19
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { formatNumber } from '@utils'
import { useObserver } from '@utils/hooks'
import { USERS_SORT_DS } from '../../../ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'

function Head() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { usersSort } = $.state

    return (
      <Flex>
        <Flex.Item>
          <Flex>
            <Text type='tinygrailPlain' lineHeight={16}>
              董事会
            </Text>
            <Text style={_.ml.xs} type='warning' size={16}>
              {$.users.total || '-'}
            </Text>
            {!!$.charaPool && (
              <Text type='tinygrailText' size={12}>
                {' / '}彩票奖池 {formatNumber($.charaPool, 0)}
              </Text>
            )}
          </Flex>
        </Flex.Item>
        <Popover data={USERS_SORT_DS} onSelect={$.selectUsersSort}>
          <Flex style={styles.touch}>
            <Iconfont name='md-sort' size={19} color={_.colorTinygrailText} />
            {usersSort !== '默认' && (
              <Text style={_.ml.xs} type='tinygrailText' size={11} bold>
                {usersSort}
              </Text>
            )}
          </Flex>
        </Popover>
      </Flex>
    )
  })
}

export default Head
