/*
 * @Author: czy0729
 * @Date: 2020-05-02 16:30:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 *
 * 小组项
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Cover, Flex, flexStyle, Highlight, Text, Touchable } from '@components'
import { Tag } from '@_'
import { _, systemStore, useStore } from '@stores'
import { getGroupThumbStatic, getVisualLength } from '@utils'
import { CDN_OSS_MAGMA_PIC } from '@utils/cdn'
import { t } from '@utils/fetch'
import { HOST_IMAGE } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ id, cover, name, num, joined }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { type, filter } = $.state

  const handlePress = useCallback(() => {
    if (!id) return

    navigation.push('Group', {
      groupId: String(id)
    })

    t('我的小组.跳转', {
      groupId: id,
      type
    })
  }, [id, navigation, type])

  let src = getGroupThumbStatic(cover || '')
  if (
    typeof src === 'string' &&
    src.includes(HOST_IMAGE) &&
    systemStore.setting.cdn &&
    systemStore.setting.cdnOrigin === 'magma'
  ) {
    src = CDN_OSS_MAGMA_PIC(src)
  }

  const visualLength = getVisualLength(name || '')
  const size = visualLength >= 10 ? 10 : 11

  return (
    <View style={styles.container}>
      <Touchable style={flexStyle({ align: 'start' })} onPress={handlePress}>
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
            <Flex style={_.mt.xs}>
              {!!joined && <Tag style={_.mr.xs} type='warning' size={9} value='已加入' />}
              <Flex.Item>
                <Text type='sub' size={10}>
                  <Text type='sub' size={10} bold>
                    {num}
                  </Text>{' '}
                  位成员
                </Text>
              </Flex.Item>
            </Flex>
          </Flex>
        </Flex.Item>
      </Touchable>
    </View>
  )
}

export default observer(Item)
