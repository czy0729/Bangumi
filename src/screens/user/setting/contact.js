/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 16:40:16
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { systemStore, userStore } from '@stores'
import { appNavigate } from '@utils'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { APP_ID_SAY_DEVELOP, URL_FEEDBACK, GITHUB_PROJECT } from '@constants'

function Contact({ navigation }) {
  return useObserver(() => {
    return (
      <>
        <ItemSetting
          hd='反馈'
          arrow
          highlight
          information='欢迎提BUG提需求'
          onPress={() => {
            t('设置.跳转', {
              to: 'Say'
            })

            navigation.push('Say', {
              id: APP_ID_SAY_DEVELOP
            })
          }}
        >
          <Heatmap id='设置.跳转' to='Say' alias='吐槽' />
        </ItemSetting>
        <ItemSetting
          hd='项目帖子'
          arrow
          highlight
          onPress={() =>
            appNavigate(URL_FEEDBACK, navigation, undefined, {
              id: '设置.跳转'
            })
          }
        >
          <Heatmap id='设置.跳转' to='Topic' alias='帖子' />
        </ItemSetting>
        <ItemSetting
          hd='Github'
          arrow
          highlight
          information='欢迎⭐️'
          onPress={() =>
            appNavigate(GITHUB_PROJECT, undefined, undefined, {
              id: '设置.跳转'
            })
          }
        >
          <Heatmap id='设置.跳转' to='WebBrowser' alias='浏览器' />
        </ItemSetting>
        <ItemSetting
          hd={userStore.isLimit ? '关于' : '投食🍚'}
          arrow
          highlight
          information={systemStore.advance && '已收到巨款，您已成为高级会员，感谢支持'}
          informationType='success'
          onPress={() => {
            t('设置.跳转', {
              to: 'Qiafan'
            })
            navigation.push('Qiafan')
          }}
        >
          <Heatmap id='设置.跳转' to='Qiafan' alias='投食' />
        </ItemSetting>
      </>
    )
  })
}

export default Contact
