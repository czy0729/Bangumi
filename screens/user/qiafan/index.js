/* eslint-disable no-irregular-whitespace */
/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:48:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-19 17:31:09
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Flex, Text, Image } from '@components'
import { withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'

export default
@withHeader()
@observer
class Qiafan extends React.Component {
  static navigationOptions = {
    title: '想说点话'
  }

  componentDidMount() {
    hm('qiafan', 'Qiafan')
  }

  render() {
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.outer}
      >
        <Text lineHeight={2}>
          　　自19年2月开始，项目已持续开发超过半年。最初仅是为了练手而建立的，也是我第一次做app(现实中就是个做网页的)，后来发现比我想象的有趣太多了，便一直开发至今。回头一算，实际撸码时间已经超过不少于3000个小时。
        </Text>
        <Text style={_.mt.sm} lineHeight={2}>
          　　现阶段功能越堆越多，需求有点混乱了，感觉有点大杂烩了，需要认真思考一下，把项目拉回正轨。另外作者也知道性能有点差，大前提下还是框架的问题
          (当然也是我水平问题)。
        </Text>
        <Text style={_.mt.sm} lineHeight={2}>
          　　接下来作者会花更多心思，打磨细节和优化性能，绝对不会咕。觉得好用的，在github上给我星星，或者在分发平台打分都是对我极大地鼓励，无任欢迎给我提需求。
        </Text>
        <Text
          style={{
            marginTop: 80
          }}
          align='center'
          type='sub'
        >
          (当然支持下面的方式hhh)
        </Text>
        <Flex
          style={{
            marginTop: 480
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
            marginTop: 160,
            marginBottom: 40
          }}
          align='center'
          type='sub'
        >
          (上面是支付宝)
        </Text>
        <Text
          style={{
            marginTop: 40
          }}
          align='center'
          type='sub'
        >
          (下面是微信)
        </Text>
        <Flex
          style={{
            marginTop: 160
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
