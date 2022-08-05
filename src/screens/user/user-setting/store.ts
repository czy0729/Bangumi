/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 01:07:57
 */
import { observable, computed } from 'mobx'
import { userStore, usersStore } from '@stores'
import { getTimestamp, HTMLDecode } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { info, feedback } from '@utils/ui'
import { API_RANDOM_AVATAR, API_SETU } from '@constants'

const namespace = 'ScreenUserSetting'
const onlineBgsUrl = 'https://gitee.com/a296377710/bangumi/raw/master/bg.json'
const regBg = /\[bg\](.+?)\[\/bg\]/
const regAvatar = /\[avatar\](.+?)\[\/avatar\]/
const regFixed =
  /\[size=0\]\[avatar\]\[\/avatar\]\[\/size\]|\[size=0\]\[bg\]\[\/bg\]\[\/size\]/g

export default class ScreenUserSetting extends store {
  state = observable({
    nickname: '',
    sign_input: '',
    avatar: '',
    bg: '',
    selectedIndex: 0,
    bgs: [],
    pixivs: [],
    avatars: [],
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(namespace)) || {}
    this.setState({
      state
    })

    await this.onInit()
    this.onRefresh()
    return true
  }

  // -------------------- fetch --------------------
  fetchUserSetting = async () => {
    const data = await userStore.fetchUserSetting()
    const { nickname = '', sign_input = '' } = data
    this.setState({
      nickname,
      sign_input
    })
    this.setStorage(namespace)
    return data
  }

  /** 预设背景 */
  fetchBgs = async () => {
    const bgs =
      (await fetch(`${onlineBgsUrl}?t=${getTimestamp()}`).then(response =>
        response.json()
      )) || []
    this.setState({
      bgs
    })
    this.setStorage(namespace)
    return bgs
  }

  /** 随机头像 */
  fetchAvatars = async () => {
    const data = []
    for (let i = 0; i < 10; i += 1) {
      data.push(await fetch(API_RANDOM_AVATAR()).then(res => res.url))
      if (i === 4) {
        this.setState({
          avatars: data
        })
      }
    }

    this.setState({
      avatars: data
    })
    this.setStorage(namespace)
    return data
  }

  /** 随机背景 */
  fetchSetus = async () => {
    const data = []
    data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
    data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
    this.setState({
      pixivs: data
        .filter(item => item.width * 1.28 >= item.height)
        .map(item => item.urls.small)
    })

    data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
    data.push(...(await fetch(API_SETU()).then(res => res.json())).data)
    this.setState({
      pixivs: data
        .filter(item => item.width * 1.28 >= item.height)
        .map(item => item.urls.small)
    })
    this.setStorage(namespace)
    return data
  }

  onInit = async (resume: boolean = false) => {
    await this.fetchUserSetting()

    const { sign } = this.userSetting
    const _bgs = sign.match(regBg)
    const _avatars = sign.match(regAvatar)
    this.setState({
      bg: HTMLDecode(String(_bgs ? String(_bgs[1]).trim() : '').replace(regFixed, '')),
      avatar: HTMLDecode(
        String(_avatars ? String(_avatars[1]).trim() : '').replace(regFixed, '')
      )
    })

    if (resume) info('已还原')
  }

  onRefresh = () => {
    const { selectedIndex } = this.state
    if (selectedIndex === 0) return this.fetchBgs()
    if (selectedIndex === 1) return this.fetchSetus()
    if (selectedIndex === 2) return this.fetchAvatars()
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
    const _bgs = sign.match(regBg)
    return HTMLDecode(String(_bgs ? String(_bgs[1]).trim() : '').replace(regFixed, ''))
  }

  @computed get avatar() {
    const { avatar } = this.state
    if (avatar) return avatar

    const { sign } = this.userSetting
    const _avatars = sign.match(regAvatar)
    return HTMLDecode(
      String(_avatars ? String(_avatars[1]).trim() : '').replace(regFixed, '')
    )
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
    if (_sign.match(regAvatar)) {
      _sign = _sign.replace(regAvatar, `[avatar]${avatar || ''}[/avatar]`)
    } else {
      _sign += `[size=0][avatar]${avatar || ''}[/avatar][/size]`
    }

    let _bg = bg || ''
    if (_bg.includes('i.pixiv.re')) _bg = _bg.replace('/c/540x540_70', '')
    if (_sign.match(regBg)) {
      _sign = _sign.replace(regBg, `[bg]${_bg}[/bg]`)
    } else {
      _sign += `[size=0][bg]${_bg}[/bg][/size]`
    }

    // 清除错误保存的历史数据
    _sign = _sign.replace(regFixed, '')

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
        this.setStorage(namespace)
      },
      () => {}
    )
  }

  onValueChange = (selectedIndex: number) => {
    this.setState({
      selectedIndex
    })

    if (
      (selectedIndex === 0 && !this.state.bgs.length) ||
      (selectedIndex === 1 && !this.state.pixivs.length) ||
      (selectedIndex === 2 && !this.state.avatars.length)
    ) {
      this.onRefresh()
    }
  }
}
