/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-31 09:53:56
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { ActionSheet, Input, SwitchPro, Text } from '@components'
import { ItemSetting, ItemSettingBlock, Notice } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { API_HOST, HOST, HOST_BGM_STATIC } from '@constants'
import commonStyles, { styles } from '../../styles'
import { getShows } from '../../utils'
import { useWorkerSettings } from './hooks'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 代理服务器设置 */
function Worker({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
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
    workerSecret
  } = useWorkerSettings()

  if (!shows) return null

  const previewHost = `${HOST}/subject/123` as const
  const previewApi = `${API_HOST}/calendar` as const
  const previewImage = `${HOST_BGM_STATIC}/pic/cover/l/ab/cd/123_456.jpg` as const

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
          如果你已经有那个工具，建议还是使用工具。请在知悉此功能的情况下再填写输入框，一旦有值对应更改即生效，填写错误值会导致你无法正常使用客户端。首次填写值，可能需要重新冷启动才能正常。
        </Notice>

        {shows.workerProxy && (
          <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.workerProxy}>
            <View style={_.container.block}>
              <Input
                style={styles.input2}
                value={workerProxy}
                placeholder={`当前为 ${HOST}`}
                showClear
                onChangeText={setWorkerProxy}
              />
              {!!workerProxy && (
                <Text style={styles.preview} size={11} type='sub'>
                  {`${previewHost} → ${previewHost.replace(HOST, workerProxy)}`}
                </Text>
              )}
            </View>
          </ItemSettingBlock>
        )}

        {shows.workerApiProxy && (
          <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.workerApiProxy}>
            <View style={_.container.block}>
              <Input
                style={styles.input2}
                value={workerApiProxy}
                placeholder={`当前为 ${API_HOST}`}
                showClear
                onChangeText={setWorkerApiProxy}
              />
              {!!workerApiProxy && (
                <Text style={styles.preview} size={11} type='sub'>
                  {`${previewApi} → ${previewApi.replace(API_HOST, workerApiProxy)}`}
                </Text>
              )}
            </View>
          </ItemSettingBlock>
        )}

        {shows.imageProxy && (
          <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.imageProxy}>
            <View style={_.container.block}>
              <Input
                style={styles.input2}
                value={workerLainProxy}
                placeholder={`当前为 ${HOST_BGM_STATIC}`}
                showClear
                onChangeText={setWorkerLainProxy}
              />
              {!!workerLainProxy && (
                <Text style={styles.preview} size={11} type='sub'>
                  {`${previewImage} → ${previewImage.replace(HOST_BGM_STATIC, workerLainProxy)}`}
                </Text>
              )}
            </View>
          </ItemSettingBlock>
        )}

        {shows.workerSecret && (
          <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.workerSecret}>
            <View style={_.container.block}>
              <Input
                style={styles.input2}
                value={workerSecret}
                placeholder='对 Host 和 API 都生效'
                showClear
                onChangeText={setWorkerSecret}
              />
            </View>
          </ItemSettingBlock>
        )}

        {shows.workerLainSecret && (
          <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.workerLainSecret}>
            <View style={_.container.block}>
              <Input
                style={styles.input2}
                value={workerLainSecret}
                placeholder='对图片生效'
                showClear
                onChangeText={setWorkerLainSecret}
              />
            </View>
          </ItemSettingBlock>
        )}

        {shows.workerProxyDirect && (
          <ItemSetting
            style={_.mt.md}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={workerProxyDirect}
                onSyncPress={setWorkerProxyDirect}
              />
            }
            filter={filter}
            {...TEXTS.workerProxyDirect}
          />
        )}
      </ActionSheet>
    </>
  )
}

export default observer(Worker)
