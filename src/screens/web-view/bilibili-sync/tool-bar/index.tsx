/*
 * @Author: czy0729
 * @Date: 2022-04-27 19:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 19:36:21
 */
import React from 'react'
import { Flex, Iconfont, Text, ToolBar as ToolBarComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function ToolBar(props, { $ }: Ctx) {
  const { hideWatched, hideSame, hideNotMatched, privacy } = $.state
  return (
    <ToolBarComp>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('hideNotMatched')}>
        <Text size={11} bold>
          隐藏未匹配
        </Text>
        {hideNotMatched && (
          <Iconfont style={[_.ml.xs, _.mr._xs]} name='md-check' size={11} color={_.colorDesc} />
        )}
      </ToolBarComp.Touchable>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('hideWatched')}>
        <Flex>
          <Text size={11} bold>
            隐藏看过
          </Text>
          {hideWatched && (
            <Iconfont style={[_.ml.xs, _.mr._xs]} name='md-check' size={11} color={_.colorDesc} />
          )}
        </Flex>
      </ToolBarComp.Touchable>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('hideSame')}>
        <Text size={11} bold>
          隐藏相同
        </Text>
        {hideSame && (
          <Iconfont style={[_.ml.xs, _.mr._xs]} name='md-check' size={11} color={_.colorDesc} />
        )}
      </ToolBarComp.Touchable>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('privacy')}>
        <Text size={11} bold>
          {privacy ? '私密' : '公开'}
        </Text>
      </ToolBarComp.Touchable>
    </ToolBarComp>
  )
}

export default obc(ToolBar)
