/*
 * @Author: czy0729
 * @Date: 2024-04-26 04:43:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:56:55
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { appNavigate } from '@utils'
import { useObserver } from '@utils/hooks'
import { URL_FEEDBACK } from '@constants'
import { TEXTS } from '../ds'

/** 项目帖子 */
function RepoTopic({ navigation, filter, setFalse }) {
  return useObserver(() => (
    <ItemSetting
      arrow
      highlight
      filter={filter}
      onPress={() => {
        setFalse()
        setTimeout(() => {
          appNavigate(URL_FEEDBACK, navigation, undefined, {
            id: '设置.跳转'
          })
        }, 160)
      }}
      {...TEXTS.topic}
    >
      <Heatmap id='设置.跳转' to='Topic' alias='帖子' />
    </ItemSetting>
  ))
}

export default RepoTopic
