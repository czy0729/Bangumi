/*
 * @Author: czy0729
 * @Date: 2024-06-03 11:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-30 16:45:06
 */
import { systemStore, usersStore } from '@stores'
import { debounce, info, loading, t2s, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants'
import { Navigation, SearchCat, SearchLegacy } from '@types'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 处理初始参数 */
  initState = () => {
    setTimeout(() => {
      const { _type, _value, type, value } = this.params
      if (type || _type) {
        this.setState({
          cat: MODEL_SEARCH_CAT.getValue<SearchCat>(type || _type)
        })
      }

      if (value || _value) {
        this.setState({
          _value: String(value || _value),
          value: String(value || _value)
        })
        this.save()
        this.doSearch()
      }
    }, 40)
  }

  /** 切换类型 */
  onSelect = (label: string) => {
    const { cat } = this.state
    const nextCat = MODEL_SEARCH_CAT.getValue<SearchCat>(label)
    if (nextCat !== cat) {
      this.setState({
        cat: nextCat
      })
      this.save()

      if (this.state.value) this.doSearch()

      t('搜索.切换类型', {
        cat: nextCat
      })
    }
  }

  /** 切换细分类型 */
  onLegacySelect = (label: string) => {
    const { legacy } = this.state
    const nextLegacy = MODEL_SEARCH_LEGACY.getValue<SearchLegacy>(label)
    if (nextLegacy !== legacy) {
      this.setState({
        legacy: nextLegacy
      })
      this.save()

      if (this.state.value) this.doSearch()

      t('搜索.切换细分类型', {
        legacy: nextLegacy
      })
    }
  }

  /** 输入框改变 */
  onChangeText = (text: string) => {
    if (systemStore.setting.s2t && this.state.t2s) text = t2s(text)

    const state: Partial<typeof EXCLUDE_STATE> = {
      _value: text
    }
    if (text) state.focus = true

    this.setState(state)
    this.onChangeTextConfirm(text)
  }

  /** 输入框值提交, 反应数据 */
  onChangeTextConfirm = debounce((text: string) => {
    const state: Partial<typeof EXCLUDE_STATE> = {
      value: text
    }
    this.setState(state)
  })

  /** 选择历史 */
  selectHistory = (value: string) => {
    this.setState({
      _value: value,
      value
    })

    t('搜索.选择历史', {
      value
    })
  }

  /** 删除历史 */
  deleteHistory = (value: string) => {
    const { history } = this.state
    this.setState({
      history: history.filter(item => item !== value)
    })
    this.save()

    t('搜索.删除历史', {
      value
    })
  }

  /** 删除全部历史 */
  deleteHistoryAll = () => {
    this.setState({
      history: []
    })
    this.save()
  }

  /** 提交 */
  onSubmit = async (navigation?: Navigation) => {
    if (this.isUser) {
      const { value } = this.state
      if (!value) {
        info('请输入完整的用户 ID')
        return
      }

      const chineseRegex = /[\u4e00-\u9fa5]/
      if (chineseRegex.test(value)) {
        info('请输入用户 ID 而非用户昵称')
        return
      }

      const hide = loading('检查用户 ID')
      const isExist = await usersStore.checkUserExist(value)
      hide()
      if (!isExist) {
        info('该用户 ID 不存在')
        return
      }

      navigation.push('Zone', {
        userId: value
      })
      return
    }

    setTimeout(() => {
      this.doSearch(true)
    }, 800)
  }

  /** 本地快速搜索索引点击 */
  onAdvance = (text: string, navigation?: Navigation) => {
    this.setState({
      value: text,
      focus: false
    })
    this.onSubmit(navigation)
  }

  /** 获得焦点 */
  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  /** 失去焦点 */
  onBlur = () => {
    this.setState({
      focus: true
    })
  }

  /** 输入框繁体转简体 */
  onT2S = () => {
    const value = !this.state.t2s
    this.setState({
      t2s: value
    })
    if (value) this.onChangeText(t2s(this.state.value || this.state._value))
    this.save()

    info(`${value ? '开启' : '关闭'}输入内容自动转为简体`)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
