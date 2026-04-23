/*
 * @Author: czy0729
 * @Date: 2026-04-21 14:16:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-22 23:46:05
 */
import React, { useMemo } from 'react'
import Svg, { Path } from 'react-native-svg'
import { observer } from 'mobx-react'
import { ActionSheet, Flex, SegmentedControl, SwitchPro, Text, Touchable } from '@components'
import { BreathingLight, ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useBoolean, useMount } from '@utils/hooks'
import { API_MK_STATUS_HOST, MODEL_SETTING_SERVER_STATUS } from '@constants'
import commonStyles from '../../styles'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../../utils'
import { DATA } from './ds'
import { styles } from './styles'

import type { WithNavigation } from '@types'

function Status({ navigation }: WithNavigation) {
  const { value: serverStatus, handleSet } = useAsyncSetSetting('serverStatus')
  const { value: serverStatusBreathing, handleSwitch } =
    useAsyncSwitchSetting('serverStatusBreathing')
  const { state, setTrue, setFalse } = useBoolean(false)

  const { status } = systemStore.serverStatus

  const elTouch = useMemo(
    () => (
      <Touchable style={styles.status} onPress={setTrue}>
        <Flex>
          <Svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
            <Path
              d='M2 12h3l3-7 4 14 4-7h6'
              stroke={_.colorDesc}
              strokeWidth='2.4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </Svg>
          {(status === 'degraded' || status === 'down') && (
            <BreathingLight style={_.ml.sm} running={serverStatusBreathing} />
          )}
        </Flex>
      </Touchable>
    ),
    [serverStatusBreathing, setTrue, status]
  )

  const elCurrentStatus = useMemo(
    () => (
      <ItemSetting
        hd='当前服务状态'
        information='绿色：正常，橙色：服务降级、延迟很大，红色：服务器崩溃、无法操作，灰色：未知'
        ft={
          <Touchable
            onPress={() => {
              setFalse()

              setTimeout(() => {
                navigation.push('WebBrowser', {
                  url: API_MK_STATUS_HOST,
                  title: API_MK_STATUS_HOST.split('//')[1]
                })
              }, 400)
            }}
          >
            <Flex>
              <BreathingLight running={serverStatusBreathing} />
              <Text style={_.ml.sm} type='sub' size={12}>
                查看详细
              </Text>
            </Flex>
          </Touchable>
        }
        arrow
      />
    ),
    [navigation, serverStatusBreathing, setFalse]
  )
  const elServerStatus = useMemo(
    () => (
      <ItemSetting
        hd='提示服务可用性'
        information='定期获取最新服务状态，在顶部 LOGO 旁，显示当前状态的亮点；点击亮点进入详细网页'
        ft={
          <SegmentedControl
            style={styles.segmentedControl}
            size={12}
            values={DATA}
            selectedIndex={DATA.findIndex(
              item => item === MODEL_SETTING_SERVER_STATUS.getLabel(serverStatus)
            )}
            onValueChange={label => {
              handleSet(MODEL_SETTING_SERVER_STATUS.getValue(label))

              t('设置.切换', {
                title: '提示服务可用性',
                label
              })
            }}
          />
        }
        thumb={getYuqueThumbs([
          '0/2026/png/386799/1776912013481-f1497429-40e7-43f5-a533-0cd5e7f6961a.png',
          '0/2026/png/386799/1776912021216-4efe703f-cd7b-4552-8587-764ccca2a3c4.png'
        ])}
      />
    ),
    [handleSet, serverStatus]
  )
  const elServerStatusBreathing = useMemo(
    () => (
      <ItemSetting
        hd='呼吸灯效果'
        ft={
          <SwitchPro
            style={commonStyles.switch}
            value={serverStatusBreathing}
            onAsyncPress={() => {
              handleSwitch()

              t('设置.切换', {
                title: '呼吸灯效果',
                checked: !serverStatusBreathing
              })
            }}
          />
        }
      />
    ),
    [handleSwitch, serverStatusBreathing]
  )

  useMount(() => {
    if (MODEL_SETTING_SERVER_STATUS.getLabel(serverStatus) === '不显示') {
      systemStore.fetchServerStatus()
    }
  })

  return (
    <>
      {elTouch}
      <ActionSheet show={state} title='Bangumi Status' onClose={setFalse}>
        {elCurrentStatus}
        {elServerStatus}
        {elServerStatusBreathing}
      </ActionSheet>
    </>
  )
}

export default observer(Status)
