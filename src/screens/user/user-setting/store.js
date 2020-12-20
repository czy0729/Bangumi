/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-20 19:44:20
 */
import { observable, computed } from 'mobx'
import { userStore, usersStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { info, feedback } from '@utils/ui'

const onlineBgsUrl = 'https://gitee.com/a402731062/bangumi/raw/master/bg.json'
const regBg = /\[bg\](.+?)\[\/bg\]/
const regAvatar = /\[avatar\](.+?)\[\/avatar\]/
const regFixed = /\[size=0\]\[avatar\]\[\/avatar\]\[\/size\]|\[size=0\]\[bg\]\[\/bg\]\[\/size\]/g

export default class ScreenAvatar extends store {
  state = observable({
    nickname: '',
    sign_input: '',
    avatar: '',
    bg: '',
    bgs: [],
    _loaded: false
  })

  init = async () => {
    const res = this.fetchUserSetting()
    await res
    this.setState({
      bg: this.bg,
      avatar: this.avatar
    })

    this.fetchBgs()
    return res
  }

  // -------------------- fetch --------------------
  fetchBgs = async () => {
    const bgs =
      (await fetch(`${onlineBgsUrl}?t=${getTimestamp()}`).then(response =>
        response.json()
      )) || []
    this.setState({
      bgs
    })
    return bgs
  }

  fetchUserSetting = async () => {
    const data = await userStore.fetchUserSetting()
    const { nickname = '', sign_input = '' } = data
    this.setState({
      nickname,
      sign_input
    })
    return data
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
    return String(_bgs ? String(_bgs[1]).trim() : '').replace(regFixed, '')
  }

  @computed get avatar() {
    const { avatar } = this.state
    if (avatar) return avatar

    const { sign } = this.userSetting
    const _avatars = sign.match(regAvatar)
    return String(_avatars ? String(_avatars[1]).trim() : '').replace(
      regFixed,
      ''
    )
  }

  // -------------------- action --------------------
  changeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  onSelectBg = bg => {
    this.setState({
      bg
    })
  }

  onSave = async () => {
    const { formhash, sign } = this.userSetting
    const { avatar, bg, nickname, sign_input } = this.state

    // 使用个人签名来记录APP自定义头像和背景
    let _sign = sign
    if (_sign.match(regAvatar)) {
      _sign = _sign.replace(regAvatar, `[avatar]${avatar || ''}[/avatar]`)
    } else {
      _sign += `[size=0][avatar]${avatar || ''}[/avatar][/size]`
    }

    if (_sign.match(regBg)) {
      _sign = _sign.replace(regBg, `[bg]${bg || ''}[/bg]`)
    } else {
      _sign += `[size=0][bg]${bg || ''}[/bg][/size]`
    }

    // 清除错误保存的历史数据
    _sign = _sign.replace(regFixed, '')

    userStore.doUpdateUserSetting(
      {
        formhash,
        nickname,
        sign_input,
        newbio: _sign,
        timeoffsetnew: '8'
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
      },
      () => {}
    )
  }
}
