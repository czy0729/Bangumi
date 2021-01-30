/* eslint-disable jsx-a11y/accessible-emoji, no-irregular-whitespace */
/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:56:31
 */
import React from 'react'
import { ScrollView, Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { withHeader, ob } from '@utils/decorators'

const title = '投食'

export default
@withHeader({
  screen: title,
  hm: ['qiafan', 'Qiafan']
})
@ob
class Qiafan extends React.Component {
  static navigationOptions = {
    title
  }

  render() {
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.outer}
        scrollToTop
      >
        <Text lineHeight={16}>
          　　自19年2月依赖项目已持续开发快两年。最初仅是为练手而建立，也是第一次做app，后来发现很有趣便一直开发至今。回头一算，发电时间也许已经超过1万小时。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　最近狠下心把底层框架艰难地升级了，流畅性应该比4.0之前的版本有肉眼可见的提升。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　还是那句话，用户的支持就是作者继续开发下去的动力，觉得好用的不忘到github上给星星或分发平台（如酷安）上打分，这些无形的资产也许会对作者日后的职业生涯产生重要的帮助。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　本App作为一个第三方客户端，相比于bgm.tv在出发点上可能会存在分歧，App的主要目的还是让用户能发现喜欢的番剧，所以在后来的开发，一直只是在聚合各种元素。在发布超过40多个版本的同时，功能趋于完整，开发到了瓶颈阶段，所以无任欢迎提各种意见和需求。
        </Text>
        <Text style={_.mt.md} lineHeight={16} align='right'>
          　　2021/01/30
        </Text>
        <Text style={_.mt.lg} lineHeight={16}>
          　　补充说明一下何为高级用户，只要给予过打赏的不论大小，并留言或告知留下用户id即可。作者看见会第一时间把您加进高级用户组，可以无限制享受App内所有功能。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　目前定义为：只有源站点没有的功能才能成为高级功能，并且普通用户也能使用，只会在不影响使用的程度内进行限制，以避免滥用。
        </Text>
        <Text style={_.mt.sm} lineHeight={16}>
          　　为了能继续发展，部分功能可能会突然消失，懂的都懂(bgm38)。
        </Text>
        <Text
          style={{
            marginTop: 80
          }}
          align='center'
          type='sub'
        >
          支持下面方式
        </Text>
        <Text
          style={{
            marginVertical: 20
          }}
          align='center'
          type='sub'
        >
          (投食前可以的话备注一下bgm的id, 以后若有新的高级功能,
          会第一时间为投食用户开放!)
        </Text>
        <Flex
          style={{
            marginTop: 200
          }}
          justify='center'
        >
          <Image
            size={240}
            height={274}
            mode='aspectFit'
            src={require('@assets/images/qr/alipay.png')}
          />
        </Flex>
        <Text
          style={{
            marginTop: 120,
            marginBottom: 20
          }}
          align='center'
          type='sub'
        >
          (上面是支付宝)
        </Text>
        <Text
          style={{
            marginTop: 80
          }}
          align='center'
          type='sub'
        >
          (下面是微信)
        </Text>
        <Flex
          style={{
            marginTop: 120
          }}
          justify='center'
        >
          <Image
            size={240}
            height={296}
            src={require('@assets/images/qr/wx.png')}
          />
        </Flex>
      </ScrollView>
    )
  }
}
