/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:51:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:13:04
 */
import { usersStore, userStore } from '@stores'
import { feedback, HTMLDecode, info, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import { REG_AVATAR, REG_BG, REG_FIXED } from '../ds'
import Fetch from './fetch'

export default class Action extends Fetch {
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
    if (selectedIndex === 1) return this.fetchAvatars()
  }

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
        this.save()
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
      (selectedIndex === 1 && !this.state.avatars.length)
    ) {
      this.onRefresh()
    }

    this.save()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
