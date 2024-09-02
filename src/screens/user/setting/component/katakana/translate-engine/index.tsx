/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:54:12
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { Input } from '@components'
import { ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useMount, useObserver } from '@utils/hooks'
import { FROZEN_FN } from '@constants'
import { TEXTS } from '../ds'

/** 翻译引擎 */
function TranslateEngine({ filter }) {
  const appId = useRef(String(systemStore.setting.baiduAppId || ''))
  const appKey = useRef(String(systemStore.setting.baiduKey || ''))
  const handleChangeAppId = useCallback((text: string) => {
    appId.current = text.trim()
  }, [])
  const handleChangeKey = useCallback((text: string) => {
    appKey.current = text.trim()
  }, [])

  useMount(() => {
    return () => {
      if (appId.current !== systemStore.setting.baiduAppId) {
        systemStore.setSetting('baiduAppId', appId.current)
      }

      if (appKey.current !== systemStore.setting.baiduKey) {
        systemStore.setSetting('baiduKey', appKey.current)
      }
    }
  })

  return useObserver(() => (
    <>
      <ItemSettingBlock style={_.mt.md} filter={filter} {...TEXTS.engine.setting}>
        <ItemSettingBlock.Item active filter={filter} onPress={FROZEN_FN} {...TEXTS.engine.baidu} />
        <ItemSettingBlock.Item
          style={_.ml.md}
          active={false}
          filter={filter}
          onPress={FROZEN_FN}
          {...TEXTS.engine.google}
        />
      </ItemSettingBlock>
      <ItemSettingBlock
        style={_.mt.md}
        {...TEXTS.engine.custom}
        url='https://api.fanyi.baidu.com/api/trans/product/desktop'
      >
        <View style={_.container.block}>
          <Input
            defaultValue={appId.current}
            placeholder='APP ID'
            showClear
            onChangeText={handleChangeAppId}
          />
          <Input
            style={_.mt.md}
            defaultValue={appKey.current}
            placeholder='密钥'
            showClear
            onChangeText={handleChangeKey}
          />
        </View>
      </ItemSettingBlock>
    </>
  ))
}

export default TranslateEngine
