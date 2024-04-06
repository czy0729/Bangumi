/*
 * @Author: czy0729
 * @Date: 2023-04-27 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 12:56:59
 */
import React from 'react'
import { Flex, Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(props, { $ }: Ctx) {
  const { show } = $.state
  return (
    <CompHeader
      title='DOLLARS'
      hm={['dollars', 'Dollars']}
      headerRight={() => (
        <Flex>
          {!show && $.state.visibleBottom >= _.window.height * 2 && (
            <IconTouchable
              style={_.mr.xs}
              name='md-keyboard-arrow-up'
              size={28}
              color={_.colorTitle}
              onPress={() => {
                $.scrollToTop(true)
              }}
            />
          )}
          <IconTouchable
            style={_.mr.xs}
            name={show ? 'md-close' : 'md-edit'}
            size={show ? 20 : 16}
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

export default obc(Header, COMPONENT)
