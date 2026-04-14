/*
 * @Author: czy0729
 * @Date: 2023-06-13 05:32:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 13:18:15
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Divider, Flex, SwitchPro, Text } from '@components'
import { IconTouchable, Notice } from '@_'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { REASONS, REASONS_INFO } from '../../ds'
import Input from '../input'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { WithNavigation } from '@types'

function Setting({ navigation, length }: WithNavigation<{ length: number }>) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)

  const { likeCollected, likeRec } = systemStore.setting

  return (
    <>
      <IconTouchable name='icon-setting' size={19} color={_.colorDesc} onPress={setTrue} />
      <ActionSheet show={state} title='设置' height={800} onClose={setFalse}>
        <View style={styles.share}>
          <IconTouchable
            name='md-info-outline'
            color={_.colorIcon}
            size={18}
            onPress={() => {
              setFalse()

              setTimeout(() => {
                navigation.push('Tips', {
                  key: 'hyrzz32whgurgg6t'
                })
              }, 400)
            }}
          />
        </View>

        <Notice>
          这是基于全站条目中「猜你喜欢」和客户端「分类排行」，并根据您的收藏，计算的一个列表。此功能非
          AI
          大模型推导结果，只是在本地进行的一些很简单规则累加计算。所以只要你收藏、打分越多，数据就会越多。
        </Notice>

        <Input navigation={navigation} />
        <Divider />

        <View style={_.container.wind}>
          {!!length && (
            <View style={[_.mt.md, _.mb.sm]}>
              <Text bold>
                当前类型已索引到{' '}
                <Text type='warning' bold>
                  {length}
                </Text>{' '}
                个条目
              </Text>
              {length < 100 && (
                <Text style={_.mt.xs} size={11} type='sub'>
                  若参与计算的收藏不够，可能会出现负分的情况。
                </Text>
              )}
            </View>
          )}

          <View style={_.mt.sm}>
            <Flex>
              <Flex.Item>
                <Text bold>显示已收藏条目</Text>
                <Text style={_.mt.xs} size={11} type='sub'>
                  是否显示该计算用户已收藏的条目，若为浏览自己的数据，建议关闭；若为浏览基于他人的数据，建议打开
                </Text>
              </Flex.Item>
              <SwitchPro
                style={styles.switch}
                value={likeCollected}
                onSyncPress={() => {
                  systemStore.switchSetting('likeCollected')
                }}
              />
            </Flex>
          </View>

          <Divider />

          <Text style={_.mt.md} bold>
            推荐值计算维度
          </Text>
          <Text style={_.mt.xs} size={11} type='sub'>
            计算非基于结果中显示的条目项，而是推荐这个项的条目
          </Text>

          {REASONS.map((item, index) => (
            <View key={item} style={_.mt.md}>
              <Flex>
                <Flex.Item>
                  <Text bold>{item}</Text>
                  <Text style={_.mt.xs} size={11} type='sub'>
                    {REASONS_INFO[index]}
                  </Text>
                </Flex.Item>
                <SwitchPro
                  style={styles.switch}
                  value={likeRec[index] === 1}
                  onSyncPress={() => {
                    const value = [...likeRec]
                    value[index] = value[index] ? 0 : 1
                    systemStore.setSetting('likeRec', value)
                  }}
                />
              </Flex>
            </View>
          ))}
        </View>
      </ActionSheet>
    </>
  )
}

export default observer(Setting)
