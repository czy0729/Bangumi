/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 03:07:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Divider, Flex, SwitchPro, Text } from '@components'
import { ItemSetting, ItemSettingBlock, Notice } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { API_HOST, HOST, HOST_BGM_STATIC } from '@constants'
import commonStyles from '../../styles'
import { getShows } from '../../utils'
import { useWorkerSettings } from './hooks'
import InputItem from './input-item'
import PingButton from './ping-button'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { PingStatus } from './types'
import type { WithFilterProps } from '../../types'

/** 代理服务器设置 */
function Worker({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(true)
  const shows = getShows(filter, TEXTS)
  const styles = memoStyles()

  const {
    setWorkerApiProxy,
    setWorkerLainProxy,
    setWorkerLainSecret,
    setWorkerProxy,
    setWorkerProxyDirect,
    setWorkerSecret,
    workerApiProxy,
    workerLainProxy,
    workerLainSecret,
    workerProxy,
    workerProxyDirect,
    workerSecret,
    lockedFields,
    focusedField,
    toggleLock,
    handleFocus,
    handleBlur,
    pingWorkerProxy,
    pingWorkerApiProxy,
    pingWorkerLainProxy
  } = useWorkerSettings()

  if (!shows) return null

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
        <Notice>
          如果你已经有工具建议不要折腾本功能。请在知悉此功能的情况下再填写，一旦有值即生效，错误值会导致你无法正常使用客户端。首次填写值，可能需要重新完整登录授权、冷启动才能正常表现。
        </Notice>

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
