/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:08:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 19:19:48
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { ItemSetting } from '@_'
import Stores, { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'

function DangerZone({ navigation }) {
  return useObserver(() => {
    return (
      <>
        <ItemSetting
          style={_.mt.sm}
          hd={
            <Text type='danger' size={16} bold>
              退出登录
            </Text>
          }
          arrow
          highlight
          onPress={() => {
            t('设置.退出登录')
            Stores.logout(navigation)
          }}
        >
          <Heatmap id='设置.退出登录' />
        </ItemSetting>
      </>
    )
  })
}

export default DangerZone
