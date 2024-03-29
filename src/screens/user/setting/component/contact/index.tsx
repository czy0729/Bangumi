/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-26 04:56:34
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore, userStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { APP_ID_SAY_DEVELOP, TEXT_UPDATE_QIAFAN } from '@constants'
import { getShows } from '../../utils'
import { COMPONENT, TEXTS } from './ds'

function Contact({ navigation, filter }) {
  r(COMPONENT)

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
          ft={TEXT_UPDATE_QIAFAN}
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

        {/* 更新内容 */}
        <ItemSetting
          hd='更新内容'
          arrow
          highlight
          filter={filter}
          onPress={() => {
            navigation.push('Versions')
          }}
        />

        {/* 特色功能 */}
        <ItemSetting
          hd='特色功能'
          arrow
          highlight
          filter={filter}
          onPress={() => {
            navigation.push('Tips')
          }}
        />
      </>
    )
  })
}

export default Contact
