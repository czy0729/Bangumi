/*
 * @Author: czy0729
 * @Date: 2026-04-01 23:49:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 00:29:45
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import {
  BGM_MAP_CATFISH_BLAKE,
  BGM_MAP_CATFISH_MUSUME,
  BgmText,
  Flex,
  SwitchPro
} from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useStableRandomItem } from '@utils/hooks'
import { BIG_EMOJI_SIZE } from '@constants'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles as commonStyles } from '../styles'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 大表情 */
function Topic() {
  r(COMPONENT)

  const [bgmIndex] = useStableRandomItem({
    ...BGM_MAP_CATFISH_BLAKE,
    ...BGM_MAP_CATFISH_MUSUME
  })

  const { value: bigEmojiAnimated, handleSwitch } = useAsyncSwitchSetting('bigEmojiAnimated')
  const { value: bigEmojiSize, handleSet } = useAsyncSetSetting('bigEmojiSize')

  const elBigEmojiAnimated = useMemo(
    () => (
      <ItemSetting
        hd='动画'
        information='若关闭动画，会自动选择中间一帧显示。'
        ft={
          <SwitchPro
            style={commonStyles.switch}
            value={bigEmojiAnimated}
            onSyncPress={() => {
              handleSwitch()

              t('超展开设置.切换', {
                title: '大表情动画',
                checked: !bigEmojiAnimated
              })
            }}
          />
        }
        withoutFeedback
      />
    ),
    [bigEmojiAnimated, handleSwitch]
  )

  const elBigEmojiSize = useMemo(
    () => (
      <ItemSettingBlock style={_.mt.sm} title='尺寸'>
        {BIG_EMOJI_SIZE.map((item, index) => (
          <ItemSettingBlock.Item
            key={item.label}
            style={!!index && _.ml.md}
            itemStyle={styles.item}
            title={item.label}
            active={item.value === bigEmojiSize}
            onPress={() => {
              if (item.value === bigEmojiSize) return

              handleSet(item.value)

              t('超展开设置.切换', {
                title: '大表情尺寸',
                value: item.label
              })
            }}
          >
            <Flex style={styles.emoji} justify='center'>
              <BgmText index={bgmIndex} size={Number(item.value)} animated={bigEmojiAnimated} />
            </Flex>
          </ItemSettingBlock.Item>
        ))}
      </ItemSettingBlock>
    ),
    [bgmIndex, bigEmojiAnimated, bigEmojiSize, handleSet]
  )

  return (
    <Block>
      <Tip>大表情</Tip>
      {elBigEmojiAnimated}
      {elBigEmojiSize}
    </Block>
  )
}

export default observer(Topic)
