/*
 * @Author: czy0729
 * @Date: 2022-01-21 13:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-19 21:32:09
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { URL_PRIVACY } from '@constants'

function Zhinan() {
  return (
    <>
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

          open('https://www.yuque.com/chenzhenyu-k0epm/znygb4')
        }}
      >
        <Heatmap id='设置.跳转' to='Zhinan' alias='个人设置' />
      </ItemSetting>
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

          open(
            'https://adaptable-playroom-795.notion.site/2f26b642dc714c4ca4d3e8701072c591?v=fe42d34dbb354e28b5221078780f93bd'
          )
        }}
      >
        <Heatmap id='设置.跳转' to='Notion' alias='当前开发中' />
      </ItemSetting>
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

          open('https://wj.qq.com/s2/9645600/92c2/')
        }}
      >
        <Heatmap id='设置.跳转' to='Jihua' alias='开发计划' />
      </ItemSetting>
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
    </>
  )
}

export default ob(Zhinan)
