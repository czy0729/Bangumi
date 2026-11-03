/*
 * @Author: czy0729
 * @Date: 2024-04-25 04:15:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 */
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { TEXTS } from '../ds'
import { IconWifi } from '../../icons'

import type { Props } from './types'

/** 网络探针 */
function ServerStatus({ filter, setFalse }: Props) {
  const navigation = useNavigation()

  return (
    <ItemSetting
      icon={<IconWifi />}
      arrow
      highlight
      filter={filter}
      onPress={() => {
        setFalse()

        /** 等弹层收起再推页, 否则返回时弹层还在 */
        setTimeout(() => {
          navigation.push('ServerStatus')
        }, 240)

        t('设置.跳转', {
          title: '网络探针',
          to: 'ServerStatus'
        })
      }}
      {...TEXTS.serverStatus}
    >
      <Heatmap id='设置.跳转' to='ServerStatus' alias='网络探针' />
    </ItemSetting>
  )
}

export default observer(ServerStatus)
