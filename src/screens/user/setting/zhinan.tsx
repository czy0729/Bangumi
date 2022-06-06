/*
 * @Author: czy0729
 * @Date: 2022-01-21 13:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-07 05:11:48
 */
import React from 'react'
import { ActionSheet, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open, appNavigate } from '@utils'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import {
  URL_ZHINAN,
  URL_PRIVACY,
  URL_DEV,
  URL_WENJUAN,
  GITHUB_PROJECT
} from '@constants'

function Zhinan() {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => (
    <>
      <ItemSetting hd='更多' arrow highlight onPress={setTrue} />
      <ActionSheet show={state} onClose={setFalse}>
        {/* Github */}
        <ItemSetting
          hd='Github'
          arrow
          arrowStyle={_.mr.xxs}
          arrowIcon='md-open-in-new'
          arrowSize={18}
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

        {/* 使用指南 */}
        <ItemSetting
          hd='使用指南'
          arrow
          arrowStyle={_.mr.xxs}
          arrowIcon='md-open-in-new'
          arrowSize={18}
          highlight
          onPress={() => {
            t('设置.跳转', {
              title: '个人设置',
              to: 'Zhinan'
            })

            open(URL_ZHINAN)
          }}
        >
          <Heatmap id='设置.跳转' to='Zhinan' alias='个人设置' />
        </ItemSetting>

        {/* 开发状况 */}
        <ItemSetting
          style={_.mt.xs}
          hd='开发状况'
          arrow
          arrowStyle={_.mr.xxs}
          arrowIcon='md-open-in-new'
          arrowSize={18}
          highlight
          onPress={() => {
            t('设置.跳转', {
              title: '当前开发中',
              to: 'Notion'
            })

            open(URL_DEV)
          }}
        >
          <Heatmap id='设置.跳转' to='Notion' alias='当前开发中' />
        </ItemSetting>

        {/* 开发计划问卷 */}
        <ItemSetting
          style={_.mt.xs}
          hd='开发计划问卷'
          arrow
          arrowStyle={_.mr.xxs}
          arrowIcon='md-open-in-new'
          arrowSize={18}
          highlight
          onPress={() => {
            t('设置.跳转', {
              title: '开发计划',
              to: 'Jihua'
            })

            open(URL_WENJUAN)
          }}
        >
          <Heatmap id='设置.跳转' to='Jihua' alias='开发计划' />
        </ItemSetting>

        {/* 隐私保护政策 */}
        <ItemSetting
          style={_.mt.xs}
          hd='隐私保护政策'
          arrow
          arrowStyle={_.mr.xxs}
          arrowIcon='md-open-in-new'
          arrowSize={18}
          highlight
          onPress={() => {
            t('设置.跳转', {
              title: '隐私保护政策',
              to: 'Privacy'
            })

            open(URL_PRIVACY)
          }}
        >
          <Heatmap id='设置.跳转' to='Privacy' alias='隐私保护政策' />
        </ItemSetting>
      </ActionSheet>
    </>
  ))
}

export default Zhinan
