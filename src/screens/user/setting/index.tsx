/*
 * @Author: czy0729
 * @Date: 2019-05-24 01:34:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:45:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Input, Page, ScrollView } from '@components'
import { _ } from '@stores'
import Advanced from './component/advanced'
import Block from './component/block'
import Blocks from './component/blocks'
import CDN from './component/cdn'
import Contact from './component/contact'
import Custom from './component/custom'
import DangerZone from './component/danger-zone'
import Dev from './component/dev'
import Discovery from './component/discovery'
import Home from './component/home'
import Katakana from './component/katakana'
import Lasttime from './component/lasttime'
import Origin from './component/origin'
import Rakuen from './component/rakuen'
import Route from './component/route'
import Storage from './component/storage'
import Subject from './component/subject'
import System from './component/system'
import Text from './component/text'
import Theme from './component/theme'
import Timeline from './component/timeline'
import Tinygrail from './component/tinygrail'
import Track from './component/track'
import UI from './component/ui'
import User from './component/user'
import Version from './component/version'
import Worker from './component/worker'
import Zhinan from './component/zhinan'
import { GROUPS } from './ds'
import Header from './header'
import { useSettingPage } from './hooks'
import { styles } from './styles'
import { getGroupFilter } from './utils'

import type { ReactNode } from 'react'
import type { NavigationProps } from '@types'
import type { GroupKey } from './ds'
import type { Params } from './types'

/** 设置 */
function Setting(props: NavigationProps<Params>) {
  const { filter, setFilter, open, forwardRef, onBlockRef } = useSettingPage(props)

  /**
   * 分组内的设置项
   *  - rows 接收 filter: 命中分组标题时整组展示 (传入空字符串)
   *  - 返回数组而不是 Fragment, 让 Block 能数到真实设置项个数
   * */
  const groups: {
    key: GroupKey
    rows: (filter: string) => ReactNode[]
  }[] = [
    {
      key: 'appearance',
      rows: f => [
        <Theme key='theme' filter={f} />,
        <UI key='ui' filter={f} />,
        <CDN key='cdn' filter={f} />
      ]
    },
    {
      key: 'language',
      rows: f => [<Text key='text' filter={f} />, <Katakana key='katakana' filter={f} />]
    },
    {
      key: 'filter',
      rows: f => [
        <Blocks key='blocks' filter={f} />,
        <Custom key='custom' filter={f} />,
        <Track key='track' filter={f} open={open === 'Track'} />
      ]
    },
    {
      key: 'module',
      rows: f => [
        <Discovery key='discovery' filter={f} open={open === 'Discovery'} />,
        <Timeline key='timeline' filter={f} />,
        <Home key='home' filter={f} />,
        <Rakuen key='rakuen' filter={f} />,
        <User key='user' filter={f} open={open === 'User'} />
      ]
    },
    {
      key: 'extra',
      rows: f => [
        <Route key='route' filter={f} />,
        <Subject key='subject' filter={f} open={open === 'Subject'} />,
        <Tinygrail key='tinygrail' filter={f} open={open === 'Tinygrail'} />
      ]
    },
    {
      key: 'system',
      rows: f => [
        <Storage key='storage' filter={f} />,
        <Origin key='origin' filter={f} />,
        <Worker key='worker' filter={f} open={open === 'Worker'} />,
        <Advanced key='advanced' filter={f} />
      ]
    },
    {
      key: 'about',
      rows: f => [<Contact key='contact' filter={f} />, <Zhinan key='zhinan' filter={f} />]
    }
  ]

  return (
    <Component id='screen-setting'>
      <Page style={_.select(_.container.bg, _.container.plain)}>
        <HeaderPlaceholder />

        <ScrollView forwardRef={forwardRef} contentContainerStyle={styles.container}>
          <Block>
            <Input
              style={styles.input}
              placeholder='搜索'
              defaultValue={filter}
              onChangeText={setFilter}
            />
          </Block>

          <Block>
            <Version filter={filter} />
          </Block>

          {groups.map(({ key, rows }) => (
            <Block key={key} tip={GROUPS[key]} title={key} onBlockRef={onBlockRef}>
              {rows(getGroupFilter(filter, GROUPS[key]))}
            </Block>
          ))}

          {/* 同步设置 + 账户: 同一张卡片, 固定放最后 */}
          <Block tip='同步与账户'>
            <System filter={filter} />
            <DangerZone filter={filter} />
          </Block>

          <Lasttime />
          <Dev />
        </ScrollView>
      </Page>

      <Header />
    </Component>
  )
}

export default observer(Setting)
