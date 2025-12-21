/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:53:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:36:35
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { Ctx } from '../types'
import { HM } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const { hide } = $.state
  return (
    <HeaderV2
      title='bilibili 同步'
      hm={HM}
      headerRight={() => (
        <>
          <IconTouchable
            style={_.mr.xs}
            name={hide ? 'md-refresh' : 'md-close'}
            color={_.colorDesc}
            onPress={$.onToggleHide}
          />
          <IconTouchable
            name='md-info-outline'
            color={_.colorDesc}
            size={19}
            onPress={() => {
              navigation.push('Information', {
                title: 'bilibili 同步',
                message: [
                  `此功能涉及到第三方平台${i18n.login()}，作者保证不会窃取任何个人数据，若有异议请勿使用。`,
                  '因自动对比的数据存在较大的出错可能，目前不打算做一键提交功能，请手动核实后自行提交。',
                  '部分(僅限港澳台地區)的番剧做了最低限度的模糊匹配，若连翻译名称都不一样的基本没可能匹配成功。',
                  '网页版不存在此功能，所以此为高级会员功能。此功能开发不易，目前暂时对所有用户开放，觉得有用可支持一下。'
                ],
                advance: true
              })

              t('bili同步.关于')
            }}
          />
        </>
      )}
    />
  )
}

export default ob(Header)
