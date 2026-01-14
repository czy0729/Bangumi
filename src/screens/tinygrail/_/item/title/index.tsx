/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 07:06:12
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import Level from '../../level'
import Rank from '../../rank'
import { styles } from './styles'

function Title({ rank, topWeekRank, name = '', level, cLevel, crown }) {
  return useObserver(() => {
    const lv = cLevel || level

    return (
      <Flex style={styles.item}>
        <Rank value={rank || topWeekRank} />
        <Flex.Item>
          <Flex>
            <Text
              type='tinygrailPlain'
              size={name.length > 12 ? 10 : name.length > 8 ? 12 : 14}
              lineHeight={14}
              bold
              numberOfLines={1}
            >
              {HTMLDecode(name)}
            </Text>
            <Level style={_.ml.xs} size={11} lineHeight={14} value={Number(lv)} />
            {!!crown && (
              <Text style={_.ml.xs} type='warning' size={11} lineHeight={14} bold>
                x{crown}
              </Text>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    )
  })
}

export default Title
