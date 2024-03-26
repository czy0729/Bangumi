/*
 * @Author: czy0729
 * @Date: 2024-03-26 04:02:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-26 19:09:48
 */
import React from 'react'
import { Flex, Image, Text } from '@components'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
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
          size={240}
          height={274}
          src={require('@assets/images/qr/alipay.png')}
          onLongPress={() => {
            open('https://p.sda1.dev/6/8f23cd20e8ec57182a86bc479d7775d6/alipay.png')
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
          size={240}
          height={295}
          src={require('@assets/images/qr/wx.png')}
          onLongPress={() => {
            open('https://p.sda1.dev/6/0ab83a02772a88ccb3d687d311f0e033/wx.png')
          }}
        />
      </Flex>
    </>
  )
}

export default ob(Section4)
