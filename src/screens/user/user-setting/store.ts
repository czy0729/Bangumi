/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:53:14
 */
import { computed, observable } from 'mobx'
import { usersStore, userStore } from '@stores'
import { feedback, getTimestamp, HTMLDecode, info } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { randomAvatars } from '@utils/user-setting'
import { FROZEN_FN } from '@constants'
import { NAMESPACE, ONLINE_BGS_URL, REG_AVATAR, REG_BG, REG_FIXED, STATE } from './ds'

export default class ScreenUserSetting extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      avatar: state.avatar || '',
      bg: state.bg || '',
      selectedIndex: state.selectedIndex || 0,
      bgs: state.bgs || [],
      pixivs: state.pixivs || [],
      avatars: state.avatars || [],
      _loaded: getTimestamp()
    })

    await this.onInit()
    this.onRefresh()

    return true
  }

  // -------------------- fetch --------------------
  /** 个人资料 */
  fetchUserSetting = async () => {
    const data = await userStore.fetchUserSetting()
    const { nickname = '', sign_input = '' } = data
    this.setState({
      nickname,
      sign_input
    })
    this.setStorage(NAMESPACE)
    return data
  }

  /** 预设背景 */
  fetchBgs = async () => {
    const bgs =
      (await fetch(`${ONLINE_BGS_URL}?t=${getTimestamp()}`).then(response => response.json())) || []
    this.setState({
      bgs
    })
    this.setStorage(NAMESPACE)
    return bgs
  }

  /** 随机头像 */
  fetchAvatars = async () => {
    const avatars = randomAvatars()
    this.setState({
      avatars
    })

    this.setStorage(NAMESPACE)
    return avatars
  }

  /** 随机背景 */
  // fetchSetus = async () => {
  //   const data = []
  //   data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
  //   data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
  //   this.setState({
  //     pixivs: data.filter(item => item.width * 1.28 >= item.height).map(item => item.urls.small)
  //   })

  //   data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
  //   data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
  //   this.setState({
  //     pixivs: data.filter(item => item.width * 1.28 >= item.height).map(item => item.urls.small)
  //   })
  //   this.setStorage(NAMESPACE)
  //   return data
  // }

  /** 还原 */
  onInit = async (resume: boolean = false) => {
    await this.fetchUserSetting()

    const { sign } = this.userSetting
    const _bgs = sign.match(REG_BG)
    const _avatars = sign.match(REG_AVATAR)
    this.setState({
      bg: HTMLDecode(String(_bgs ? String(_bgs[1]).trim() : '').replace(REG_FIXED, '')),
      avatar: HTMLDecode(String(_avatars ? String(_avatars[1]).trim() : '').replace(REG_FIXED, ''))
    })

    if (resume) info('已还原')
  }

  /** 刷新 */
  onRefresh = () => {
    const { selectedIndex } = this.state
    if (selectedIndex === 0) return this.fetchBgs()
    // if (selectedIndex === 1) return this.fetchSetus()
    if (selectedIndex === 1) return this.fetchAvatars()
  }

  // -------------------- get --------------------
  @computed get userSetting() {
    const { userSetting } = userStore
    return userSetting
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get usersInfo() {
    return userStore.usersInfo(this.myUserId)
  }

  @computed get users() {
    return usersStore.users(this.myUserId)
  }

  @computed get bg() {
    const { bg } = this.state
    if (bg) return bg

    const { sign } = this.userSetting
    const _bgs = sign.match(REG_BG)
    return HTMLDecode(String(_bgs ? String(_bgs[1]).trim() : '').replace(REG_FIXED, ''))
  }

  @computed get avatar() {
    const { avatar } = this.state
    if (avatar) return avatar

    const { sign } = this.userSetting
    const _avatars = sign.match(REG_AVATAR)
    return HTMLDecode(String(_avatars ? String(_avatars[1]).trim() : '').replace(REG_FIXED, ''))
  }

  // -------------------- action --------------------
  onChangeText = (key: string, value: string) => {
    this.setState({
      [key]: value
    })
  }

  onSelectBg = (bg: string) => {
    this.setState({
      bg
    })
  }

  onSelectAvatar = (avatar: string) => {
    this.setState({
      avatar
    })
  }

  onSave = async () => {
    const { formhash, sign, timeoffsetnew } = this.userSetting
    const { avatar, bg, nickname, sign_input } = this.state

    // 使用个人签名来记录APP自定义头像和背景
    let _sign = sign
    if (_sign.match(REG_AVATAR)) {
      _sign = _sign.replace(REG_AVATAR, `[avatar]${avatar || ''}[/avatar]`)
    } else {
      _sign += `[size=0][avatar]${avatar || ''}[/avatar][/size]`
    }

    let _bg = bg || ''
    if (typeof _bg === 'string' && _bg.includes('i.pixiv.re')) {
      _bg = _bg.replace('/c/540x540_70', '')
    }

    if (_sign.match(REG_BG)) {
      _sign = _sign.replace(REG_BG, `[bg]${_bg}[/bg]`)
    } else {
      _sign += `[size=0][bg]${_bg}[/bg][/size]`
    }

    // 清除错误保存的历史数据
    _sign = _sign.replace(REG_FIXED, '')

    userStore.doUpdateUserSetting(
      {
        formhash,
        nickname,
        sign_input,
        newbio: _sign,
        timeoffsetnew
      },
      () => {
        t('个人设置.保存', {
          id: this.myUserId
        })

        feedback()
        info('保存成功')
        this.fetchUserSetting()

        // 更新时光机的头像和背景
        usersStore.fetchUsers({
          userId: this.myUserId
        })

        this.setState({
          bg: _bg
        })
        this.setStorage(NAMESPACE)
      },
      FROZEN_FN
    )
  }

  onValueChange = (selectedIndex: number) => {
    this.setState({
      selectedIndex
    })

    if (
      (selectedIndex === 0 && !this.state.bgs.length) ||
      // (selectedIndex === 1 && !this.state.pixivs.length) ||
      (selectedIndex === 1 && !this.state.avatars.length)
    ) {
      this.onRefresh()
    }

    this.setStorage(NAMESPACE)
  }
}
