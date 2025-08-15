/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:44:33
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const { hide } = $.state
  return (
    <HeaderV2
      title='豆瓣同步'
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
                title: '豆瓣同步',
                message: [
                  `此功能目前为实验性质。`,
                  '请点击旁边的刷新按钮根据提示完成数据获取，然后开始同步数据。',
                  '因自动对比的数据存在较大的出错可能，目前不打算做一键提交功能，请手动核实后自行提交。',
                  '网页版不存在此功能，所以此为高级会员功能。此功能开发不易，目前暂时对所有用户开放，觉得有用可支持一下。'
                ],
                advance: true
              })

              t('豆瓣同步.关于')
            }}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
