/*
 * @Author: czy0729
 * @Date: 2024-03-25 20:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 01:55:40
 */
import React from 'react'
import { Flex, Image, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { ob } from '@utils/decorators'
import { TEXT_SECTION_INDENT, TEXT_UPDATE_QIAFAN } from '@constants'
import { FONT_BASE, FONT_STRONG } from '../../ds'
import { memoStyles } from './styles'

function Section1() {
  const styles = memoStyles()
  return (
    <>
      <Text {...FONT_BASE}>
        {TEXT_SECTION_INDENT}自 19 年 2 月以来项目已持续开发{' '}
        <Text {...FONT_STRONG}>
          {lastDate(getTimestamp('2019-02-01'), false).replace('前', '')}
        </Text>
        。第一次做 App，最初仅为用于练手，后来发现很有趣便一直开发至今。回头一看已有{' '}
        <Text {...FONT_STRONG}>2700</Text> 次代码提交，超过百万行代码的增改，
        <Text {...FONT_STRONG}>180</Text> 多次版本发布，用爱发电时间超过万小时。
      </Text>
      <Flex style={_.mt.md} justify='center'>
        <Image
          src={require('@assets/images/repo/commits.png')}
          width={320}
          height={156}
          radius={_.radiusSm}
          border
        />
      </Flex>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} horizontal>
        <Image
          src={require('@assets/images/repo/overtime.png')}
          width={618}
          height={240}
          radius={_.radiusSm}
          border
        />
      </ScrollView>
      <Text style={_.mt.md} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        不得不说客户端比网页难做太多了，很多正常的功能比如图片加载、网络请求并发，浏览器直接就能提供最优解，而客户端内几乎一切都是刀耕火种。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        目前功能已经是够用的，再做更多功能也仅仅是画蛇添足罢了，所以后续方向是倾向于用户反馈和网页的新增功能。最近
        v7.5 之后的一直在优化迭代一些几年前的代码，这个过程复杂又容易出错，但总算是挺过来了。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}作为一个第三方客户端，相较于网页 bgm.tv
        在出发点上可能会存在分歧，客户端的主要目的还是通过聚合各种元素，让用户比网页版更容易发现喜欢的番剧，无任欢迎提各种意见和需求。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        <Text {...FONT_STRONG}>
          好看 {`>>`} 好用 {`>`} 速度 {`>>>`} 稳定性
        </Text>{' '}
        一直都是本客户端的开发理念。若不能接受崩溃，网页版可能更适合你。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}您的支持就是作者继续开发下去的动力，觉得好用的不忘到 Github
        上给星星，这些无形的资产绝对会对作者日后的职业生涯产生重要的帮助。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}2022
        年以来，因各种你懂的原因，且不说开发新功能，有时候因很多突发的问题，维护客户端的正常使用就已经使人力不从心。目前有打算使用一点资金，在后续的版本中提供更加快速稳定的内容访问服务。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}最近有被人说我是网络乞丐，我寻思我也没赚到多少
        (笑哭)。作者把几年间绝大部分的业余时间都投入到了开发里面，95%
        以上的功能都是免费更新的，就算是余下的 5%
        非免费功能也是在一定程度上免费提供使用，你要是还有意见那就是你对。后续会开发更多的区分会员的功能，正反馈肯定是可以促进开发的。
      </Text>
      <Text style={_.mt.md} {...FONT_BASE} align='right'>
        最后编辑：{TEXT_UPDATE_QIAFAN}
      </Text>
    </>
  )
}

export default ob(Section1)
