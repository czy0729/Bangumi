/*
 * @Author: czy0729
 * @Date: 2023-06-13 05:32:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 11:27:14
 */
import React from 'react'
import { View } from 'react-native'
import { ActionSheet, Divider, Flex, SwitchPro, Text } from '@components'
import { IconTouchable } from '@_'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { REASONS, REASONS_INFO } from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Setting({ length }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const { likeCollected, likeRec } = systemStore.setting

    return (
      <>
        <IconTouchable name='icon-setting' color={_.colorDesc} onPress={setTrue} />
        <ActionSheet show={state} title='设置' height={800} onClose={setFalse}>
          <View style={_.container.wind}>
            <Text style={_.mv.sm} size={11} lineHeight={15} type='sub'>
              这是一个基于全站用户、条目页面中的「猜你喜欢」数据，并根据你目前的收藏，计算出的一个整合数据列表。与另一「推荐番剧」功能不同，此功能非
              AI
              模型推导结果，只是全程在本地进行的一些很简单的规则累加计算。所以只要你收藏、打分越多，数据就会越多。
            </Text>

            {!!length && (
              <Text style={[_.mt.md, _.mb.sm]} bold>
                当前类型已索引到 {length} 个条目
              </Text>
            )}

            <View style={_.mt.sm}>
              <Flex>
                <Flex.Item>
                  <Text bold>显示已收藏条目</Text>
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

            {REASONS.map((item, index) => {
              return (
                <View style={_.mt.md}>
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
              )
            })}
          </View>
        </ActionSheet>
      </>
    )
  })
}

export default Setting
