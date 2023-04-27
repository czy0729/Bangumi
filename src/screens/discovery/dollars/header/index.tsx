/*
 * @Author: czy0729
 * @Date: 2023-04-27 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 18:27:41
 */
import React from 'react'
import { Header as CompHeader, Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { visibleBottom } = $.state
  return (
    <CompHeader
      title='DOLLARS'
      hm={['dollars', 'Dollars']}
      headerRight={() => (
        <Flex>
          {visibleBottom >= _.window.height * 2 && (
            <IconTouchable
              style={_.mr.xs}
              name='md-keyboard-arrow-up'
              size={24}
              color={_.colorTitle}
              onPress={() => {
                $.scrollToTop(true)
              }}
            />
          )}
          {/* <IconTouchable
            style={_.mr.xxs}
            name='md-keyboard-arrow-down'
            size={24}
            color={_.colorTitle}
            onPress={() => {
              $.scrollToBottom(true)
            }}
          /> */}
          <IconTouchable
            style={_.mr.xs}
            name='md-edit'
            size={16}
            color={_.colorTitle}
            onPress={() => {
              $.onToggleShow()
            }}
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header)
