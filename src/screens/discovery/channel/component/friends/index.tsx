/*
 * @Author: czy0729
 * @Date: 2020-05-04 16:32:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 好友最近关注: 一行三张卡片, 取前 6 个刚好两行
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { InView, SectionTitle } from '@_'
import { _, useStore } from '@stores'
import { getCoverHeight, getRankHeight } from '../utils'
import Item from './item'
import { COMPONENT, FRIENDS_SIZE } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Friends() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { friends = [] } = $.channel
  if (!friends.length) return null

  const styles = memoStyles()

  const isMusic = $.typeCn === '音乐'
  const height3 = getCoverHeight(isMusic, _.grid(3))
  const base = getRankHeight(isMusic)

  return (
    <View style={_.mt.lg}>
      <SectionTitle style={_.container.wind}>好友最近关注</SectionTitle>

      <Flex style={styles.grid} wrap='wrap'>
        {friends.slice(0, FRIENDS_SIZE).map((item, index) => (
          <Item
            key={`${item.id}${item.userId}`}
            item={item}
            index={index}
            y={InView.y(index, height3, base, 3)}
          />
        ))}
      </Flex>
    </View>
  )
}

export default observer(Friends)
