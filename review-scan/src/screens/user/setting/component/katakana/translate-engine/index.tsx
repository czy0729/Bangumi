/*
 * @Author: czy0729
 * @Date: 2024-04-23 05:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 01:13:08
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { Input } from '@components'
import { ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { alert } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { styles } from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'

/** 翻译引擎 */
function TranslateEngine({ filter }) {
  const { value, handleSet } = useAsyncSetSetting('translateEngine')

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
        <ItemSettingBlock.Item
          active={value === 'baidu'}
          filter={filter}
          onPress={() => {
            if (value === 'baidu') return

            handleSet('baidu')
          }}
          {...TEXTS.engine.baidu}
        />
        <ItemSettingBlock.Item
          style={_.ml.md}
          active={value === 'deeplx'}
          filter={filter}
          onPress={() => {
            if (value === 'deeplx') return

            if (!systemStore.advance) {
              alert('此翻译引擎使用了作者的每日限额，当前仅供打赏用户使用。')
              return
            }

            handleSet('deeplx')
          }}
          {...TEXTS.engine.deeplx}
        />
      </ItemSettingBlock>
      {value === 'baidu' && (
        <ItemSettingBlock
          style={_.mt.md}
          {...TEXTS.engine.custom}
          url='https://api.fanyi.baidu.com/api/trans/product/desktop'
          sub
        >
          <View style={_.container.block}>
            <Input
              style={styles.input2}
              defaultValue={appId.current}
              placeholder='APP ID'
              showClear
              onChangeText={handleChangeAppId}
            />
            <Input
              style={[styles.input2, _.mt.md]}
              defaultValue={appKey.current}
              placeholder='密钥'
              showClear
              onChangeText={handleChangeKey}
            />
          </View>
        </ItemSettingBlock>
      )}
    </>
  ))
}

export default TranslateEngine
