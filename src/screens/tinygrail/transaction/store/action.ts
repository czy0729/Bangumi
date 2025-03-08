/*
 * @Author: czy0729
 * @Date: 2025-03-05 04:46:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:34:46
 */
import { tinygrailStore, userStore } from '@stores'
import { feedback, getTimestamp, info, updateVisibleBottom } from '@utils'
import { collect, get, update } from '@utils/kv'
import { UserId } from '@types'
import { DataItem, LikesItem } from '../types'
import Fetch from './fetch'
import { EXCLUDE_STATE } from './ds'

export default class Action extends Fetch {
  scrollViewRef = null

  inputRef = null

  forwardRef = (ref: any) => {
    this.scrollViewRef = ref
  }

  forwardInputRef = (ref: any) => {
    try {
      this.inputRef = ref.inputRef
    } catch (error) {}
  }

  /** 滚动到顶 */
  scrollToTop = () => {
    if (this.scrollViewRef?.scrollToIndex) {
      setTimeout(() => {
        try {
          this.scrollViewRef.scrollToIndex({
            animated: true,
            index: 0,
            viewOffset: 0
          })

          setTimeout(() => {
            this.setState({
              visibleBottom: EXCLUDE_STATE.visibleBottom
            })
          }, 400)
        } catch (error) {}
      }, 160)
    }
  }

  onToggleShow = () => {
    if (!userStore.myUserId) {
      info('未登录')
      return
    }

    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  onChangeText = (text: string) => {
    this.setState({
      text: text.slice(0, 200)
    })
  }

  onChangeMonoId = (text: string) => {
    this.setState({
      monoId: text.slice(0, 6).trim()
    })
  }

  onChangeColor = (color: string) => {
    this.setState({
      color
    })
  }

  onSubmit = async () => {
    if (!userStore.myUserId) {
      info('未登录')
      return
    }

    const { fetching, text, color, monoId: mid } = this.state
    if (fetching) return

    if (!text) {
      info('请填写描述')
      return
    }

    this.save()
    this.setState({
      fetching: true
    })

    const { userInfo } = userStore
    const id = `tinygrail_${userStore.myUserId}`

    let monoId = ''
    let monoIcoId = ''
    let monoAvatar = ''
    let monoName = ''
    if (mid) {
      try {
        const data: any = await tinygrailStore.fetchCharacters([mid])
        const item = data?.[mid]
        if (item?.monoId) {
          monoId = item.monoId
          monoIcoId = item.icoId
          monoAvatar = item.icon
          monoName = item.name
        }
      } catch (error) {}
    }

    await collect('tinygrail', id, false)
    await collect('tinygrail', id, true)
    await update(
      id,
      {
        userId: userInfo.id,
        avatar: userInfo.avatar.large,
        name: userInfo.nickname,
        detail: text.trim(),
        color,
        monoId,
        monoIcoId,
        monoAvatar,
        monoName,
        _loaded: getTimestamp()
      },
      true,
      false,
      false
    )

    this.setState({
      fetching: false,
      show: false
    })
    feedback()

    this.getList()
  }

  onPage = async (pageData: DataItem[]) => {
    const ids = pageData.map(item => item.id)
    if (!ids.length) return false

    await this.getDetails(ids)
    await this.getLikes(ids)
    return true
  }

  onToggleLike = async (key: string) => {
    if (!userStore.myUserId) {
      info('未登录')
      return
    }

    const { userInfo } = userStore
    const { id: userId } = userInfo
    if (!userId) return false

    const id = `likes_${key}`
    const data: {
      list: LikesItem[]
      ts: number
    } = await get(id)
    if (!data) {
      await update(
        id,
        {
          list: [
            {
              userId,
              avatar: userInfo.avatar.large,
              name: userInfo.nickname
            }
          ],
          _loaded: getTimestamp()
        },
        true,
        false,
        false
      )
    } else {
      if (data.list.find(item => item.userId === userId)) {
        data.list = data.list.filter(item => item.userId !== userId)
      } else {
        data.list.unshift({
          userId,
          avatar: userInfo.avatar.large,
          name: userInfo.nickname
        })
      }
      await update(
        id,
        {
          list: data.list,
          _loaded: getTimestamp()
        },
        true,
        false,
        false
      )
    }

    feedback()
    return this.getLikes([key])
  }

  onResetLikes = async () => {
    if (!userStore.myUserId) {
      info('未登录')
      return
    }

    const key = `tinygrail_${userStore.myUserId}`
    const id = `likes_${key}`
    await update(
      id,
      {
        list: [],
        _loaded: getTimestamp()
      },
      true,
      false,
      false
    )

    feedback()
    return this.getLikes([key])
  }

  onDelete = async () => {
    if (!userStore.myUserId) {
      info('未登录')
      return
    }

    const id = `tinygrail_${userStore.myUserId}`
    await collect('tinygrail', id, false)

    feedback()
    return this.getList()
  }

  onSend = async (userId: UserId) => {
    const { State, Value, Message } = await tinygrailStore.doSend(10000, userId)
    feedback()

    if (State === 0) {
      info(Value)
      await tinygrailStore.fetchAssets()
    } else {
      info(Message)
    }
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
