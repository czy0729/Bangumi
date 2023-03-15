/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:08:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-14 21:46:01
 */
import React from 'react'
import { Text, Heatmap } from '@components'
import { ItemSetting } from '@_'
import Stores from '@stores'
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
