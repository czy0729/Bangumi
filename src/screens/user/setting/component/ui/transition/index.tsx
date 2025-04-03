/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:24:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 20:10:23
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useAsyncSetSetting, useObserver } from '@utils/hooks'
import { MODEL_SETTING_TRANSITION } from '@constants'
import { TEXTS } from '../ds'
import { memoStyles } from './styles'

/** 切页动画 */
function Transition({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('transition')

  return useObserver(() => {
    const styles = memoStyles()
    const label = MODEL_SETTING_TRANSITION.getLabel(value)
    const genItemProps = (key: string) => {
      const { title } = TEXTS.transition[key]
      return {
        itemStyle: styles.item,
        active: label === title,
        filter,
        onPress: () => {
          if (label === title) return

          handleSet(MODEL_SETTING_TRANSITION.getValue(title))

          t('设置.切换', {
            title: '切页动画',
            label
          })
        },
        ...TEXTS.transition[key]
      }
    }

    return (
      <ItemSettingBlock style={_.mt.sm} filter={filter} {...TEXTS.transition.setting}>
        <ItemSettingBlock.Item {...genItemProps('horizontal')}>
          <Flex style={styles.container} justify='center'>
            <View
              style={[
                styles.page,
                {
                  left: 2
                }
              ]}
            />
            <View
              style={[
                styles.page,
                styles.pageCurrent,
                {
                  right: 2
                }
              ]}
            />
          </Flex>
        </ItemSettingBlock.Item>

        <ItemSettingBlock.Item style={_.ml.sm} {...genItemProps('vertical')}>
          <Flex style={styles.container} direction='column' justify='center'>
            <View style={[styles.page, styles.pageVertical]} />
            <View style={[styles.page, styles.pageVertical, styles.pageCurrent]} />
          </Flex>
        </ItemSettingBlock.Item>

        <ItemSettingBlock.Item style={_.ml.sm} {...genItemProps('scale')}>
          <Flex style={styles.container} direction='column' justify='center'>
            <View style={styles.page} />
            <View style={[styles.page, styles.pageScale]} />
          </Flex>
        </ItemSettingBlock.Item>
      </ItemSettingBlock>
    )
  })
}

export default Transition
