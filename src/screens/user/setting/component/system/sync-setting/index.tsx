/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:27:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 04:29:15
 */
import React from 'react'
import { ItemSettingBlock } from '@_'
import { _, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { useCloud } from '../hooks'
import { handleDownload, handleRestore, handleUpload } from '../utils'

/** 同步设置 */
function SyncSetting({ filter }) {
  const text = useCloud()

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      title={`同步${i18n.setting()}`}
      information={`同步${i18n.setting()}、超展开${i18n.setting()}、自定义放送数据`}
      filter={filter}
    >
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
        information={
          text || ((!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`)
        }
        filter={filter}
        onPress={handleDownload}
      />
      <ItemSettingBlock.Item
        style={_.ml.md}
        icon='md-ios-share'
        title='上传'
        information={(!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`}
        filter={filter}
        onPress={handleUpload}
      />
      <ItemSettingBlock.Item
        style={_.ml.md}
        icon='md-refresh'
        title={`恢复${i18n.initial()}`}
        filter={filter}
        onPress={handleRestore}
      />
    </ItemSettingBlock>
  ))
}

export default SyncSetting
