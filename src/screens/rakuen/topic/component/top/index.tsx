/*
 * @Author: czy0729
 * @Date: 2019-05-01 20:14:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:10:17
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Expand, HeaderPlaceholder, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Author from './author'
import Content from './content'
import Ep from './ep'
import GroupInfo from './group-info'
import Milestone from './milestone'
import SectionTitle from './section-title'
import Title from './title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Top() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <>
      <HeaderPlaceholder />
      <View style={styles.top}>
        <Milestone />
        <Title />
        <GroupInfo />
        {$.topicId.includes('group/') && <Author />}
        {$.state.filterPost ? (
          <Expand ratio={1.28}>
            <Content />
          </Expand>
        ) : (
          <Content />
        )}
        {!!$.topic.delete && (
          <Text style={_.mb.md} size={15} lineHeight={18} bold align='center'>
            数据库中没有查询到指定话题{'\n'}话题可能正在审核或已被删除
          </Text>
        )}
      </View>
      <Divider />
      <Ep />
      <SectionTitle />
    </>
  )
}

export default ob(Top, COMPONENT)
