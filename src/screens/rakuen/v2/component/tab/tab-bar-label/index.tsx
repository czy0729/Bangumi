/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 00:00:00
 *
 * TabBar 标签
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { useStore } from '@stores'
import {
  MODEL_RAKUEN_TYPE_ALL,
  MODEL_RAKUEN_TYPE_EP,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO,
  MODEL_RAKUEN_TYPE_SUBJECT,
  WEB
} from '@constants'
import { TABS } from '../../../ds'
import Label from '../label'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

/** 副文案: 去掉「我回复·」前缀, 保留「全部」等原字面用于提示可展开 */
function toSubLabel(label: string | false) {
  return String(label || '').replace(/^我回复·/, '')
}

function TabBarLabel({ route, focused }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const index = TABS.findIndex(item => item.key === route.key)

  /**
   * TabBarItem 会同时渲染 focused 的两份标签并叠放, 触摸命中的是上层那份,
   * 与 renderLabel 传进来的 focused 无关, 所以激活方式按当前页判断
   */
  const active = $.state.page === index

  /** 未选中的 tab: 点击归切换, 长按弹菜单 */
  const onPress = useCallback(() => {
    if (active) return

    $.onChange(index)
  }, [$, active, index])

  /** 菜单选择后切到目标 tab, 列表拉取由菜单回调负责 */
  const switchTab = useCallback(() => {
    if (active) return

    $.onChange(index, false)
  }, [$, active, index])

  const elPlain = (
    <Flex style={styles.label} justify='center'>
      <Text type='title' size={13} bold={focused} noWrap>
        {route.title}
      </Text>
    </Flex>
  )

  if (index < 0) return elPlain

  // Web 的菜单只有点击触发, 未选中的 tab 不挂菜单, 保留点击切换
  if (WEB && !active) return elPlain

  const menuProps = {
    focused,
    activateOn: active ? undefined : ('hold' as const),
    onPress: active ? undefined : onPress
  }

  if (route.title === '全部') {
    return (
      <Label
        {...menuProps}
        model={MODEL_RAKUEN_TYPE_ALL}
        label='全部'
        value={$.state.all}
        subLabel={toSubLabel(MODEL_RAKUEN_TYPE_ALL.getLabel($.state.all))}
        onSelect={title => {
          switchTab()
          $.onAllMenuPress(title)
        }}
      />
    )
  }

  if (route.title === '小组') {
    return (
      <Label
        {...menuProps}
        model={MODEL_RAKUEN_TYPE_GROUP}
        label='小组'
        value={$.state.group}
        onSelect={title => {
          switchTab()
          $.onGroupMenuPress(title)
        }}
      />
    )
  }

  if (route.title === '条目') {
    return (
      <Label
        {...menuProps}
        model={MODEL_RAKUEN_TYPE_SUBJECT}
        label='条目'
        value={$.state.subject}
        onSelect={title => {
          switchTab()
          $.onSubjectMenuPress(title)
        }}
      />
    )
  }

  if (route.title === '章节') {
    return (
      <Label
        {...menuProps}
        model={MODEL_RAKUEN_TYPE_EP}
        label='章节'
        value={$.state.ep}
        onSelect={title => {
          switchTab()
          $.onEpMenuPress(title)
        }}
      />
    )
  }

  if (route.title === '人物') {
    return (
      <Label
        {...menuProps}
        model={MODEL_RAKUEN_TYPE_MONO}
        label='人物'
        value={$.state.mono}
        subLabel={toSubLabel(MODEL_RAKUEN_TYPE_MONO.getLabel($.state.mono))}
        onSelect={title => {
          switchTab()
          $.onMonoMenuPress(title)
        }}
      />
    )
  }

  return elPlain
}

export default observer(TabBarLabel)
