/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-19 17:38:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Divider, Flex, SwitchPro, Text } from '@components'
import { IconTouchable, ItemSetting, ItemSettingBlock, Notice } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { ANDROID, API_HOST, HOST, HOST_BGM_STATIC } from '@constants'
import { ECH_PROXY_ENABLED } from '@src/config'
import commonStyles from '../../styles'
import { getShows } from '../../utils'
import { useWorkerSettings } from './hooks'
import InputItem from './input-item'
import PingButton from './ping-button'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { PingStatus, Props } from './types'

/** 代理服务器设置 */
function Worker({ navigation, filter, open }: Props) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)
  const {
    setWorkerApiProxy,
    setWorkerLainProxy,
    setWorkerLainSecret,
    setWorkerProxy,
    setWorkerProxyDirect,
    setWorkerProxyDisabled,
    setWorkerSecret,
    workerApiProxy,
    workerLainProxy,
    workerLainSecret,
    workerProxy,
    workerProxyDirect,
    workerProxyDisabled,
    workerSecret,
    lockedFields,
    focusedField,
    toggleLock,
    handleFocus,
    handleBlur,
    pingWorkerProxy,
    pingWorkerApiProxy,
    pingWorkerLainProxy,
    echRunning,
    echLoading,
    toggleEchProxy
  } = useWorkerSettings()

  if (!shows) return null

  const styles = memoStyles()

  /** 渲染代理输入框 */
  const renderProxyInput = (
    show: boolean,
    textKey: keyof typeof TEXTS,
    value: string,
    placeholder: string,
    host: string,
    field: string,
    pingData: { status: PingStatus; ms: number },
    onPing: () => void
  ) => {
    if (!show) return null
    return (
      <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS[textKey]}>
        <View style={_.container.block}>
          <InputItem
            value={value}
            placeholder={placeholder}
            locked={lockedFields[field]}
            focused={focusedField === field}
            onChangeText={(text: string) => {
              const setter = {
                workerProxy: setWorkerProxy,
                workerApiProxy: setWorkerApiProxy,
                workerLainProxy: setWorkerLainProxy
              }[field]
              setter?.(text)
            }}
            onFocus={() => handleFocus(field)}
            onBlur={handleBlur}
            onToggleLock={() => toggleLock(field)}
            extra={
              !!value && (
                <Flex style={styles.preview}>
                  <Flex.Item>
                    <Text type='sub' size={11}>
                      {host}
                      {' → '}
                      {value}
                    </Text>
                  </Flex.Item>
                  <PingButton status={pingData.status} ms={pingData.ms} onPress={onPing} />
                </Flex>
              )
            }
          />
        </View>
      </ItemSettingBlock>
    )
  }

  /** 渲染密钥输入框 */
  const renderSecretInput = (
    show: boolean,
    textKey: keyof typeof TEXTS,
    value: string,
    placeholder: string,
    field: string
  ) => {
    if (!show) return null

    return (
      <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS[textKey]}>
        <View style={_.container.block}>
          <InputItem
            value={value}
            placeholder={placeholder}
            locked={lockedFields[field]}
            focused={focusedField === field}
            onChangeText={(text: string) => {
              const setter = {
                workerSecret: setWorkerSecret,
                workerLainSecret: setWorkerLainSecret
              }[field]
              setter?.(text)
            }}
            onFocus={() => handleFocus(field)}
            onBlur={handleBlur}
            onToggleLock={() => toggleLock(field)}
          />
        </View>
      </ItemSettingBlock>
    )
  }

  return (
    <>
      <ItemSetting arrow highlight filter={filter} onPress={setTrue} {...TEXTS.worker} />
      <ActionSheet
        show={state}
        title={TEXTS.worker.hd}
        height={filter ? 440 : 720}
        onClose={setFalse}
      >
        <View>
          <Notice style={styles.notice}>若不熟悉本页用途，点击右方按钮查看说明。</Notice>
          <IconTouchable
            style={styles.info}
            name='md-info-outline'
            size={16}
            onPress={() => {
              setFalse()
              setTimeout(() => {
                navigation.push('ProxyHelp')
              }, 320)
            }}
          />
        </View>

        {ANDROID && ECH_PROXY_ENABLED && shows.echProxy && (
          <ItemSetting
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={echRunning}
                loading={echLoading}
                onSyncPress={toggleEchProxy}
              />
            }
            filter={filter}
            {...TEXTS.echProxy}
          />
        )}

        {shows.workerProxyDisabled && (
          <ItemSetting
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={workerProxyDisabled}
                onSyncPress={setWorkerProxyDisabled}
              />
            }
            filter={filter}
            {...TEXTS.workerProxyDisabled}
          />
        )}

        <Divider />

        {renderProxyInput(
          shows.workerProxy,
          'workerProxy',
          workerProxy,
          `当前为 ${HOST}`,
          HOST,
          'workerProxy',
          pingWorkerProxy,
          () => pingWorkerProxy.handlePing(workerProxy)
        )}

        {renderProxyInput(
          shows.workerApiProxy,
          'workerApiProxy',
          workerApiProxy,
          `当前为 ${API_HOST}`,
          API_HOST,
          'workerApiProxy',
          pingWorkerApiProxy,
          () => pingWorkerApiProxy.handlePing(workerApiProxy)
        )}

        {renderProxyInput(
          shows.imageProxy,
          'imageProxy',
          workerLainProxy,
          `当前为 ${HOST_BGM_STATIC}`,
          HOST_BGM_STATIC,
          'workerLainProxy',
          pingWorkerLainProxy,
          () => pingWorkerLainProxy.handlePing(workerLainProxy)
        )}

        <Divider />

        {renderSecretInput(
          shows.workerSecret,
          'workerSecret',
          workerSecret,
          '对 Host 和 API 都生效',
          'workerSecret'
        )}

        {renderSecretInput(
          shows.workerLainSecret,
          'workerLainSecret',
          workerLainSecret,
          '对图片生效',
          'workerLainSecret'
        )}

        <Divider />

        {shows.workerProxyDirect && (
          <ItemSetting
            style={_.mt.sm}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={workerProxyDirect}
                onSyncPress={setWorkerProxyDirect}
              />
            }
            filter={filter}
            informationStyle={styles.information}
            {...TEXTS.workerProxyDirect}
          />
        )}
      </ActionSheet>
    </>
  )
}

export default observer(Worker)
