/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:08:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 21:59:11
 */
import React from 'react'
import { Heatmap, Text } from '@components'
import { ItemSetting } from '@_'
import Stores from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import i18n from '@constants/i18n'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

/** 谨慎操作 */
function DangerZone({ navigation, filter }) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (WEB || !shows) return null

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
