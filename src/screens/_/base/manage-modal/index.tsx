/*
 * 条目收藏管理弹窗
 *
 * @Author: czy0729
 * @Date: 2019-03-18 05:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-01 08:57:51
 */
import React from 'react'
import { BackHandler, View } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import {
  Button,
  Flex,
  Iconfont,
  Input,
  Modal,
  ScrollView,
  Text,
  Touchable
} from '@components'
import { _, collectionStore, subjectStore, systemStore, userStore } from '@stores'
import { setStorage, getStorage, sleep, getTimestamp, stl } from '@utils'
import { ob } from '@utils/decorators'
import { IOS, MODEL_PRIVATE, MODEL_SUBJECT_TYPE } from '@constants'
import { Private, PrivateCn, RatingStatus, SubjectType } from '@types'
import { StarGroup } from '../star-group'
import { StatusBtnGroup } from '../status-btn-group'
import CommentHistory from './comment-history'
import { NAMESPACE, MAX_HISTORY_COUNT } from './ds'
import { memoStyles } from './styles'
import { Props as ManageModalProps, State } from './types'

export { ManageModalProps }

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
      onSubmit: () => {},
      onClose: () => {}
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

    commentRef: any

    async componentDidMount() {
      try {
        const privacy =
          (await getStorage(`${NAMESPACE}|privacy`)) ||
          MODEL_PRIVATE.getValue<Private>('公开')
        const commentHistory: string[] =
          (await getStorage(`${NAMESPACE}|commentHistory`)) || []
        this.setState({
          showTags: systemStore.setting.showTags === true,
          commentHistory,
          privacy
        })
      } catch (error) {
        console.error('manage-modal', 'componentDidMount', error)
      }

      if (!IOS) BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    componentWillUnmount() {
      if (!IOS) BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
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

          const {
            rating,
            tag = [],
            comment,
            private: privacy,
            status: _status = {}
          } = await collectionStore.fetchCollection(subjectId)
          this.fetchUserTags()

          const state: any = {
            rating,
            tags: tag.join(' '),
            comment,
            status: _status.type
          }
          if (privacy !== undefined) state.privacy = privacy
          this.setState(state)
        }
      }
    }

    onBackAndroid = () => {
      const { visible, onClose } = this.props
      if (visible) {
        onClose()
        return true
      }
      return false
    }

    changeRating = (value: number) => {
      this.setState({
        rating: value
      })
    }

    changeText = (name: 'tags' | 'comment', text: string) => {
      this.setState({
        [name]: text
      })
    }

    changeStatus = (status: RatingStatus) => {
      this.setState({
        status
      })
    }

    toggleTag = (name: string) => {
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
    }

    togglePrivacy = () => {
      const { privacy } = this.state
      const label = MODEL_PRIVATE.getLabel<PrivateCn>(privacy)
      const value = MODEL_PRIVATE.getValue<Private>(label === '公开' ? '私密' : '公开')
      this.setState({
        privacy: value
      })
      setStorage(`${NAMESPACE}|privacy`, value)
    }

    fetchTags = async () => {
      const { subjectId } = this.props
      this.setState({
        fetching: true,
        showTags: true
      })

      await subjectStore.fetchSubjectFormHTML(subjectId)

      this.setState({
        fetching: false
      })
    }

    fetchUserTags = async () => {
      const { subjectId } = this.props

      // 每种类型一小时最多刷新一次
      const { _loaded } = userStore.tags(this.type)
      if (getTimestamp() - Number(_loaded || 0) <= 60 * 60) return

      return userStore.fetchTags(subjectId, this.type)
    }

    onFocus = () => {
      this.setState({
        focus: true
      })
    }

    onBlur = () => {
      this.setState({
        focus: false
      })
    }

    onSubmit = async () => {
      const { subjectId, onSubmit } = this.props
      const { rating, tags, comment, status, privacy } = this.state
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
        commentHistory = commentHistory.filter(
          (item, index) => index < MAX_HISTORY_COUNT
        )
      }

      this.setState({
        commentHistory
      })
      setStorage(`${NAMESPACE}|commentHistory`, commentHistory)
    }

    onSubmitEditing = () => {
      try {
        if (typeof this?.commentRef?.inputRef?.focus === 'function') {
          this.commentRef.inputRef.focus()
        }
      } catch (error) {}
    }

    onCommentChange = (text: string) => {
      this.changeText('comment', text)
    }

    onShowHistory = () => {
      try {
        this.onBlur()
        if (typeof this?.commentRef?.inputRef?.blur === 'function') {
          this.commentRef.inputRef.blur()
        }
      } catch (error) {}
      return sleep(240)
    }

    onToggleTagsRecent = () => {
      this.setState({
        showUserTags: false
      })
    }

    onToggleTagsUser = () => {
      this.setState({
        showUserTags: true
      })
    }

    get numberOfLines() {
      if (!_.isPad && _.isLandscape) return 2
      return _.device(4, 6)
    }

    get type() {
      const { subjectId, action } = this.props
      let type: SubjectType
      if (action === '听') {
        type = 'music'
      } else if (action === '玩') {
        type = 'game'
      } else if (action === '读') {
        type = 'book'
      } else {
        type = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectStore.type(subjectId))
      }
      return type
    }

    renderInputTags() {
      const { tags } = this.state
      return (
        <Input
          style={this.styles.inputTags}
          defaultValue={tags}
          placeholder='标签'
          returnKeyType='next'
          onChangeText={text => this.changeText('tags', text)}
          onSubmitEditing={this.onSubmitEditing}
        />
      )
    }

    renderTags() {
      const { fetching, showUserTags } = this.state
      if (fetching) {
        return (
          <View style={_.ml.xs}>
            <ActivityIndicator />
          </View>
        )
      }

      const { subjectId } = this.props
      const { _loaded, tags } = subjectStore.subjectFormHTML(subjectId)
      const { showTags } = this.state
      if (!_loaded || !showTags) {
        return (
          <Touchable style={this.styles.touch} onPress={this.fetchTags}>
            <Text size={13} underline>
              获取标注
            </Text>
          </Touchable>
        )
      }

      const selected = this.state.tags.split(' ')
      const { list } = userStore.tags(this.type)
      return (
        <View>
          <Flex style={this.styles.title}>
            <Touchable onPress={this.onToggleTagsRecent}>
              <Text
                style={showUserTags && this.styles.opacity}
                type='sub'
                size={12}
                bold
              >
                常用
              </Text>
            </Touchable>
            <View style={this.styles.split} />
            <Touchable onPress={this.onToggleTagsUser}>
              <Text
                style={!showUserTags && this.styles.opacity}
                type='sub'
                size={12}
                bold
              >
                我的
              </Text>
            </Touchable>
          </Flex>
          <ScrollView style={this.styles.tagsWrap}>
            <Flex wrap='wrap'>
              {(showUserTags ? list : tags)
                .filter(item => !String(item.count).includes('更多'))
                .map(item => {
                  let name: string
                  let count: number
                  if (showUserTags) {
                    name = item
                  } else {
                    name = item.name
                    count = item.count
                  }

                  const isSelected = selected.indexOf(name) !== -1
                  return (
                    <Touchable
                      style={this.styles.touchTag}
                      key={name}
                      onPress={() => this.toggleTag(name)}
                    >
                      <Flex
                        style={stl(
                          this.styles.tag,
                          isSelected && this.styles.tagSelected
                        )}
                      >
                        <Text
                          size={12}
                          bold
                          type={_.select('desc', isSelected ? 'main' : 'desc')}
                        >
                          {name}
                        </Text>
                        {!!count && (
                          <Text
                            style={_.ml.xs}
                            type={_.select('sub', isSelected ? 'main' : 'sub')}
                            size={12}
                          >
                            {count}
                          </Text>
                        )}
                      </Flex>
                    </Touchable>
                  )
                })}
            </Flex>
          </ScrollView>
        </View>
      )
    }

    renderInputComment() {
      const { comment, commentHistory } = this.state
      return (
        <Flex style={this.styles.comment} align='end'>
          <Flex.Item>
            <Input
              ref={ref => (this.commentRef = ref)}
              style={this.styles.input}
              defaultValue={comment}
              placeholder='吐槽点什么'
              multiline
              numberOfLines={this.numberOfLines}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChangeText={this.onCommentChange}
            />
          </Flex.Item>
          {!comment && (
            <CommentHistory
              data={commentHistory}
              onSelect={this.onCommentChange}
              onShow={this.onShowHistory}
            />
          )}
        </Flex>
      )
    }

    renderStatusBtnGroup() {
      const { action } = this.props
      const { status } = this.state
      return (
        <StatusBtnGroup
          style={_.mt.md}
          value={status}
          action={action}
          onSelect={this.changeStatus}
        />
      )
    }

    renderSubmit() {
      const { disabled } = this.props
      const { privacy } = this.state
      const label = MODEL_PRIVATE.getLabel<PrivateCn>(privacy)
      return (
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Button
              style={this.styles.btn}
              type='main'
              loading={disabled}
              onPress={this.onSubmit}
            >
              更新
            </Button>
          </Flex.Item>
          <Button
            style={this.styles.btnPrivacy}
            type={label === '公开' ? 'ghostMain' : 'ghostPlain'}
            extra={
              label === '私密' && (
                <Iconfont
                  style={_.ml.xs}
                  color={_.colorSub}
                  size={16}
                  name='md-visibility-off'
                />
              )
            }
            onPress={this.togglePrivacy}
          >
            {label}
          </Button>
        </Flex>
      )
    }

    render() {
      const { visible, title, desc, onClose } = this.props
      const { focus, loading, rating } = this.state
      return (
        <>
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
            <Flex style={this.styles.wrap} justify='center'>
              {loading ? (
                <ActivityIndicator size='small' />
              ) : (
                <Flex style={this.styles.content} direction='column'>
                  <StarGroup value={rating} onChange={this.changeRating} />
                  {this.renderInputTags()}
                  <Flex style={this.styles.tags}>{this.renderTags()}</Flex>
                  {this.renderInputComment()}
                  {this.renderStatusBtnGroup()}
                  {this.renderSubmit()}
                </Flex>
              )}
            </Flex>
          </Modal>
        </>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
