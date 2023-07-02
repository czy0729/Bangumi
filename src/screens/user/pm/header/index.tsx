/*
 * @Author: czy0729
 * @Date: 2022-08-19 11:16:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 11:21:30
 */
import React from 'react'
import { Header as CompHeader, Flex, Heatmap } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { list } = $.pmDetail

  let title = ''
  try {
    title = list?.[0]?.content?.match(/<strong>(.*?)<\/strong>/)?.[1]
    if (title) title = decoder(title)
  } catch (error) {}

  return (
    <CompHeader
      title={`短信${list.length ? ` (${list.length})` : ''}${
        title ? ` · ${title}` : ''
      }`}
      hm={['pm', 'PM']}
      headerTitleAlign='left'
      headerRight={() => (
        <Flex>
          {list.length >= 10 && (
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
                t('短信.右上角菜单', { key })
                open($.url)
              }
            }}
          >
            <Heatmap id='短信.右上角菜单' />
          </CompHeader.Popover>
        </Flex>
      )}
    />
  )
}

export default obc(Header)
