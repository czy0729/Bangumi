/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-20 18:00:08
 */
import React from 'react'
import { Header, ScrollView, Flex, Text, Image } from '@components'
import { _, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { HOST_CDN } from '@constants/cdn'

const Qiafan = () => {
  return useObserver(() => (
    <>
      <Header title='关于' hm={['qiafan', 'Qiafan']} />
      <ScrollView style={_.container.plain} contentContainerStyle={_.container.wind}>
        <Text lineHeight={16}>
          　　自19年2月以来项目已持续开发已超过3年。最初仅是为练手而建立，也是第一次做app，后来发现很有趣便一直开发至今。回头一算，发电时间也许已经超过10000小时。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　目前APP内不同页面的数量为
          <Text type='main' bold>
            {' '}
            98{' '}
          </Text>
          种。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　最近6.0.0版本狠下心把2年前就想升级的路由系统给全部重写了，所以才有了现在切页的相对流畅。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　本App作为一个第三方客户端，相较于bgm.tv在出发点上可能会存在分歧，App的主要目的还是让用户能发现喜欢的番剧，所以在聚合各种元素。在发布超过100多个版本的同时，功能趋于完整，所以无任欢迎提各种意见和需求。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　还是那句话，用户的支持就是作者继续开发下去的动力，觉得好用的不忘到github上给星星或分发平台（如酷安）上打分，这些无形的资产也许会对作者日后的职业生涯产生重要的帮助。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　2022年以来，因为网络上面的各种你懂的原因，维护App的正常使用变得异常的困难，目前有打算使用一点资金，在后续的版本中提供更加快速稳定的内容访问服务。话我就说白了，后续会开发更多的专属于会员的服务，因为实在需要米作为开发的动力。
        </Text>
        <Text style={_.mt.md} lineHeight={16} align='right'>
          　　2022/04/20
        </Text>
        {!userStore.isLimit && (
          <>
            <Text style={_.mt.lg} lineHeight={16}>
              　　补充说明一下何为高级用户，只要给予过打赏的不论大小（也真的不要只给我打0.01或者0.1的，你想要跟我说一声亦可），并留言或告知留下用户id即可。作者看见会第一时间把您加进高级用户组，可以无限制享受App内所有功能。
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　目前定义为：只有源站点没有的功能才能成为高级功能，并且普通用户也能使用，只会在不影响使用的程度内进行限制，以避免滥用。
            </Text>
            <Text style={_.mt.sm} lineHeight={16}>
              　　为了能继续发展，部分功能可能会突然消失，懂的都懂(bgm38)。
            </Text>
            <Text style={styles.mt80} align='center' type='sub'>
              支持下面方式
            </Text>
            <Text style={styles.mv20} align='center' type='sub'>
              (投食前可以的话备注一下bgm的id，备注这个
              <Text type='main' bold>
                {userStore.myUserId}
              </Text>
              ， 以后若有新的高级功能，会第一时间为投食用户开放!)
            </Text>
            <Flex style={styles.mt160} justify='center'>
              <Image
                style={styles.image}
                size={240}
                height={274}
                mode='aspectFit'
                src={`${HOST_CDN}/gh/czy0729/Bangumi-Static@20210314/data/qr/alipay.png`}
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
                style={styles.image}
                size={240}
                height={240}
                src={`${HOST_CDN}/gh/czy0729/Bangumi-Static@20210314/data/qr/wechat.png`}
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
  },
  image: {
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
})
