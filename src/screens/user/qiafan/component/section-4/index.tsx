/*
 * @Author: czy0729
 * @Date: 2024-03-26 04:02:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 07:50:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { styles } from '../../styles'

function Section4() {
  return (
    <>
      <Text style={_.mt.md} size={16} bold align='center'>
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
          src={require('@assets/images/qr/alipay.jpg')}
          size={340}
          height={334}
          onLongPress={() => {
            open('https://lsky.ry.mk/i/2026/05/15/13bfe904b76d7.webp')
          }}
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
          src={require('@assets/images/qr/wx.jpg')}
          size={340}
          height={334}
          onLongPress={() => {
            open('https://lsky.ry.mk/i/2026/05/15/3c098ee47ec1c.webp')
          }}
        />
      </Flex>
      <Text style={styles.mt120} align='center' type='sub'>
        (开发需要动力，动力越多越勤快，不嫌弃也可以扫下红包，长按可使用浏览器打开)
      </Text>
      <Flex style={styles.mt120} justify='center'>
        <Image
          src={require('@assets/images/qr/hongbao.jpg')}
          size={340}
          height={480}
          radius={_.radiusSm}
          onLongPress={() => {
            open('https://lsky.ry.mk/i/2026/05/15/e273cca0c4437.webp')
          }}
        />
      </Flex>
    </>
  )
}

export default observer(Section4)
