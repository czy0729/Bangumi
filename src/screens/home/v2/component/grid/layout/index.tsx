/*
 * @Author: czy0729
 * @Date: 2022-11-20 11:15:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-17 05:16:42
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Loading, Mesume, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { memoStyles } from '../styles'
import Info from '../info'
import { COMPONENT, PREV_TEXT } from './ds'

import type { UserCollectionItem } from '@stores/user/types'
import type { UserCollectionsItem } from '@stores/collection/types'
import type { Ctx } from '../../../types'
import type { Props } from './types'

function Layout({ title }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.collection._loaded) return <Loading />

  const styles = memoStyles()

  const { current, grid } = $.state
  const isGame = title === '游戏'
  const { list } = $.currentCollection(title)
  const subjectMap = new Map(
    (list as UserCollectionItem[])
      .filter(item => item.subject_id != null)
      .map(item => [item.subject_id, item])
  )
  let find: any = isGame ? grid : subjectMap.get(current)
  let tip = ''

  /**
   * 如果设置开启了全部里显示游戏, 因为两种数据结构不一样,
   * 需要在确定找到项目后, 使用 $.state.grid
   */
  if (title === '全部' && !find && systemStore.setting.showGame) {
    const gameMap = new Map(
      (list as UserCollectionsItem[])
        .filter(item => item.id != null)
        .map(item => [String(item.id), item])
    )
    find = gameMap.get(String(current))
    if (find) {
      tip = find?.tip || ''
      find = grid
    }
  } else if (isGame) {
    const gameMap = new Map($.games.list.map(item => [String(item.id), item]))
    tip = gameMap.get(String(current))?.tip || ''
  }

  return (
    <View style={isGame ? styles.gameInfo : styles.info}>
      {find ? (
        <Info
          subjectId={find.subject_id}
          subject={find.subject}
          epStatus={find.ep_status}
          tip={tip}
          time={isGame ? find.subject?.time : ''}
        />
      ) : (
        <Flex style={styles.noSelect} justify='center' direction='column'>
          <Mesume size={80} />
          <Text style={_.mt.sm} type='sub' align='center'>
            请先点击下方{PREV_TEXT[title]}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default observer(Layout)
