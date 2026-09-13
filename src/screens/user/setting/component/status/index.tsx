/*
 * @Author: czy0729
 * @Date: 2026-04-21 14:16:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-22 23:46:05
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Flex, SegmentedControl, SwitchPro, Text, Touchable } from '@components'
import { BreathingLight, ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useBoolean, useMount, useNavigation } from '@utils/hooks'
import { API_MK_STATUS_HOST, MODEL_SETTING_SERVER_STATUS } from '@constants'
import commonStyles from '../../styles'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../hooks'
import { getYuqueThumbs } from '../../utils'
import { IconActivity, IconBellRing, IconRipple } from '../icons'
import { DATA } from './ds'
import { styles } from './styles'

function Status() {
  const navigation = useNavigation()

  const { value: serverStatus, handleSet } = useAsyncSetSetting('serverStatus')
  const { value: serverStatusBreathing, handleSwitch } =
    useAsyncSwitchSetting('serverStatusBreathing')
  const { state, setTrue, setFalse } = useBoolean(false)

  const { status } = systemStore.serverStatus

  /**
   * 在组件体内读取颜色, 让 observer 订阅主题
   *  - 图标显式传色后不再自己读主题 (见 icons/base.tsx), 颜色只能靠调用方更新
   *  - 直接在 useMemo 内读取会只算一次, 元素被 memo 住后颜色停在首次渲染的主题
   * */
  const colorDesc = _.colorDesc

  const elTouch = useMemo(
    () => (
      <Touchable style={styles.status} onPress={setTrue}>
        <Flex>
          <IconActivity color={colorDesc} size={20} strokeWidth={2.2} />
          {(status === 'degraded' || status === 'down') && (
            <BreathingLight style={_.ml.sm} running={serverStatusBreathing} />
          )}
        </Flex>
      </Touchable>
    ),
    [colorDesc, serverStatusBreathing, setTrue, status]
  )

  const elCurrentStatus = useMemo(
    () => (
      <ItemSetting
        icon={<IconActivity />}
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
        icon={<IconBellRing />}
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
        icon={<IconRipple />}
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
