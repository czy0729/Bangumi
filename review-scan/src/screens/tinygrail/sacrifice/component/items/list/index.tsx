/*
 * @Author: czy0729
 * @Date: 2024-03-08 05:25:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:24:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm, info, tinygrailOSS } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { ITEMS_DESC } from '@tinygrail/_/ds'
import { Fn } from '@types'
import { Ctx } from '../../../types'
import { OSS } from '../ds'
import { styles } from './styles'

function List({ onOpen }: { onOpen: Fn }) {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchUserLogs, $.fetchMyTemple])
  })

  return useObserver(() => (
    <Flex wrap='wrap' align='start'>
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            if (($.userLogs.sacrifices || 0) < 500) {
              info('需要已献祭大于500才能使用')
              return
            }

            confirm(
              '确定消耗10点固定资产使用混沌魔方?',
              () => {
                $.doUse({
                  title: '混沌魔方'
                })
              },
              '小圣杯助手'
            )
          }}
        >
          <Flex style={_.mr.sm} align='start'>
            <Image
              size={28}
              radius={_.radiusXs}
              src={tinygrailOSS(`${OSS}/cube.png`)}
              skeletonType='tinygrail'
            />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={12} bold>
                混沌魔方
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={9}>
                {ITEMS_DESC['混沌魔方']}
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            if (($.myTemple.assets || 0) < 100) {
              info('当前固定资产不够100点')
              return
            }

            onOpen('虚空道标')
          }}
        >
          <Flex align='start'>
            <Image
              size={28}
              radius={_.radiusXs}
              src={tinygrailOSS(`${OSS}/sign.png`)}
              skeletonType='tinygrail'
            />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={12} bold>
                虚空道标
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={9}>
                {ITEMS_DESC['虚空道标']}
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            if (($.userLogs.sacrifices || 0) === ($.myTemple.assets || 0)) {
              info('当前固定资产没有损耗')
              return
            }

            onOpen('星光碎片')
          }}
        >
          <Flex style={_.mr.sm} align='start'>
            <Image
              size={28}
              radius={_.radiusXs}
              src={tinygrailOSS(`${OSS}/star.png`)}
              skeletonType='tinygrail'
            />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={12} bold>
                星光碎片
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={9}>
                {ITEMS_DESC['星光碎片']}
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            if (($.myTemple.assets || 0) < 100) {
              info('当前固定资产不够100点')
              return
            }

            onOpen('闪光结晶')
          }}
        >
          <Flex align='start'>
            <Image
              size={28}
              radius={_.radiusXs}
              src={tinygrailOSS(`${OSS}/fire.png`)}
              skeletonType='tinygrail'
            />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={12} bold>
                闪光结晶
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={9}>
                {ITEMS_DESC['闪光结晶']}
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </View>
      <View style={styles.item}>
        <Touchable
          onPress={() => {
            if (($.myTemple.assets || 0) < 100) {
              info('当前固定资产不够100点')
              return
            }

            onOpen('鲤鱼之眼')
          }}
        >
          <Flex align='start'>
            <Image
              size={28}
              radius={_.radiusXs}
              src={tinygrailOSS(`${OSS}/eye2.png`)}
              skeletonType='tinygrail'
            />
            <Flex.Item style={_.ml.sm}>
              <Text type='tinygrailPlain' size={12} bold>
                鲤鱼之眼
              </Text>
              <Text style={_.mt.xs} type='tinygrailText' size={9}>
                {ITEMS_DESC['鲤鱼之眼']}
              </Text>
            </Flex.Item>
          </Flex>
        </Touchable>
      </View>
    </Flex>
  ))
}

export default List
