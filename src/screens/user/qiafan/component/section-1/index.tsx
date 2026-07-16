/*
 * @Author: czy0729
 * @Date: 2024-03-25 20:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:27:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Image, ScrollView, Text } from '@components'
import { _ } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { TEXT_SECTION_INDENT, TEXT_UPDATE_QIAFAN } from '@constants'
import { FONT_BASE, FONT_STRONG, REPO_COMMIT_COUNT, REPO_PUBLISH_COUNT } from '../../ds'
import { styles } from './styles'

function Section1() {
  return (
    <>
      <Text {...FONT_BASE}>
        {TEXT_SECTION_INDENT}自 19 年 2 月以来项目已持续开发{' '}
        <Text {...FONT_STRONG}>
          {lastDate(getTimestamp('2019-02-01'), false).replace('前', '')}
        </Text>
        。第一次做 APP，最初仅为用于练手，后来发现很有趣便一直开发至今。回头一看已有{' '}
        <Text {...FONT_STRONG}>{REPO_COMMIT_COUNT}</Text> 次代码提交，超过百万行代码的增改，
        <Text {...FONT_STRONG}>{REPO_PUBLISH_COUNT}</Text> 多次版本发布，用爱发电超过数万小时。
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        horizontal
        showMask={false}
      >
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
        目前功能已经够还原网页了，做更多功能也仅仅是画蛇添足，但是做加法容易做减法很难。还请不要嫌弃作者只会做加法，我只是希望软件能一直留在你们手机里，就像代步工具解决最后一公里行程一样。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}作为一个第三方客户端，相较于网页 bgm.tv
        在出发点上可能会存在分歧，客户端的主要目的还是通过聚合各种元素，让用户比网页版更容易发现喜欢的番剧。作者应该也算是第一批能通过互联网追番的人了，以前上学的时候还使用
        txt 去记录看到多少集，也许这就是本客户端的一颗种子吧。无任欢迎提各种意见和需求。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        <Text {...FONT_STRONG}>
          好看 {`>>`} 好用 {`>`} 速度 {`>>>`} 稳定性
        </Text>{' '}
        一直都是本客户端的开发方向。若不能接受崩溃，网页版可能更适合你，当然作者非常鼓励新入站用户尝试使用网页版，能知道网页与客户端的不同之处，理解互相的设计理念。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}您的支持就是作者继续开发下去的动力，觉得好用的不忘到 Github
        上给星星，这些无形的资产会对我的日后职业生涯产生重要的帮助。尤其是现在这个 AI
        迅速发展的时代，个人编程能力已经被无形地磨平了，每个人都被强行拉到了同一起跑线，我也只能通过把更多的时间放在想法上面保持竞争性。目前整个客户端
        vibe code 占比没有超过 5%，但是随着时间推移和技术发展，算好事还是坏事肯定是会发生逆转。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        这几年作者把绝大部分的业余时间都投入到了开发里面，纯粹是出于兴趣和学习目的。所有核心功能对所有人完全开放，就是希望能让更多人用上好用的工具。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        目前能公开的一些数据，这么多年来单安卓，日独立 UV 一直稳定在 5k，启动次数在 10k，PV
        浏览量（不算退后）在 80k，而且每天上下很少差
        5%，没什么增长也没什么下跌，作者表示也是没怎么看懂，可能入宅和脱宅的人每年都是一样吧（流汗）。
      </Text>
      <Text style={_.mt.sm} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        最后感谢这么多年一直有那么一批用户，都能在发布新版本的第一时间选择无条件更新，只要有这么一批用户坚守，作者就有动力一直更新下去。
      </Text>
      <Text style={_.mt.md} {...FONT_BASE} align='right'>
        最后编辑：{TEXT_UPDATE_QIAFAN}
      </Text>
    </>
  )
}

export default observer(Section1)
