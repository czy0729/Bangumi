/*
 * @Author: czy0729
 * @Date: 2022-11-20 11:15:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:39:51
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, Mesume, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SubjectId } from '@types'
import { Ctx } from '../../../types'
import { memoStyles } from '../styles'
import Info from '../info'
import { COMPONENT, PREV_TEXT } from './ds'

function Layout({ title }) {
  const { $ } = useStore<Ctx>()
  if (!$.collection._loaded) return <Loading />

  const styles = memoStyles()
  const { current, grid } = $.state
  const isGame = title === '游戏'
  const { list } = $.currentCollection(title)
  let find = isGame
    ? grid
    : list.find((item: { subject_id: SubjectId }) => item.subject_id === current)
  let tip = ''

  /**
   * 如果设置开启了全部里显示游戏, 因为两种数据结构不一样,
   * 需要在确定找到项目后, 使用 $.state.grid
   */
  if (title === '全部' && !find && systemStore.setting.showGame) {
    find = list.find((item: { id: SubjectId }) => item.id == current)
    if (find) {
      tip = find?.tip || ''
      find = grid
    }
  } else if (isGame) {
    tip = $.games.list.find(item => item.id == current)?.tip || ''
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

export default ob(Layout, COMPONENT)
