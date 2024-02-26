/*
 * @Author: czy0729
 * @Date: 2022-03-11 18:03:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:55:12
 */
import React from 'react'
import { Flex, Header as CompHeader, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { NEWS } from '@constants'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { useWebView } = $.state
  return (
    <CompHeader
      title='二次元资讯'
      alias='Anitama'
      hm={['discovery/anitama', 'Anitama']}
      headerRight={() => (
        <Flex>
          <IconTouchable
            style={_.mr.xs}
            name={useWebView ? 'md-radio-button-on' : 'md-radio-button-off'}
            size={20}
            color={_.colorDesc}
            onPress={$.toggleUseWebView}
          />
          <CompHeader.Popover
            name='md-menu'
            data={[...NEWS.map(item => item.label), '浏览器查看']}
            onSelect={key => {
              t('Anitama.右上角菜单', {
                key
              })

              switch (key) {
                case '浏览器查看':
                  open($.url)
                  break

                default:
                  $.toggleType(key)
                  break
              }
            }}
          >
            <Heatmap id='Anitama.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
