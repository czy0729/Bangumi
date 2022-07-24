/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-25 05:01:54
 */
import React from 'react'
import { Header, ScrollView, Divider, Flex, Text, Image } from '@components'
import { _, userStore } from '@stores'
import { useObserver } from '@utils/hooks'

const Qiafan = () => {
  return useObserver(() => (
    <>
      <Header title='关于' hm={['qiafan', 'Qiafan']} />
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={[_.container.wind, _.container.bottom]}
      >
        <Text lineHeight={16}>
          　　自19年2月以来项目已持续开发已超过3年。最初仅是为练手而建立，也是第一次做app，后来发现很有趣便一直开发至今。回头一算，发电时间也许已经超过1万小时。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　目前App内不同页面的数量为
          <Text type='main' bold>
            {' '}
            98{' '}
          </Text>
          种。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　最近6.0版本狠下心把2年前就想升级的路由系统给全部重写了，后续版本也一直在重写旧功能，这个过程既复杂又容易出错，但是必须得做。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　本App作为一个第三方客户端，相较于bgm.tv在出发点上可能会存在分歧，App的主要目的还是让用户能发现喜欢的番剧，所以在聚合各种元素，无任欢迎提各种意见和需求。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　用户的支持就是作者继续开发下去的动力，觉得好用的不忘到github上给星星，这些无形的资产也许会对作者日后的职业生涯产生重要的帮助。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　2022年以来，因各种你懂的原因，且不说开发新功能，有时候因很多突发的问题，维护App的正常使用就已经使人心力交瘁。目前有打算使用一点资金，在后续的版本中提供更加快速稳定的内容访问服务。后续会开发更多的专属于会员的服务，因为实在需要米作为开发的动力。
        </Text>
        <Text style={_.mt.md} lineHeight={16} align='right'>
          　　最后编辑: 2022/07/24
        </Text>

        {/* 高级用户 */}
        {!userStore.isLimit && (
          <>
            <Divider style={_.mt.md} />
            <Text style={_.mt.lg} lineHeight={16}>
              　　补充说明一下何为高级用户，只要给予过打赏，
              <Text type='main' bold lineHeight={16}>
                并留言或告知用户id
              </Text>
              。作者看见会第一时间把您加进高级用户组，可以无限制享受App内所有功能。
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　目前定义为：只有源站点没有的功能才能成为高级功能，并且普通用户也能使用，只会在不影响使用的程度内进行限制，以避免滥用。
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　为了能继续发展，部分功能可能会突然消失，懂的都懂(bgm38)。
            </Text>

            {/* 目前有如下高级功能 */}
            <Divider style={_.mt.md} />
            <Text style={_.mt.lg} size={16} bold align='center'>
              目前有如下高级功能
            </Text>
            <Text style={_.mt.lg} lineHeight={16}>
              条目高清封面图
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              [首页收藏] 支持最大显示300个条目
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              [用户空间] 支持浏览用户历史帖子
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              [关联系列] 支持更多相关搜索
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              [bilibili 同步] 无限制同步
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              [SMB] 添加多个服务器
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              [小圣杯] 高级功能
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              优先需求反馈跟进
            </Text>

            {/* 支持下面方式 */}
            <Divider style={_.mt.md} />
            <Text style={_.mt.lg} size={16} bold align='center'>
              支持下面方式
            </Text>
            <Text style={_.mt.lg} align='center'>
              (投食前可以的话备注一下你的bgm的id，备注这个
              <Text type='main' bold>
                {userStore.myUserId}
              </Text>
              ， 以后若有新的高级功能，会第一时间为投食用户开放!)
            </Text>
            <Flex style={styles.mt160} justify='center'>
              <Image
                size={240}
                height={274}
                src={require('@assets/images/qr/alipay.png')}
              />
            </Flex>
            <Text style={styles.mt120} align='center' type='sub'>
              (上面是支付宝)
            </Text>
            <Text style={styles.mt120} align='center' type='sub'>
              (下面是微信)
            </Text>
            <Flex style={styles.mt120} justify='center'>
              <Image
                size={240}
                height={295}
                src={require('@assets/images/qr/wx.png')}
              />
            </Flex>
          </>
        )}
      </ScrollView>
    </>
  ))
}

export default Qiafan

const styles = _.create({
  mt80: {
    marginTop: 80
  },
  mt120: {
    marginTop: 120,
    marginBottom: 20
  },
  mt160: {
    marginTop: 160
  },
  mv20: {
    marginVertical: 20
  }
})
