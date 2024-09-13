/*
 * @Author: czy0729
 * @Date: 2020-01-06 16:07:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 14:41:56
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Header, Heatmap, Loading, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import Content from './content'
import Desc from './desc'
import Footer from './footer'
import Progress from './progress'
import Thumb from './thumb'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info(_props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Header.Placeholder />
      <View style={_.container.inner}>
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

export default obc(Info, COMPONENT)
