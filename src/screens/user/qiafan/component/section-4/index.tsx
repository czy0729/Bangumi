/*
 * @Author: czy0729
 * @Date: 2024-03-26 04:02:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:39:28
 *
 * 支持项目发展: 留言说明与收款码
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { TEXT_SECTION_INDENT } from '@constants'
import { FONT_BASE } from '../../ds'
import { QR_CODES, QR_HEIGHT, QR_WIDTH } from './ds'
import { styles } from './styles'

function Section4() {
  return (
    <>
      <Text style={_.mt.md} size={16} bold align='center'>
        支持项目发展
      </Text>
      <Text style={_.mt.md} {...FONT_BASE}>
        {TEXT_SECTION_INDENT}
        如果你想支持这个项目继续发展，可以在支持时备注你的站内 bgm 的 id，留下这个{' '}
        <Text type='main' bold>
          {userStore.myUserId}
        </Text>
        。你的支持是作者持续用爱发电的动力！
      </Text>
      {QR_CODES.map(item => (
        <View key={item.label} style={styles.qr}>
          <Flex justify='center'>
            <Image
              src={item.src}
              size={QR_WIDTH}
              height={QR_HEIGHT}
              onLongPress={() => open(item.url)}
            />
          </Flex>
          <Text style={styles.tip} align='center' type='sub' size={11}>
            {item.label}
          </Text>
        </View>
      ))}
    </>
  )
}

export default observer(Section4)
