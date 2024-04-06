/*
 * @Author: czy0729
 * @Date: 2022-03-11 01:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 22:06:41
 */
import React from 'react'
import { Header as HeaderComp, Heatmap } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE, SUBJECT_TYPE } from '@constants'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $, navigation }: Ctx) {
  return (
    <HeaderComp
      title={`${$.typeCn}频道`}
      alias='频道'
      hm={[$.url, 'Channel']}
      headerRight={() => (
        <HeaderComp.Popover
          name='md-menu'
          data={[...SUBJECT_TYPE.map(item => item.title), '浏览器查看']}
          onSelect={key => {
            t('频道.右上角菜单', {
              key
            })

            switch (key) {
              case '浏览器查看':
                open($.url)
                break

              default:
                setTimeout(() => {
                  navigation.setOptions({
                    title: `${key}频道`
                  })
                  $.toggleType(MODEL_SUBJECT_TYPE.getLabel(key))
                }, 40)
                break
            }
          }}
        >
          <Heatmap id='频道.右上角菜单' />
        </HeaderComp.Popover>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
