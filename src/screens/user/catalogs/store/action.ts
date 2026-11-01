/*
 * @Author: czy0729
 * @Date: 2024-09-13 05:38:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:36:00
 *
 * 目录操作: 标签页切换与可视范围维护
 */
import { userStore } from '@stores'
import { info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { TABS } from '../ds'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    this.setState({
      page,
      visibleBottom: EXCLUDE_STATE.visibleBottom
    })
    this.save()
    this.tabChangeCallback(page)

    t('用户目录.标签页切换')
  }

  /** 切换目录管理弹窗 (打开前先备好新建所需的授权码) */
  onToggleModal = async () => {
    if (this.state.modal) {
      this.setState({
        modal: false
      })

      // 弹窗写入的是用户名维度缓存, 从数字 id 进入本页时需刷新自己这一份
      if (String(this.userId) !== String(userStore.myId)) {
        // 后台刷新失败不影响交互, 静默忽略
        this.fetchCatalogs('create', true).catch(() => {})
        if (this.key !== 'create') this.fetchCatalogs(this.key, true).catch(() => {})
      }

      return
    }

    if (!(await this.fetchFormhash())) return

    this.setState({
      modal: true
    })

    t('用户目录.管理目录')
  }

  /** 切换新建目录表单 */
  onToggleForm = async () => {
    if (this.state.form) {
      this.setState({
        form: false
      })
      return
    }

    if (!(await this.fetchFormhash())) return

    this.setState({
      form: true
    })

    t('用户目录.新增目录')
  }

  /** 表单提交成功: 刷新「创建的」与当前标签 */
  onSuccessForm = () => {
    this.fetchCatalogs('create', true).catch(() => {})
    if (this.key !== 'create') this.fetchCatalogs(this.key, true).catch(() => {})
  }

  /**
   * 补齐表单授权码
   *  - 新建目录的提交需要 formhash, 弹窗只在有目录详情时才解析得到
   *  - 一条目录都没有时用一次个人中心请求补上
   */
  fetchFormhash = async () => {
    if (userStore.formhash) return true

    try {
      await userStore.doCheckCookie()
    } catch {}

    if (!userStore.formhash) {
      info('获取表单授权码失败, 请检查登录状态')
      return false
    }

    return true
  }

  /** 标签页切换回调 */
  tabChangeCallback = (page: number) => {
    const key = TABS[page]?.key ?? TABS[0].key
    if (!this.catalogs(key)._loaded) this.fetchCatalogs(key, true)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
