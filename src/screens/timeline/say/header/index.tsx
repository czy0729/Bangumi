/*
 * @Author: czy0729
 * @Date: 2022-03-16 00:00:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:16:20
 */
import React from 'react'
import { Flex, Header as CompHeader, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { STORYBOOK } from '@constants'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  const { list } = $.say
  const date = list[list.length - 1]?.date
  return (
    <CompHeader
      title={
        $.isNew ? '新吐槽' : `吐槽 (${list.length})${date ? ` · ${date.split(' ')?.[0]}` : ''}`
      }
      alias='吐槽'
      hm={[$.url, 'Say']}
      headerTitleAlign='left'
      headerRight={() => {
        if ($.isNew) return null

        return (
          <Flex>
            {!STORYBOOK && list.length >= 10 && (
              <>
                <IconTouchable
                  style={_.mr._xs}
                  name='md-keyboard-arrow-up'
                  size={24}
                  color={_.colorTitle}
                  onPress={() => {
                    $.scrollToTop($.scrollViewRef, true)
                  }}
                />
                <IconTouchable
                  name='md-keyboard-arrow-down'
                  size={24}
                  color={_.colorTitle}
                  onPress={() => {
                    $.scrollToBottom($.scrollViewRef, true)
                  }}
                />
              </>
            )}
            <CompHeader.Popover
              data={['浏览器查看']}
              onSelect={key => {
                if (key === '浏览器查看') {
                  t('吐槽.右上角菜单', { key })
                  open($.url)
                }
              }}
            >
              <Heatmap id='吐槽.右上角菜单' />
            </CompHeader.Popover>
          </Flex>
        )
      }}
    />
  )
}

export default obc(Header, COMPONENT)
