/*
 * @Author: czy0729
 * @Date: 2023-04-27 16:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 00:43:36
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { show } = $.state
  return (
    <HeaderV2
      title='DOLLARS'
      hm={HM}
      headerRight={() => (
        <>
          {!show && $.state.visibleBottom >= _.window.height * 2 && (
            <IconTouchable
              style={_.mr.xs}
              name='md-keyboard-arrow-up'
              size={28}
              color={_.colorTitle}
              onPress={$.scrollToTop}
            />
          )}
          <IconTouchable
            style={_.mr.xs}
            name={show ? 'md-close' : 'md-edit'}
            size={show ? 20 : 16}
            color={_.colorTitle}
            onPress={$.onToggleShow}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
