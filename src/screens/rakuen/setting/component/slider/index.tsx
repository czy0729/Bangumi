/*
 * @Author: czy0729
 * @Date: 2024-01-31 17:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 02:37:48
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { SegmentedControl, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { MODEL_RAKUEN_SCROLL_DIRECTION, RAKUEN_SCROLL_DIRECTION } from '@constants'
import Block from '@screens/user/setting/component/block'
import Tip from '@screens/user/setting/component/tip'
import { styles } from '../styles'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../utils'
import { COMPONENT } from './ds'

/** 楼层跳转 */
function Slider() {
  r(COMPONENT)

  const { value: sliderAnimated, handleSwitch: handleSwitchSliderAnimated } =
    useAsyncSwitchSetting('sliderAnimated')
  const { value: switchSlider, handleSwitch: handleSwitchSwitchSlider } =
    useAsyncSwitchSetting('switchSlider')
  const { value: scrollDirection, handleSet: handleSetScrollDirection } =
    useAsyncSetSetting('scrollDirection')

  /** 跳转滚动动画 */
  const elSliderAnimated = useMemo(
    () => (
      <ItemSetting
        hd='跳转滚动动画'
        information='频繁跳动可能会产生视觉疲劳，若您经常使用跳转功能，建议关闭'
        ft={
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
        }
        withoutFeedback
      />
    ),
    [handleSwitchSliderAnimated, sliderAnimated]
  )

  /** 交换跳转按钮 */
  const elSwitchSlider = useMemo(
    () => (
      <ItemSetting
        hd='交换跳转按钮'
        information='为了方便左手持机用户，启用后左侧按钮为下一楼，右侧按钮为上一楼'
        ft={
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
        }
        thumb={getYuqueThumbs([
          '0/2023/png/386799/1684388975121-fbe54014-9b5b-4b08-94e4-f7ad9a463e71.png',
          '0/2023/png/386799/1684388990177-37b68af2-7d66-4e0b-827d-3c390410a943.png'
        ])}
        withoutFeedback
      />
    ),
    [handleSwitchSwitchSlider, switchSlider]
  )

  /** 楼层直达条 */
  const elScrollDirection = useMemo(
    () => (
      <ItemSetting
        hd='楼层直达条'
        ft={
          <SegmentedControl
            style={styles.segmentedControl}
            backgroundColor={_.select(_.colorBg, _.colorPlain)}
            size={12}
            values={RAKUEN_SCROLL_DIRECTION.map(item => item.label)}
            selectedIndex={RAKUEN_SCROLL_DIRECTION.findIndex(
              item => item.value === scrollDirection
            )}
            onValueChange={title => {
              handleSetScrollDirection(MODEL_RAKUEN_SCROLL_DIRECTION.getValue(title))

              t('超展开设置.切换', {
                title: '楼层导航条方向',
                value: title
              })
            }}
          />
        }
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661159480188-a1279dab-0af3-4985-ba54-cda3581a5cbf.png'
        ])}
      />
    ),
    [handleSetScrollDirection, scrollDirection]
  )

  return (
    <Block>
      <Tip>楼层跳转</Tip>
      {elSliderAnimated}
      {elSwitchSlider}
      {elScrollDirection}
    </Block>
  )
}

export default observer(Slider)
