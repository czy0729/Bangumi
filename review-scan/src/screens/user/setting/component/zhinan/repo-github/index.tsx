/*
 * @Author: czy0729
 * @Date: 2024-04-26 04:59:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 05:13:39
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { useObserver } from '@utils/hooks'
import { GITHUB_PROJECT } from '@constants'
import { TEXTS } from '../ds'

/** Github */
function RepoGithub({ filter }) {
  return useObserver(() => (
    <ItemSetting
      style={_.mt.xs}
      arrow
      arrowStyle={_.mr.xxs}
      arrowIcon='md-open-in-new'
      arrowSize={18}
      highlight
      filter={filter}
      onPress={() => {
        appNavigate(GITHUB_PROJECT, undefined, undefined, {
          id: '设置.跳转'
        })
      }}
      {...TEXTS.github}
    >
      <Heatmap id='设置.跳转' to='WebBrowser' alias='浏览器' />
    </ItemSetting>
  ))
}

export default RepoGithub
