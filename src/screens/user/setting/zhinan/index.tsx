/*
 * @Author: czy0729
 * @Date: 2022-01-21 13:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 02:39:54
 */
import React from 'react'
import { ActionSheet, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open, appNavigate } from '@utils'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import {
  URL_FEEDBACK,
  URL_ZHINAN,
  URL_PRIVACY,
  URL_DEV,
  URL_WENJUAN,
  GITHUB_PROJECT
} from '@constants'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function Zhinan({ navigation, filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='更多' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} onClose={setFalse}>
          {/* 项目帖子 */}
          <ItemSetting
            show={shows.topic}
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

          {/* Github */}
          <ItemSetting
            show={shows.github}
            style={_.mt.xs}
            arrow
            arrowStyle={_.mr.xxs}
            arrowIcon='md-open-in-new'
            arrowSize={18}
            highlight
            filter={filter}
            onPress={() =>
              appNavigate(GITHUB_PROJECT, undefined, undefined, {
                id: '设置.跳转'
              })
            }
            {...TEXTS.github}
          >
            <Heatmap id='设置.跳转' to='WebBrowser' alias='浏览器' />
          </ItemSetting>

          {/* 使用指南 */}
          <ItemSetting
            show={shows.zhinan}
            arrow
            arrowStyle={_.mr.xxs}
            arrowIcon='md-open-in-new'
            arrowSize={18}
            highlight
            filter={filter}
            onPress={() => {
              t('设置.跳转', {
                title: '个人设置',
                to: 'Zhinan'
              })

              open(URL_ZHINAN)
            }}
            {...TEXTS.zhinan}
          >
            <Heatmap id='设置.跳转' to='Zhinan' alias='个人设置' />
          </ItemSetting>

          {/* 开发状况 */}
          <ItemSetting
            show={shows.notion}
            style={_.mt.xs}
            arrow
            arrowStyle={_.mr.xxs}
            arrowIcon='md-open-in-new'
            arrowSize={18}
            highlight
            filter={filter}
            onPress={() => {
              t('设置.跳转', {
                title: '当前开发中',
                to: 'Notion'
              })

              open(URL_DEV)
            }}
            {...TEXTS.notion}
          >
            <Heatmap id='设置.跳转' to='Notion' alias='当前开发中' />
          </ItemSetting>

          {/* 开发计划问卷 */}
          <ItemSetting
            show={shows.jihua}
            style={_.mt.xs}
            arrow
            arrowStyle={_.mr.xxs}
            arrowIcon='md-open-in-new'
            arrowSize={18}
            highlight
            filter={filter}
            onPress={() => {
              t('设置.跳转', {
                title: '开发计划',
                to: 'Jihua'
              })

              open(URL_WENJUAN)
            }}
            {...TEXTS.jihua}
          >
            <Heatmap id='设置.跳转' to='Jihua' alias='开发计划' />
          </ItemSetting>

          {/* 隐私保护政策 */}
          <ItemSetting
            show={shows.privacy}
            style={_.mt.xs}
            arrow
            arrowStyle={_.mr.xxs}
            arrowIcon='md-open-in-new'
            arrowSize={18}
            highlight
            filter={filter}
            onPress={() => {
              t('设置.跳转', {
                title: '隐私保护政策',
                to: 'Privacy'
              })

              open(URL_PRIVACY)
            }}
            {...TEXTS.privacy}
          >
            <Heatmap id='设置.跳转' to='Privacy' alias='隐私保护政策' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Zhinan
