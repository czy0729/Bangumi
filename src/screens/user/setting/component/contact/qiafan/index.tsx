/*
 * @Author: czy0729
 * @Date: 2024-04-23 20:52:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-13 22:31:45
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXT_UPDATE_QIAFAN } from '@constants'

/** 投食🍚 */
function Qiafan({ navigation, filter }) {
  return useObserver(() => {
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
  })
}

export default Qiafan
