/*
 * @Author: czy0729
 * @Date: 2024-01-31 17:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 02:37:48
 */
import React, { useMemo } from 'react'
import { SegmentedControl, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { MODEL_RAKUEN_SCROLL_DIRECTION, RAKUEN_SCROLL_DIRECTION } from '@constants'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../hooks'
import { COMPONENT, THUMBS_SCROLL_DIRECTION, THUMBS_SWITCH_SLIDER } from './ds'

/** 楼层跳转 */
function Slider() {
  r(COMPONENT)

  const { value: sliderAnimated, handleSwitch: handleSwitchSliderAnimated } =
    useAsyncSwitchSetting('sliderAnimated')
  const { value: switchSlider, handleSwitch: handleSwitchSwitchSlider } =
    useAsyncSwitchSetting('switchSlider')
  const { value: scrollDirection, handleSet: handleSetScrollDirection } =
    useAsyncSetSetting('scrollDirection')

  const elSliderAnimatedFt = useMemo(
    () => (
      <SwitchPro
        style={styles.switch}
        value={sliderAnimated}
        onSyncPress={() => {
          handleSwitchSliderAnimated()

          t('超展开设置.切换', {
            title: '楼层跳转滚动动画',
            checked: !sliderAnimated
          })
        }}
      />
    ),
    [handleSwitchSliderAnimated, sliderAnimated]
  )
  const elSwitchSliderFt = useMemo(
    () => (
      <SwitchPro
        style={styles.switch}
        value={switchSlider}
        onSyncPress={() => {
          handleSwitchSwitchSlider()

          t('超展开设置.切换', {
            title: '交换楼层跳转按钮',
            checked: !switchSlider
          })
        }}
      />
    ),
    [handleSwitchSwitchSlider, switchSlider]
  )
  const elScrollDirectionFt = useMemo(
    () => (
      <SegmentedControl
        style={styles.segmentedControl}
        backgroundColor={_.select(_.colorBg, _.colorPlain)}
        size={12}
        values={RAKUEN_SCROLL_DIRECTION.map(item => item.label)}
        selectedIndex={RAKUEN_SCROLL_DIRECTION.findIndex(item => item.value === scrollDirection)}
        onValueChange={title => {
          handleSetScrollDirection(MODEL_RAKUEN_SCROLL_DIRECTION.getValue(title))

          t('超展开设置.切换', {
            title: '楼层导航条方向',
            value: title
          })
        }}
      />
    ),
    [handleSetScrollDirection, scrollDirection]
  )

  return useObserver(() => (
    <Block>
      <Tip>楼层跳转</Tip>

      <ItemSetting
        hd='跳转滚动动画'
        information='频繁跳动可能会产生视觉疲劳，若您经常使用跳转功能，建议关闭'
        ft={elSliderAnimatedFt}
        withoutFeedback
      />

      <ItemSetting
        hd='交换跳转按钮'
        information='为了方便左手持机用户，启用后左侧按钮为下一楼，右侧按钮为上一楼'
        ft={elSwitchSliderFt}
        thumb={THUMBS_SWITCH_SLIDER}
        withoutFeedback
      />

      <ItemSetting hd='楼层直达条' ft={elScrollDirectionFt} thumb={THUMBS_SCROLL_DIRECTION} />
    </Block>
  ))
}

export default Slider
