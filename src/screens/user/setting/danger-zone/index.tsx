/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:08:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 07:22:43
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { ItemSetting } from '@_'
import Stores, { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function DangerZone({ navigation, filter }) {
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting
          show={shows.logout}
          style={_.mt.sm}
          hd={
            <Text type='danger' size={16} bold>
              {i18n.logout()}
            </Text>
          }
          arrow
          highlight
          filter={filter}
          onPress={() => {
            t('设置.退出登陆')
            Stores.logout(navigation)
          }}
        >
          <Heatmap id='设置.退出登陆' />
        </ItemSetting>
      </>
    )
  })
}

export default DangerZone
