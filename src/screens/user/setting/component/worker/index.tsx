/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 20:40:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Divider, Flex, SwitchPro, Text } from '@components'
import { IconTouchable, ItemSetting, ItemSettingBlock, Notice } from '@_'
import { _, systemStore } from '@stores'
import { info } from '@utils'
import { useBoolean, useNavigation } from '@utils/hooks'
import { getSupporterConfig } from '@utils/kv/worker'
import { ANDROID, API_HOST, HOST, HOST_BGM_STATIC, IOS } from '@constants'
import { ECH_PROXY_ENABLED } from '@src/config'
import commonStyles from '../../styles'
import { getShows } from '../../utils'
import {
  IconDomain,
  IconInfo,
  IconKey,
  IconLock,
  IconServer,
  IconTerminal,
  IconWifi
} from '../icons'
import { useWorkerSettings } from './hooks'
import InputItem from './input-item'
import LogConsole from './log-console'
import { ECH_TYPE_FILTERS } from './log-console/ds'
import PingButton from './ping-button'
import { COMPONENT, TEXTS } from './ds'
import { memoStyles } from './styles'

import type { PingStatus, Props } from './types'

/** 网络设置 */
function Worker({ filter, open }: Props) {
  const navigation = useNavigation(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)
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
    pingWorkerLainProxy,
    echRunning,
    echPort,
    echLogs,
    workerLogs,
    proxyMode,
    setProxyMode,
    saveFields
  } = useWorkerSettings()

  if (!shows) return null

  const styles = memoStyles()

  /** 支持者节点开关 (开启后由内置节点接管, 下方所有手填设置不再生效) */
  const supporterOn = systemStore.setting.workerPreset === 'supporter'
  const supporterActive = supporterOn && systemStore.advance && proxyMode === 'worker'

  /** 开关支持者节点 */
  const toggleSupporter = () => {
    if (supporterOn) {
      systemStore.setSetting('workerPreset', '')
      return
    }
    if (!systemStore.advance) {
      info('该节点仅对支持者开放')
      return
    }
    systemStore.setSetting('workerPreset', 'supporter')
  }

  /** 打开页内浏览器验证代理地址 (WebView 会保留 cookie) */
  const openProxyInBrowser = (url: string) => {
    const normalized = url.startsWith('http') ? url : `https://${url}`
    setFalse()
    setTimeout(() => {
      navigation.push('WebBrowser', { url: normalized, title: '验证代理' })
    }, 320)
  }

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
      <ItemSettingBlock icon={<IconDomain />} filter={filter} {...TEXTS[textKey]}>
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
              <Flex style={styles.preview}>
                <Flex.Item>
                  <Text type='sub' size={11}>
                    {host}
                    {!!value && ` → ${value}`}
                  </Text>
                </Flex.Item>
                {!!value && (
                  <IconTouchable
                    style={styles.previewOpen}
                    name='md-link'
                    size={16}
                    onPress={() => openProxyInBrowser(value)}
                  />
                )}
                <PingButton status={pingData.status} ms={pingData.ms} onPress={onPing} />
              </Flex>
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
      <ItemSettingBlock icon={<IconKey />} filter={filter} {...TEXTS[textKey]}>
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
      <ItemSetting
        icon={<IconServer />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.worker}
        ft={
          proxyMode !== 'disabled'
            ? proxyMode === 'ech'
              ? 'ECH'
              : supporterActive
              ? '支持者'
              : '镜像'
            : '直连'
        }
      />
      <ActionSheet
        show={state}
        title={TEXTS.worker.hd}
        height={filter ? 440 : 720}
        onClose={() => {
          saveFields()
          setFalse()
        }}
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

        <ItemSettingBlock icon={<IconWifi />} filter={filter} {...TEXTS.proxyMode}>
          <ItemSettingBlock.Item
            title='直连'
            active={proxyMode === 'disabled'}
            filter={filter}
            onPress={() => setProxyMode('disabled')}
          >
            <Text style={_.mt.xs} type='sub' size={IOS ? 11 : 10} align='center'>
              直连默认服务器，不做任何处理
            </Text>
          </ItemSettingBlock.Item>
          {ANDROID && ECH_PROXY_ENABLED && (
            <ItemSettingBlock.Item
              style={IOS ? _.ml.md : _.ml.sm}
              title='ECH'
              active={proxyMode === 'ech'}
              filter={filter}
              onPress={() => setProxyMode('ech')}
            >
              <Text style={_.mt.xs} type='sub' size={IOS ? 11 : 10} align='center'>
                自动配置无需填写，加密 SNI 和 DNS 保护隐私（推荐）
              </Text>
            </ItemSettingBlock.Item>
          )}
          <ItemSettingBlock.Item
            style={IOS ? _.ml.md : _.ml.sm}
            title='镜像 / 反代'
            active={proxyMode === 'worker'}
            filter={filter}
            onPress={() => setProxyMode('worker')}
          >
            <Text style={_.mt.xs} type='sub' size={IOS ? 11 : 10} align='center'>
              自建或社区提供的服务，需填写地址
            </Text>
          </ItemSettingBlock.Item>
        </ItemSettingBlock>

        <Divider />

        {proxyMode === 'ech' && ANDROID && (
          <>
            <ItemSetting
              style={_.mt.sm}
              icon={<IconLock />}
              ft={
                <Text type={echRunning ? 'success' : 'sub'} size={13} bold>
                  {echRunning
                    ? `${TEXTS.echStatus.running} Port: ${echPort}`
                    : TEXTS.echStatus.stopped}
                </Text>
              }
              filter={filter}
              {...TEXTS.echProxy}
            />
            <LogConsole
              title='ECH 日志'
              logs={echLogs}
              showFilters
              typeFilters={ECH_TYPE_FILTERS}
            />
          </>
        )}

        {proxyMode === 'worker' && (
          <>
            <ItemSetting
              style={_.mt.sm}
              icon={<IconLock />}
              ft={
                <SwitchPro
                  style={commonStyles.switch}
                  value={supporterOn}
                  onSyncPress={toggleSupporter}
                />
              }
              filter={filter}
              informationStyle={styles.information}
              {...TEXTS.supporterNode}
            />

            {supporterOn && !systemStore.advance && (
              <Notice style={_.mt.sm}>{TEXTS.supporterNodeDisabled.information}</Notice>
            )}

            {supporterActive ? (
              <ItemSettingBlock
                icon={<IconDomain />}
                filter={filter}
                title={TEXTS.supporterStatus.hd}
                information={TEXTS.supporterStatus.information}
              >
                <View style={_.container.block}>
                  <Flex style={styles.preview}>
                    <Flex.Item>
                      <Text type={pingWorkerProxy.status === 'done' ? 'success' : 'sub'} size={11}>
                        {pingWorkerProxy.status === 'done'
                          ? `已连接 · ${pingWorkerProxy.ms}ms`
                          : pingWorkerProxy.status === 'fail'
                          ? '连接失败，请反馈给作者'
                          : pingWorkerProxy.status === 'testing'
                          ? '测试中…'
                          : '未测试'}
                      </Text>
                    </Flex.Item>
                    <PingButton
                      status={pingWorkerProxy.status}
                      ms={pingWorkerProxy.ms}
                      onPress={() => pingWorkerProxy.handlePing(getSupporterConfig().host)}
                    />
                  </Flex>
                </View>
              </ItemSettingBlock>
            ) : (
              <>
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

                {shows.workerProxyDirect && (
                  <ItemSetting
                    style={_.mt.sm}
                    icon={<IconTerminal />}
                    ft={
                      <SwitchPro
                        style={commonStyles.switch}
                        value={!workerProxyDirect}
                        onSyncPress={setWorkerProxyDirect}
                      />
                    }
                    filter={filter}
                    informationStyle={styles.information}
                    {...TEXTS.workerProxyDirect}
                  />
                )}

                {!workerProxyDirect && (
                  <>
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
                  </>
                )}
              </>
            )}

            <LogConsole title='日志' logs={workerLogs} showFilters />
          </>
        )}

        {proxyMode === 'disabled' && (
          <ItemSetting
            style={_.mt.sm}
            icon={<IconInfo />}
            filter={filter}
            {...TEXTS.workerProxyDisabled}
          />
        )}
      </ActionSheet>
    </>
  )
}

export default observer(Worker)
