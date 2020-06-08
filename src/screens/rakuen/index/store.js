/* eslint-disable no-await-in-loop */
/*
 * @Author: czy0729
 * @Date: 2019-04-27 13:09:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-29 14:02:57
 */
import React from 'react'
import { Alert } from 'react-native'
import { observable, computed } from 'mobx'
import deepmerge from 'deepmerge'
import { Text } from '@components'
import { Popover } from '@screens/_'
import { _, systemStore, rakuenStore, userStore, tinygrailStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { URL_DEFAULT_AVATAR, LIMIT_TOPIC_PUSH } from '@constants'
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
const initPrefetchState = {
  prefetching: false,
  prefetchTotal: 0,
  prefetchCurrent: 0
}

export default class ScreenRakuen extends store {
  state = observable({
    scope: MODEL_RAKUEN_SCOPE.getValue('全局聚合'),
    page: 1, // <Tabs>当前页数
    group: MODEL_RAKUEN_TYPE_GROUP.getValue('全部'), // 小组菜单
    mono: MODEL_RAKUEN_TYPE_MONO.getValue('全部'), // 人物菜单

    ...initPrefetchState, // Prefetch

    _page: 1, // header上的假<Tabs>当前页数
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...initPrefetchState,
      _loaded: true
    })
    this.fetchRakuen(true)
    return res
  }

  onHeaderRefresh = () => this.fetchRakuen(true)

  // -------------------- fetch --------------------
  /**
   * 超展开列表
   */
  fetchRakuen = async refresh => {
    const { scope, page } = this.state
    const type = this.type(page)
    const res = rakuenStore.fetchRakuen({ scope, type }, refresh)
    await res

    if (this.tinygrail) {
      this.fetchCharacters()
    }

    return res
  }

  /**
   * 小圣杯 - 人物数据
   */
  fetchCharacters = () => {
    const { page } = this.state
    const type = this.type(page)
    if (['group', 'mono', 'mono&filter=character'].includes(type)) {
      const rakuen = this.rakuen(type)
      const ids = []
      rakuen.list.forEach(item => {
        const id = this.characterId(item.href)
        if (id) {
          ids.push(id)
        }
      })

      if (ids.length) {
        return tinygrailStore.fetchCharacters(ids)
      }
    }
    return false
  }

  // -------------------- get --------------------
  @computed get backgroundColor() {
    return _.select(_.colorPlain, _._colorDarkModeLevel1)
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  rakuen(type) {
    const { scope } = this.state
    return computed(() => {
      const rakuen = rakuenStore.rakuen(scope, type)
      if (userStore.isLimit) {
        return {
          ...rakuen,
          list: rakuen.list.filter(item => {
            if (item.avatar.includes(URL_DEFAULT_AVATAR)) {
              return false
            }

            const group = String(item.group).toLocaleLowerCase()
            return !['gal', '性', '癖', '里番'].some(i => group.includes(i))
          })
        }
      }
      return rakuen
    }).get()
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
            <Text size={11} type='sub' lineHeight={14}>
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
            <Text size={11} type='sub' lineHeight={14}>
              <Text size={14}>人物</Text>{' '}
              {MODEL_RAKUEN_TYPE_MONO.getLabel(mono)}
            </Text>
          </Popover>
        )
      } else {
        _tabs[index].title = (
          <Text size={11} type='sub' lineHeight={14}>
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

  /**
   * 导航栏标题
   */
  @computed get title() {
    const { page } = this.state
    return tabs[page].title
  }

  /**
   * 是否中文优先
   */
  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }

  /**
   * 是否开启小圣杯
   */
  @computed get tinygrail() {
    return systemStore.setting.tinygrail
  }

  /**
   * 获取虚拟人物Id
   */
  characterId(href) {
    if (href.includes('/crt/')) {
      return href.split('/crt/')[1]
    }
    return 0
  }

  /**
   * 小圣杯人物信息
   * @param {*} topicId
   */
  characters(id) {
    return computed(() => tinygrailStore.characters(id)).get()
  }

  /**
   * 是否收藏
   * @param {*} topicId
   */
  isFavor(topicId) {
    return computed(() => rakuenStore.favor(topicId)).get()
  }

  // -------------------- page --------------------
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('超展开.标签页点击', {
      page
    })

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

    t('超展开.标签页切换', {
      page
    })

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
    t('超展开.小组菜单点击', {
      title
    })

    this.setState({
      group: MODEL_RAKUEN_TYPE_GROUP.getValue(title)
    })
    this.fetchRakuen(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onMonoMenuPress = title => {
    t('超展开.人物菜单点击', {
      title
    })

    this.setState({
      mono: MODEL_RAKUEN_TYPE_MONO.getValue(title)
    })
    this.fetchRakuen(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onItemPress = (topicId, replies) => {
    rakuenStore.updateTopicReaded(topicId, replies)
  }

  onExtraSelect = (title, values, navigation) => {
    const eventId = '超展开.项额外点击'
    let subjectId
    let groupId
    let monoId
    switch (title) {
      case '进入小组':
        groupId = values.groupHref.replace('/group/', '')
        t(eventId, {
          title,
          groupId
        })

        navigation.push('Group', {
          groupId,
          _title: values.groupCn
        })
        break

      case '进入条目':
        subjectId = values.groupHref.replace('/subject/', '')
        t(eventId, {
          title,
          subjectId
        })

        navigation.push('Subject', {
          subjectId
        })
        break

      case '进入人物':
        monoId = values.topicId
          .replace('prsn/', 'person/')
          .replace('crt/', 'character/')
        t(eventId, {
          title,
          monoId
        })

        navigation.push('Mono', {
          monoId
        })
        break

      case '屏蔽小组':
      case '屏蔽条目':
      case '屏蔽人物':
        t(eventId, {
          title,
          groupCn: values.groupCn
        })

        rakuenStore.addBlockGroup(values.groupCn)
        info(`已屏蔽 ${values.groupCn}`)
        break

      case '屏蔽用户':
        t(eventId, {
          title,
          userName: values.userName
        })

        rakuenStore.addBlockUser(`${values.userName}@${values.userId}`)
        info(`已屏蔽 ${values.userName}`)
        break

      case '进入ICO':
        t(eventId, {
          title,
          monoId: values.monoId
        })

        navigation.push('TinygrailICODeal', {
          monoId: values.monoId
        })
        break

      case '进入交易':
        t(eventId, {
          title,
          monoId: values.monoId
        })

        navigation.push('TinygrailTrade', {
          monoId: values.monoId
        })
        break

      default:
        break
    }
  }

  /**
   * 获取未读帖子的id
   */
  getUnreadTopicIds = (list = []) => {
    const { topic } = rakuenStore.state
    const ids = []
    list.forEach(item => {
      try {
        // 需要检查回复数是否小于LIMIT_TOPIC_PUSH
        // replies: (+1)
        const count = parseInt(
          String(item.replies || '0').replace(/\(\+|\)/g, '')
        )
        if (count <= LIMIT_TOPIC_PUSH) {
          const id = String(item.href).replace('/rakuen/topic/', '')
          if (!topic[id]) {
            ids.push(id)
          }
        }
      } catch (error) {
        // do nothing
      }
    })
    return ids
  }

  /**
   * 预读取未读帖子内容
   */
  prefetchConfirm = () => {
    const { page } = this.state
    const type = this.type(page)
    const { list } = this.rakuen(type)
    const ids = this.getUnreadTopicIds(list)

    if (!ids.length) {
      info('当前没有未读取数据的帖子')
      return
    }

    Alert.alert(
      '预读取未读帖子',
      `当前 (${ids.length}) 个未读帖子, 1次操作最多预读前40个, 建议在WIFI下进行, 确定?`,
      [
        {
          text: '取消',
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: () => this.prefetch(ids)
        }
      ]
    )
  }

  /**
   * 预读取帖子内容
   */
  prefetch = async (ids = []) => {
    if (!ids.length) {
      return
    }

    t('超展开.预读取', {
      length: ids.length
    })

    const _ids = ids.filter((item, index) => index < 40)
    let prefetchCurrent = 0
    this.setState({
      prefetching: true,
      prefetchTotal: _ids.length,
      prefetchCurrent
    })

    // eslint-disable-next-line no-restricted-syntax
    for (const topicId of _ids) {
      const { prefetching } = this.state

      // 这里需要能中断, 所以就不用queue了
      if (prefetching) {
        await rakuenStore.fetchTopic({
          topicId
        })

        prefetchCurrent += 1
        this.setState({
          prefetchCurrent
        })
      }
    }

    this.setState({
      ...initPrefetchState
    })
    info('预读取完毕')
  }

  /**
   * 取消预读取
   */
  cancelPrefetch = () => {
    t('超展开.取消预读取')

    this.setState({
      ...initPrefetchState
    })
  }
}
