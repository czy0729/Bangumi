/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:27:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 22:38:04
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ItemSettingBlock } from '@_'
import { _, userStore } from '@stores'
import i18n from '@constants/i18n'
import { IconCloud, IconDownload, IconRefresh, IconUpload } from '../../icons'
import { useCloud } from '../hooks'
import { handleDownload, handleRestore, handleUpload } from '../utils'

import type { WithFilterProps } from '../../../types'

/** 同步设置 */
function SyncSetting({ filter }: WithFilterProps) {
  const text = useCloud()

  return (
    <ItemSettingBlock
      icon={<IconCloud />}
      title={`同步${i18n.setting()}`}
      information={`同步${i18n.setting()}、超展开${i18n.setting()}、自定义放送数据`}
      filter={filter}
    >
      <ItemSettingBlock.Item
        icon={<IconDownload />}
        title='下载'
        information={
          text || ((!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`)
        }
        filter={filter}
        onPress={handleDownload}
      />
      <ItemSettingBlock.Item
        style={_.ml.md}
        icon={<IconUpload />}
        title='上传'
        information={(!userStore.isLogin || !userStore.userInfo.id) && `需${i18n.login()}`}
        filter={filter}
        onPress={handleUpload}
      />
      <ItemSettingBlock.Item
        style={_.ml.md}
        icon={<IconRefresh />}
        title={`恢复${i18n.initial()}`}
        filter={filter}
        onPress={handleRestore}
      />
    </ItemSettingBlock>
  )
}

export default observer(SyncSetting)
