/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:52:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:17:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { TEXT_UPDATE_QIAFAN } from '@constants'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

/** 投食🍚 */
function Qiafan({ navigation, filter }: WithNavigation<WithFilterProps>) {
  let amount = 0
  if (systemStore.advance) {
    amount = systemStore.advanceAmount(userStore.myUserId, userStore.myId)
  }

  return (
    <ItemSetting
      hd={userStore.isLimit ? '关于' : '投食🍚'}
      arrow
      highlight
      information={
        systemStore.advance &&
        `已收到巨款${amount ? ` (¥${amount})` : ''}，已成为高级用户，感谢支持`
      }
      informationStyle={{
        paddingRight: _.sm
      }}
      informationType='success'
      filter={filter}
      ft={
        <Text type='sub' bold>
          {TEXT_UPDATE_QIAFAN}
        </Text>
      }
      onPress={() => {
        navigation.push('Qiafan')

        t('设置.跳转', {
          to: 'Qiafan'
        })
      }}
    >
      <Heatmap id='设置.跳转' to='Qiafan' alias='投食' />
    </ItemSetting>
  )
}

export default observer(Qiafan)
