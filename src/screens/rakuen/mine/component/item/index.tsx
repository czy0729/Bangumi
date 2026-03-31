/*
 * @Author: czy0729
 * @Date: 2020-05-02 16:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:37:40
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Cover, Flex, Highlight, Text, Touchable } from '@components'
import { _, systemStore, useStore } from '@stores'
import { getGroupThumbStatic, getVisualLength } from '@utils'
import { HOST_IMAGE } from '@utils/app/ds'
import { t } from '@utils/fetch'
import { CDN_OSS_MAGMA_PIC } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Item({ id, cover, name, num }: any) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    navigation.push('Group', {
      groupId: id
    })

    t('我的小组.跳转', {
      groupId: id
    })
  }, [id, navigation])

  let src = getGroupThumbStatic(cover)
  if (
    typeof src === 'string' &&
    src.includes(HOST_IMAGE) &&
    systemStore.setting.cdn &&
    systemStore.setting.cdnOrigin === 'magma'
  ) {
    src = CDN_OSS_MAGMA_PIC(src)
  }

  const styles = memoStyles()

  const { type, filter } = $.state

  const visualLength = getVisualLength(name)
  const size = visualLength >= 10 ? 10 : 11

  return (
    <View style={styles.container}>
      <Touchable animate scale={0.92} onPress={handlePress}>
        <Flex align='start'>
          <Cover size={styles.body.height} src={src} radius />
          <Flex.Item style={_.ml.sm}>
            <Flex style={styles.body} direction='column' align='start' justify='center'>
              <Highlight
                value={type !== 'all' ? '' : filter}
                size={size}
                lineHeight={11}
                numberOfLines={2}
                bold
              >
                {name}
              </Highlight>
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

export default observer(Item)
