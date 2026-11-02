/*
 * @Author: czy0729
 * @Date: 2022-04-12 11:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 云端同步设置与源头相关开关
 */
import { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { SwitchPro } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { useCloudSync, useCloudText } from './hooks'
import { THUMBS } from './ds'
import { memoStyles } from './styles'

import type { Props, SwitchKey } from './types'
function Cloud({ isLogin, active, onToggle, onDownloaded }: Props) {
  const styles = memoStyles()

  const text = useCloudText()
  const { handleDownload, handleUpload } = useCloudSync({ isLogin, onDownloaded })

  const { focusOrigin, showLegalSource } = systemStore.setting

  const handleSwitch = useCallback((key: SwitchKey, title: string) => {
    const checked = !systemStore.setting[key]
    systemStore.switchSetting(key)

    t('设置.切换', {
      title,
      checked
    })
  }, [])

  return (
    <View style={_.mb.md}>
      {/* 同步设置 */}
      <ItemSettingBlock style={styles.container} title='同步设置' size={20}>
        <ItemSettingBlock.Item
          icon='md-ios-share'
          iconStyle={{
            transform: [
              {
                rotate: '180deg'
              }
            ]
          }}
          title='下载'
          information={text || (!isLogin ? `需${i18n.login()}` : undefined)}
          onPress={handleDownload}
        />
        <ItemSettingBlock.Item
          style={_.ml.md}
          icon='md-ios-share'
          title='上传'
          information={isLogin ? undefined : `需${i18n.login()}`}
          onPress={handleUpload}
        />
      </ItemSettingBlock>

      {/* 突出显示源头按钮 */}
      <ItemSetting
        style={styles.item}
        contentStyle={styles.content}
        hd='突出显示源头按钮'
        ft={
          <SwitchPro
            style={styles.switch}
            value={focusOrigin}
            onSyncPress={() => handleSwitch('focusOrigin', '突出源头按钮')}
          />
        }
        thumb={THUMBS}
      />

      {/* 显示正版播放源 */}
      <ItemSetting
        style={styles.item}
        contentStyle={styles.content}
        hd='显示正版播放源'
        information='若有正版播放数据，会在源头选项底部插入 acfun、bilibili、qq、iqiyi、netflix 等播放源头（数据来源自 bangumi-data）'
        ft={
          <SwitchPro
            style={styles.switch}
            value={showLegalSource}
            onSyncPress={() => handleSwitch('showLegalSource', '显示正版播放源')}
          />
        }
      />

      {/* 显示所有项 */}
      <ItemSetting
        style={styles.item}
        contentStyle={styles.content}
        hd='显示所有项'
        ft={
          <SwitchPro
            key={String(active)}
            style={styles.switch}
            value={active}
            onSyncPress={onToggle}
          />
        }
      />
    </View>
  )
}

export default observer(Cloud)
