/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 18:34:13
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { APP_ID_SAY_DEVELOP } from '@constants'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function Contact({ navigation, filter }) {
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        {/* 反馈 */}
        <ItemSetting
          show={shows.say}
          arrow
          filter={filter}
          highlight
          onPress={() => {
            t('设置.跳转', {
              to: 'Say'
            })

            navigation.push('Say', {
              id: APP_ID_SAY_DEVELOP,
              sayId: APP_ID_SAY_DEVELOP
            })
          }}
          {...TEXTS.say}
        >
          <Heatmap id='设置.跳转' to='Say' alias='吐槽' />
        </ItemSetting>

        {/* 投食🍚 */}
        <ItemSetting
          show={shows.qiafan}
          hd={userStore.isLimit ? '关于' : '投食🍚'}
          arrow
          highlight
          information={systemStore.advance && '已收到巨款，您已成为高级会员，感谢支持'}
          informationType='success'
          filter={filter}
          ft='23-04-20'
          onPress={() => {
            t('设置.跳转', {
              to: 'Qiafan'
            })

            navigation.push('Qiafan')
          }}
        >
          <Heatmap id='设置.跳转' to='Qiafan' alias='投食' />
        </ItemSetting>

        {/* 赞助者 */}
        <ItemSetting
          show={shows.advance}
          arrow
          highlight
          filter={filter}
          {...TEXTS.advance}
          onPress={() => {
            t('设置.跳转', {
              to: 'Sponsor'
            })

            navigation.push('Sponsor')
          }}
        >
          <Heatmap id='设置.跳转' to='Sponsor' alias='赞助者' />
        </ItemSetting>
      </>
    )
  })
}

export default Contact
