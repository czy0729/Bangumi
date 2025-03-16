/*
 * @Author: czy0729
 * @Date: 2025-01-25 14:45:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-16 10:21:34
 */
import React from 'react'
import { Flex, Heatmap, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { memoStyles } from '@_/base/user-age/styles'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

const title = '用户站龄'

/** 用户站龄 */
function UserAge({ filter }) {
  const { value: userAge, handleSwitch } = useAsyncSwitchSetting('userAge')
  const { value: userAgeType, handleSet } = useAsyncSetSetting('userAgeType')

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <ItemSettingBlock
        style={_.mt.sm}
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2025/png/386799/1737887237571-599dbdd5-0f78-4fee-ab88-090651b5b400.png',
          '0/2025/png/386799/1737787893742-58339256-7090-486e-8b6b-083cebe5e9b7.png'
        ])}
        {...TEXTS.userAge}
      >
        <ItemSettingBlock.Item
          title='不显示'
          active={!userAge}
          filter={filter}
          onPress={() => {
            if (!userAge) return

            handleSwitch()

            t('设置.切换', {
              title,
              value: 0
            })
          }}
        >
          <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
            班友
          </Text>
        </ItemSettingBlock.Item>
        <ItemSettingBlock.Item
          style={_.ml.md}
          title='显示 A'
          active={userAge && userAgeType === 'year'}
          filter={filter}
          onPress={() => {
            if (userAge && userAgeType === 'year') return

            if (!userAge) handleSwitch()
            handleSet('year')

            t('设置.切换', {
              title,
              value: 1
            })
          }}
        >
          <Flex style={_.mt.xs}>
            <Text type='sub' size={11} lineHeight={13} align='center'>
              班友
            </Text>
            <Text style={[styles.text, _.ml.xs]} size={9} noWrap>
              0.5 年
            </Text>
          </Flex>
        </ItemSettingBlock.Item>
        <ItemSettingBlock.Item
          style={_.ml.md}
          title='显示 B'
          active={userAge && userAgeType === 'month'}
          filter={filter}
          onPress={() => {
            if (userAge && userAgeType === 'month') return

            if (!userAge) handleSwitch()
            handleSet('month')

            t('设置.切换', {
              title,
              value: 2
            })
          }}
        >
          <Flex style={_.mt.xs}>
            <Text type='sub' size={11} lineHeight={13} align='center'>
              班友
            </Text>
            <Text style={[styles.text, _.ml.xs]} size={9} noWrap>
              6 月
            </Text>
          </Flex>
        </ItemSettingBlock.Item>
        <Heatmap id='设置.切换' title={title} />
      </ItemSettingBlock>
    )
  })
}

export default UserAge
