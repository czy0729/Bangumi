/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 10:23:12
 */
import React from 'react'
import { Header, ScrollView, Divider, Flex, Text, Image } from '@components'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

const Qiafan = () => {
  return useObserver(() => (
    <>
      <Header title='关于' hm={['qiafan', 'Qiafan']} />
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={[_.container.wind, _.container.bottom]}
      >
        <Text lineHeight={16}>
          　　自 19 年 2 月以来项目已持续开发超过 4 年。最初仅是为练手，是第一次做
          App，后来发现很有趣便一直开发至今。回头一看，已有 1500 次代码提交，超过 100
          万行代码的增删改，150 多次版本发布，用爱发电时间超过 1 万小时。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　不得不说 App
          比网页难做太多了，很多正常的功能比如图片加载、网络并发请求，浏览器直接就能提供最优解，而
          App 内几乎一切都是刀耕火种。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　目前功能已经是够用的，再做更多功能也仅仅是画蛇添足罢了，所以后续方向是倾向于用户反馈和网页的新增功能。最近
          v7.5
          之后的一直在优化迭代一些几年前的代码，这个过程复杂又容易出错，但总算是挺过来了。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　作为一个第三方客户端，相较于网页版 bgm.tv 在出发点上可能会存在分歧，App
          的主要目的还是让用户能发现喜欢的番剧，所以在聚合各种元素，无任欢迎提各种意见和需求。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　
          <Text bold lineHeight={16} underline>
            好看 {`>>`} 好用 {`>`} 速度 {`>>>`} 稳定性
          </Text>{' '}
          一直都是本 App 的开发理念。若不能接受崩溃，网页版可能更适合你。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　您的支持就是作者继续开发下去的动力，觉得好用的不忘到 Github
          上给星星，这些无形的资产绝对会对作者日后的职业生涯产生重要的帮助。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　2022
          年以来，因各种你懂的原因，且不说开发新功能，有时候因很多突发的问题，维护 App
          的正常使用就已经使人力不从心。目前有打算使用一点资金，在后续的版本中提供更加快速稳定的内容访问服务。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　最近有被人说我是网络乞丐，我寻思我也没赚到多少 (笑哭)。作者把 3
          年间绝大部分的业余时间都投入到了开发里面，95%
          以上的功能都是免费更新的，就算是余下的 5%
          非免费功能也是在一定程度上免费提供使用，你要是还有意见那就是你对。后续会开发更多的专属于会员的服务，因为巧妇难为无米之炊。
        </Text>
        <Text style={_.mt.lg} lineHeight={16} align='right'>
          　　最后编辑∶2023-04-20
        </Text>

        {/* 高级用户 */}
        {!userStore.isLimit && (
          <>
            <Divider style={_.mt.md} />
            <Text style={_.mt.lg} lineHeight={16}>
              　　App 内并没有直接播放视频的功能，请你先知悉 App 是用来干什么的！
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　补充说明一下何为
              <Text type='main' bold lineHeight={16}>
                高级用户
              </Text>
              ，只要给予过打赏，
              <Text type='main' bold lineHeight={16}>
                并且留言 / 告知用户 id
              </Text>
              。作者看见会第一时间把您加进高级用户组，可以无限制享受 App 内特有功能。
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　目前定义为：只有源站点没有的功能才能成为高级功能，并且普通用户也能使用，只会在不影响使用的程度内进行限制，以避免滥用。
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　为了能继续发展，部分功能可能会突然消失，懂的都懂 (bgm38)。
            </Text>

            {/* 目前有如下高级功能 */}
            <Divider style={_.mt.md} />
            <Text style={_.mt.lg} size={16} bold align='center'>
              目前有如下高级功能
            </Text>
            <Text style={_.mt.lg} lineHeight={16}>
              　无限制畅用多达 100 个功能 / 页面
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔条目封面〕高清私域反代（最优需达 10 元）
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔需求反馈〕优先跟进
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔首页收藏〕支持最大显示 300 个条目
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔用户空间〕支持浏览用户历史帖子
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔关联系列〕支持更多相关搜索
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔bilibili 同步〕无限制同步
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔SMB〕添加多个服务器
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔小圣杯〕高级功能
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔豆瓣同步〕研究中
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              〔翻译功能〕因 API 突然收费，非会员可能会有限制
            </Text>

            {/* 支持下面方式 */}
            <Divider style={_.mt.md} />
            <Text style={_.mt.lg} size={16} bold align='center'>
              支持下面方式
            </Text>
            <Text style={_.mt.md} lineHeight={16}>
              　　投食请务必备注一下你的站内 bgm 的 id，在支付的时候留下这个{' '}
              <Text type='main' bold>
                {userStore.myUserId}
              </Text>
              ，以后若有新的高级功能，会第一时间为投食用户开放！
            </Text>
            <Flex style={styles.mt160} justify='center'>
              <Image
                size={240}
                height={274}
                src={require('@assets/images/qr/alipay.png')}
                onLongPress={() =>
                  open(
                    'https://p.sda1.dev/6/8f23cd20e8ec57182a86bc479d7775d6/alipay.png'
                  )
                }
              />
            </Flex>
            <Text style={styles.mt120} align='center' type='sub'>
              (上面是支付宝，长按可使用浏览器打开)
            </Text>
            <Text style={styles.mt120} align='center' type='sub'>
              (下面是微信，长按可使用浏览器打开)
            </Text>
            <Flex style={styles.mt120} justify='center'>
              <Image
                size={240}
                height={295}
                src={require('@assets/images/qr/wx.png')}
                onLongPress={() =>
                  open('https://p.sda1.dev/6/0ab83a02772a88ccb3d687d311f0e033/wx.png')
                }
              />
            </Flex>
          </>
        )}
      </ScrollView>
    </>
  ))
}

export default Qiafan
