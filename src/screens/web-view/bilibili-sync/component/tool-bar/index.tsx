/*
 * @Author: czy0729
 * @Date: 2022-04-27 19:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 列表工具栏: 隐藏未匹配 / 隐藏看过 / 隐藏相同 / 私密开关
 */
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, ToolBar as ToolBarComp } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ToolBar() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ToolBarComp>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('hideNotMatched')}>
        <Text size={11} bold>
          隐藏未匹配
        </Text>
        {$.state.hideNotMatched && (
          <Iconfont style={stl(_.ml.xs, _.mr._xs)} name='md-check' size={11} color={_.colorDesc} />
        )}
      </ToolBarComp.Touchable>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('hideWatched')}>
        <Flex>
          <Text size={11} bold>
            隐藏看过
          </Text>
          {$.state.hideWatched && (
            <Iconfont style={stl(_.ml.xs, _.mr._xs)} name='md-check' size={11} color={_.colorDesc} />
          )}
        </Flex>
      </ToolBarComp.Touchable>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('hideSame')}>
        <Text size={11} bold>
          隐藏相同
        </Text>
        {$.state.hideSame && (
          <Iconfont style={stl(_.ml.xs, _.mr._xs)} name='md-check' size={11} color={_.colorDesc} />
        )}
      </ToolBarComp.Touchable>
      <ToolBarComp.Touchable onSelect={() => $.onToggle('privacy')}>
        <Text size={11} bold>
          {$.state.privacy ? '私密' : '公开'}
        </Text>
      </ToolBarComp.Touchable>
    </ToolBarComp>
  )
}

export default observer(ToolBar)
