/*
 * @Author: czy0729
 * @Date: 2022-10-17 13:58:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 14:06:01
 */
import React from 'react'
import { Flex, Iconfont, Text, ToolBar as ToolBarComp } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function ToolBar(props, { $ }: Ctx) {
  const { hideWatched, hideSame, hideNotMatched, noCommentUseCreateDate, scoreMinuesOne, privacy } =
    $.state
  return (
    <>
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
            隐藏相同状态
          </Text>
          {hideSame && (
            <Iconfont style={[_.ml.xs, _.mr._xs]} name='md-check' size={11} color={_.colorDesc} />
          )}
        </ToolBarComp.Touchable>
      </ToolBarComp>
      <ToolBarComp>
        <ToolBarComp.Touchable onSelect={() => $.onToggle('noCommentUseCreateDate')}>
          <Text size={11} bold>
            创建时间作为评论
          </Text>
          {noCommentUseCreateDate && (
            <Iconfont style={[_.ml.xs, _.mr._xs]} name='md-check' size={11} color={_.colorDesc} />
          )}
        </ToolBarComp.Touchable>
        <ToolBarComp.Touchable onSelect={() => $.onToggle('scoreMinuesOne')}>
          <Text size={11} bold>
            评分 -1
          </Text>
          {scoreMinuesOne && (
            <Iconfont style={[_.ml.xs, _.mr._xs]} name='md-check' size={11} color={_.colorDesc} />
          )}
        </ToolBarComp.Touchable>
        <ToolBarComp.Touchable onSelect={() => $.onToggle('privacy')}>
          <Text size={11} bold>
            同步时{privacy ? '私密' : '公开'}
          </Text>
        </ToolBarComp.Touchable>
      </ToolBarComp>
    </>
  )
}

export default obc(ToolBar)
