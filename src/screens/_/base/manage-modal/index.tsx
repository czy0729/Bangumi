/*
 * @Author: czy0729
 * @Date: 2019-03-18 05:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-10 17:37:44
 */
import React from 'react'
import { BackHandler, TextInput } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Component, Flex, Modal, Text } from '@components'
import { _, collectionStore, subjectStore, systemStore, userStore } from '@stores'
import {
  alert,
  confirm,
  feedback,
  getStorage,
  getTimestamp,
  info,
  navigationReference,
  setStorage,
  sleep
} from '@utils'
import { ob } from '@utils/decorators'
import { FROZEN_FN, H, IOS, MODEL_PRIVATE, MODEL_SUBJECT_TYPE } from '@constants'
import i18n from '@constants/i18n'
import { Private, PrivateCn, RatingStatus, SubjectType } from '@types'
import { StarGroup } from '../star-group'
import CommentInput from './comment-input'
import Status from './status'
import Submit from './submit'
import Tags from './tags'
import TagsInput from './tags-input'
import { COMPONENT, MAX_HISTORY_COUNT, NAMESPACE_COMMENT, NAMESPACE_PRIVACY } from './ds'
import { memoStyles } from './styles'
import { Props as ManageModalProps, State } from './types'

export { ManageModalProps }

/** 条目收藏管理弹窗 */
export const ManageModal = ob(
  class ManageModalComponent extends React.Component<ManageModalProps, State> {
    static defaultProps: ManageModalProps = {
      visible: false,
      disabled: false,
      subjectId: 0,
      title: '',
      desc: '',
      status: '',
      action: '看',
      onSubmit: FROZEN_FN,
      onClose: FROZEN_FN
    }

    state: State = {
      focus: false,
      loading: true,
      fetching: false,
      rating: 0,
      tags: '',
      showTags: true,
      showUserTags: false,
      comment: '',
      commentHistory: [],
      status: '',
      privacy: MODEL_PRIVATE.getValue<Private>('公开')
    }

    private _backHandlerSubscription: { remove: () => void } | null = null

    /** 用于判断收藏请求是否已经发出并返回数据 */
    private _fetched = false

    /** 用于判断用户在数据更新前就已经操作, 不再改变选定的状态 */
    private _changedStatus = false

    /** 输入框引用 */
    commentRef: {
      inputRef: TextInput
    } = null

    async componentDidMount() {
      try {
        this.setState({
          showTags: systemStore.setting.showTags === true,
          commentHistory: (await getStorage(NAMESPACE_COMMENT)) || [],
          privacy: (await getStorage(NAMESPACE_PRIVACY)) || MODEL_PRIVATE.getValue<Private>('公开')
        })
      } catch (error) {
        console.error('manage-modal', 'componentDidMount', error)
      }

      if (!IOS) {
        this._backHandlerSubscription = BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackAndroid
        )
      }
    }

    componentWillUnmount() {
      if (!IOS && this._backHandlerSubscription) {
        this._backHandlerSubscription.remove()
        this._backHandlerSubscription = null
      }
    }

    async UNSAFE_componentWillReceiveProps(nextProps: {
      visible: any
      status: any
      subjectId: any
    }) {
      const { visible, status, subjectId } = nextProps
      if (visible) {
        if (!this.props.visible) {
          this.setState({
            loading: false,
            focus: false,
            status
          })

          const result = await collectionStore.fetchCollection(subjectId)
          this._fetched = true

          // 提前告知授权信息失效
          if (result?.error && result.error.includes('token')) {
            const navigation = navigationReference()
            const content = `获取收藏信息失败：${result.error}，授权信息可能过期了`
            if (navigation) {
              confirm(
                content,
                () => {
                  this.props.onClose()
                  setTimeout(() => {
                    navigation.push('LoginV2')
                  }, 400)
                },
                '警告',
                undefined,
                `去${i18n.login()}`
              )
            } else {
              alert(content)
            }
          }

          const { rating, tag = [], comment, private: privacy, status: _status = {} } = result

          // 若传递有收藏状态, 而请求后实际又没有, 主动清理全局缓存收藏状态
          if (!Object.keys(_status).length && nextProps.status) {
            collectionStore.removeStatus(subjectId)
          }

          const state: State = {
            rating,
            tags: tag.join(' '),
            comment
          }
          if (!this._changedStatus) state.status = _status.type
          if (privacy !== undefined) state.privacy = privacy
          this.setState(state)

          this.fetchUserTags()
        }
      }
    }

    handleBackAndroid = () => {
      if (this.props.visible) {
        this.props.onClose()
        return true
      }

      return false
    }

    handleChangeRating = (value: number) => {
      this.setState({
        rating: value
      })
      feedback(true)
    }

    handleChangeTags = (text: string) => {
      this.setState({
        tags: text
      })
    }

    handleChangeStatus = (status: RatingStatus) => {
      this._changedStatus = true
      this.setState({
        status
      })
      feedback(true)
    }

    handleToggleTag = (name: string) => {
      const { tags } = this.state
      const selected = tags.split(' ')
      const index = selected.indexOf(name)
      if (index === -1) {
        selected.push(name)
      } else {
        selected.splice(index, 1)
      }

      this.setState({
        tags: selected.join(' ')
      })
      feedback(true)
    }

    handleTogglePrivacy = () => {
      const { privacy } = this.state
      const label = MODEL_PRIVATE.getLabel<PrivateCn>(privacy)
      const value = MODEL_PRIVATE.getValue<Private>(label === '公开' ? '私密' : '公开')
      this.setState({
        privacy: value
      })
      feedback(true)
      setStorage(NAMESPACE_PRIVACY, value)
    }

    handleFetchTags = async () => {
      this.setState({
        fetching: true,
        showTags: true
      })

      await subjectStore.fetchSubjectFromHTML(this.props.subjectId)
      this.setState({
        fetching: false
      })
    }

    fetchUserTags = async () => {
      // 每种类型一小时最多刷新一次
      const { _loaded } = userStore.tags(this.type)
      if (getTimestamp() - Number(_loaded || 0) <= H) return

      return userStore.fetchTags(this.props.subjectId, this.type)
    }

    handleFocus = () => {
      this.setState({
        focus: true
      })
    }

    handleBlur = () => {
      this.setState({
        focus: false
      })

      // 安卓中收起键盘并不会把聚焦取消, 主动取消以使跨端表现一致
      try {
        if (typeof this?.commentRef?.inputRef?.blur === 'function') {
          this.commentRef.inputRef.blur()
        }
      } catch (error) {}
    }

    handleSubmit = async () => {
      const { rating, tags, comment, status, privacy } = this.state
      if (!this._fetched && !status) {
        info('收藏数据仍在获取中，请稍等')
        return
      }

      const { subjectId, onSubmit } = this.props
      this.setCommentHistory(comment)

      await onSubmit({
        subjectId,
        rating,
        tags,
        status,
        privacy,
        comment: comment || ''
      })
    }

    setCommentHistory = (value: string) => {
      if (!value) return

      let commentHistory = [...this.state.commentHistory]
      if (commentHistory.includes(value)) {
        commentHistory = commentHistory.filter(item => item !== value)
        commentHistory.unshift(value)
      } else {
        commentHistory.unshift(value)
      }

      if (commentHistory.length > MAX_HISTORY_COUNT) {
        commentHistory = commentHistory.filter((_item, index) => index < MAX_HISTORY_COUNT)
      }

      this.setState({
        commentHistory
      })
      setStorage(NAMESPACE_COMMENT, commentHistory)
    }

    handleSubmitEditing = () => {
      try {
        if (typeof this?.commentRef?.inputRef?.focus === 'function') {
          this.commentRef.inputRef.focus()
        }
      } catch (error) {}
    }

    handleForwardRef = (ref: { inputRef: TextInput }) => {
      this.commentRef = ref
    }

    handleCommentChange = (text: string) => {
      this.setState({
        comment: text
      })
    }

    handleShowHistory = () => {
      try {
        this.handleBlur()
        if (typeof this?.commentRef?.inputRef?.blur === 'function') {
          this.commentRef.inputRef.blur()
        }
        feedback(true)
      } catch (error) {}

      return sleep(240)
    }

    handleToggleTagsRecent = () => {
      this.setState({
        showUserTags: false
      })
    }

    handleToggleTagsUser = () => {
      this.setState({
        showUserTags: true
      })
    }

    get type() {
      const { action } = this.props
      let type: SubjectType
      if (action === '听') {
        type = 'music'
      } else if (action === '玩') {
        type = 'game'
      } else if (action === '读') {
        type = 'book'
      } else {
        type = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectStore.type(this.props.subjectId))
      }
      return type
    }

    render() {
      const { action, desc, disabled, subjectId, title, visible, onClose } = this.props
      const {
        comment,
        commentHistory,
        fetching,
        focus,
        loading,
        privacy,
        rating,
        showTags,
        showUserTags,
        status,
        tags
      } = this.state
      return (
        <Component id='base-manage-modal'>
          <Modal
            style={this.styles.modal}
            visible={visible}
            title={title}
            focus={focus}
            onClose={onClose}
          >
            <Text style={_.mt.sm} type='sub' size={13} numberOfLines={1} align='center'>
              {desc}
            </Text>
            <Flex style={this.styles.container} justify='center'>
              {loading ? (
                <ActivityIndicator size='small' />
              ) : (
                <Flex style={this.styles.content} direction='column'>
                  <StarGroup value={rating} onChange={this.handleChangeRating} />
                  <TagsInput
                    tags={tags}
                    onChangeText={this.handleChangeTags}
                    onSubmitEditing={this.handleSubmitEditing}
                  />
                  <Flex style={this.styles.tags}>
                    <Tags
                      subjectId={subjectId}
                      tags={tags}
                      type={this.type}
                      fetching={fetching}
                      showTags={showTags}
                      showUserTags={showUserTags}
                      onFetchTags={this.handleFetchTags}
                      onToggleTag={this.handleToggleTag}
                      onToggleTagsRecent={this.handleToggleTagsRecent}
                      onToggleTagsUser={this.handleToggleTagsUser}
                    />
                  </Flex>
                  <CommentInput
                    forwardRef={this.handleForwardRef}
                    comment={comment}
                    commentHistory={commentHistory}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChangeText={this.handleCommentChange}
                    onShowHistory={this.handleShowHistory}
                  />
                  <Status status={status} action={action} onSelect={this.handleChangeStatus} />
                  <Submit
                    disabled={disabled}
                    privacy={privacy}
                    onSubmit={this.handleSubmit}
                    onTogglePrivacy={this.handleTogglePrivacy}
                  />
                </Flex>
              )}
            </Flex>
          </Modal>
        </Component>
      )
    }

    get styles() {
      return memoStyles()
    }
  },
  COMPONENT
)

export default ManageModal
