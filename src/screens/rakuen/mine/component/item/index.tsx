/*
 * @Author: czy0729
 * @Date: 2020-05-02 16:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 19:18:05
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { Cover } from '@_'
import { _, systemStore } from '@stores'
import { getGroupThumbStatic } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { CDN_OSS_MAGMA_PIC } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ id, cover, name, num }: any, { navigation }: Ctx) {
  const styles = memoStyles()
  let src = getGroupThumbStatic(cover)
  if (
    systemStore.setting.cdn &&
    systemStore.setting.cdnOrigin === 'magma' &&
    typeof src === 'string' &&
    src.includes(HOST_IMAGE)
  ) {
    src = CDN_OSS_MAGMA_PIC(src)
  }

  return (
    <View style={styles.container}>
      <Touchable
        animate
        scale={0.92}
        onPress={() => {
          t('我的小组.跳转', {
            groupId: id
          })

          navigation.push('Group', {
            groupId: id
          })
        }}
      >
        <Flex align='start'>
          <Cover size={styles.body.height} src={src} border radius />
          <Flex.Item style={_.ml.sm}>
            <Flex style={styles.body} direction='column' align='start' justify='center'>
              <Text size={11} numberOfLines={2} bold>
                {name}
              </Text>
              <Text style={_.mt.xs} type='sub' size={10}>
                <Text type='sub' size={10} bold>
                  {num}
                </Text>{' '}
                位成员
              </Text>
            </Flex>
          </Flex.Item>
        </Flex>
      </Touchable>
    </View>
  )
}

export default obc(Item, COMPONENT)
