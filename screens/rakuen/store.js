/*
 * @Author: czy0729
 * @Date: 2019-04-27 14:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-13 18:09:32
 */
import React from 'react'
import { observable, computed } from 'mobx'
import deepmerge from 'deepmerge'
import { Text } from '@components'
import { Popover } from '@screens/_'
import { systemStore, rakuenStore, userStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import {
  MODEL_RAKUEN_SCOPE,
  MODEL_RAKUEN_TYPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO
} from '@constants/model'

export const tabs = MODEL_RAKUEN_TYPE.data.map(item => ({
  title: item.label
}))
const namespace = 'ScreenRakuen'

export default class ScreenRakuen extends store {
  state = observable({
    scope: MODEL_RAKUEN_SCOPE.getValue('全局聚合'),
    page: 0, // <Tabs>当前页数
    group: MODEL_RAKUEN_TYPE_GROUP.getValue('全部'), // 小组菜单
    mono: MODEL_RAKUEN_TYPE_MONO.getValue('全部'), // 人物菜单
    _page: 0, // header上的假<Tabs>当前页数
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })

    const { page } = this.state
    const type = this.type(page)
    const { _loaded } = this.rakuen(type)
    if (!_loaded || this.autoFetch) {
      this.fetchRakuen(true)
    }

    return res
  }

  // -------------------- get --------------------
  @computed get autoFetch() {
    return systemStore.setting.autoFetch
  }

  @computed get notifyUnread() {
    return rakuenStore.notify.unread
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  rakuen(type) {
    const { scope } = this.state
    return computed(() => rakuenStore.rakuen(scope, type)).get()
  }

  /**
   * 帖子历史查看记录
   */
  readed(topicId) {
    return computed(() => rakuenStore.readed(topicId)).get()
  }

  /**
   * 计算实际type
   * @param {*} page
   */
  type(page) {
    return computed(() => {
      const { title } = tabs[page]
      if (title === '小组') {
        const { group } = this.state
        const label = MODEL_RAKUEN_TYPE_GROUP.getLabel(group)
        return MODEL_RAKUEN_TYPE_GROUP.getValue(label)
      }

      if (title === '人物') {
        const { mono } = this.state
        const label = MODEL_RAKUEN_TYPE_MONO.getLabel(mono)
        return MODEL_RAKUEN_TYPE_MONO.getValue(label)
      }

      return MODEL_RAKUEN_TYPE.getValue(title)
    }).get()
  }

  /**
   * 带副标题的Tabs数据
   */
  @computed get tabs() {
    const { page } = this.state
    const _tabs = deepmerge([], tabs)
    _tabs.forEach(({ title }, index) => {
      _tabs[index]._title = title

      // 当前是有子菜单的, 才显示子菜单信息
      if (title === '小组' && tabs[page].title === '小组') {
        const { group } = this.state
        _tabs[index].title = (
          <Popover
            data={MODEL_RAKUEN_TYPE_GROUP.data.map(item => item.label)}
            onSelect={this.onGroupMenuPress}
          >
            <Text size={10} type='sub' lineHeight={14}>
              <Text size={14}>小组</Text>{' '}
              {MODEL_RAKUEN_TYPE_GROUP.getLabel(group)}
            </Text>
          </Popover>
        )
      } else if (title === '人物' && tabs[page].title === '人物') {
        const { mono } = this.state
        _tabs[index].title = (
          <Popover
            data={MODEL_RAKUEN_TYPE_MONO.data.map(item => item.label)}
            onSelect={this.onMonoMenuPress}
          >
            <Text size={10} type='sub' lineHeight={14}>
              <Text size={14}>人物</Text>{' '}
              {MODEL_RAKUEN_TYPE_MONO.getLabel(mono)}
            </Text>
          </Popover>
        )
      } else {
        _tabs[index].title = (
          <Text size={10} type='sub' lineHeight={14}>
            <Text size={14}>{title}</Text>
          </Text>
        )
      }
    })
    return _tabs
  }

  /**
   * 是否屏蔽默认头像用户帖子
   */
  @computed get setting() {
    return rakuenStore.setting
  }

  // -------------------- fetch --------------------
  fetchRakuen = refresh => {
    const { scope, page } = this.state
    const type = this.type(page)
    return rakuenStore.fetchRakuen({ scope, type }, refresh)
  }

  // -------------------- page --------------------
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page
    })

    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
    }, 400)
    this.shouldFetchRakuen(page)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    this.setState({
      page,
      _page: page
    })
    this.shouldFetchRakuen(page)
  }

  shouldFetchRakuen = page => {
    const { _loaded, list } = this.rakuen(this.type(page))
    if (!_loaded || list.length === 0) {
      this.fetchRakuen(true)
    }
    this.setStorage(undefined, undefined, namespace)
  }

  onGroupMenuPress = title => {
    this.setState({
      group: MODEL_RAKUEN_TYPE_GROUP.getValue(title)
    })
    this.fetchRakuen(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onMonoMenuPress = title => {
    this.setState({
      mono: MODEL_RAKUEN_TYPE_MONO.getValue(title)
    })
    this.fetchRakuen(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onItemPress = (topicId, replies) => {
    rakuenStore.updateTopicReaded(topicId, replies)
  }

  onExtraSelect = (title, value, navigation) => {
    switch (title) {
      case '屏蔽小组':
        rakuenStore.addBlockGroup(value)
        info(`已屏蔽 ${value}`)
        break
      default:
        console.log(title, value)
        break
    }
  }
}
