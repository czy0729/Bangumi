/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 01:31:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Header, Heatmap, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import ToolBar from '../tool-bar'
import Content from './content'
import Desc from './desc'
import Footer from './footer'
import Progress from './progress'
import Thumb from './thumb'
import Type from './type'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Info() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <View style={styles.container}>
      <Header.Placeholder />
      <View style={styles.info}>
        <Text size={20} bold>
          {$.detail.title}
        </Text>
        <Desc />
        <Thumb />
        <Content />
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Footer />
          </Flex.Item>
          <Progress />
        </Flex>
        <View style={_.mt.lg}>
          <ToolBar />
          <Type />
          <Heatmap id='目录详情.排序' />
        </View>
      </View>
      {!$.detail._loaded && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
    </View>
  )
}

export default observer(Info)
