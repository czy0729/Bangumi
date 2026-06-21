/*
 * @Author: czy0729
 * @Date: 2024-03-26 04:02:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:39:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { styles } from '../../styles'

function Section4() {
  return (
    <>
      <Text style={_.mt.md} size={16} bold align='center'>
        支持项目发展
      </Text>
      <Text style={_.mt.md} lineHeight={16}>
        　　如果你想支持这个项目继续发展，可以在支持时备注你的站内 bgm 的 id，留下这个{' '}
        <Text type='main' bold>
          {userStore.myUserId}
        </Text>
        。你的支持是作者持续用爱发电的动力！
      </Text>
      <Flex style={styles.mt160} justify='center'>
        <Image
          src={require('@assets/images/qr/alipay.jpg')}
          size={272}
          height={267}
          onLongPress={() => {
            open('https://lsky.ry.mk/i/2026/05/15/13bfe904b76d7.webp')
          }}
        />
      </Flex>
      <Text style={styles.mt120} align='center' type='sub'>
        (长按可使用浏览器打开)
      </Text>
      <View style={styles.mt120} />
      <Flex style={styles.mt120} justify='center'>
        <Image
          src={require('@assets/images/qr/wx.jpg')}
          size={272}
          height={267}
          onLongPress={() => {
            open('https://lsky.ry.mk/i/2026/05/15/3c098ee47ec1c.webp')
          }}
        />
      </Flex>
      <Text style={styles.mt120} align='center' type='sub'>
        (每一份支持都是对开源精神的鼓励，长按可使用浏览器打开)
      </Text>
      {/* <Flex style={styles.mt120} justify='center'>
        <Image
          src={require('@assets/images/qr/hongbao.jpg')}
          size={340}
          height={480}
          radius={_.radiusSm}
          onLongPress={() => {
            open('https://lsky.ry.mk/i/2026/05/15/e273cca0c4437.webp')
          }}
        />
      </Flex> */}
    </>
  )
}

export default observer(Section4)
