/*
 * 条目收藏管理弹窗
 *
 * @Author: czy0729
 * @Date: 2019-03-18 05:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:01:27
 */
import React from 'react'
import { BackHandler, View } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Modal, Button, Flex, Input, Text, Touchable, Iconfont } from '@components'
import { _, collectionStore, subjectStore, systemStore } from '@stores'
import { setStorage, getStorage } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_PRIVATE } from '@constants'
import { Private, PrivateCn } from '@types'
import { StarGroup } from '../star-group'
import { StatusBtnGroup } from '../status-btn-group'
import { STORAGE_KEY } from './ds'
import { memoStyles } from './styles'
import { Props as ManageModalProps, State } from './types'

export { ManageModalProps }

export const ManageModal = ob(
  class ManageModalComponent extends React.Component<ManageModalProps, State> {
    static defaultProps: ManageModalProps = {
      visible: false,
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
      comment: '',
      status: '',
      privacy: MODEL_PRIVATE.getValue<Private>('公开')
    }

    commentRef: any

    async componentDidMount() {
      const privacy =
        (await getStorage(STORAGE_KEY)) || MODEL_PRIVATE.getValue<Private>('公开')
      this.setState({
        showTags: systemStore.setting.showTags === true,
        privacy
      })
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
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

    changeRating = value => {
      this.setState({
        rating: value
      })
    }

    changeText = (name, text) => {
      // @ts-expect-error
      this.setState({
        [name]: text
      })
    }

    changeStatus = status => {
      this.setState({
        status
      })
    }

    toggleTag = name => {
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
      const _privacy = MODEL_PRIVATE.getValue<Private>(
        label === '公开' ? '私密' : '公开'
      )
      this.setState({
        privacy: _privacy
      })
      setStorage(STORAGE_KEY, _privacy)
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
      await onSubmit({
        subjectId,
        rating,
        tags,
        status,
        privacy,
        comment: comment || ''
      })
    }

    onSubmitEditing = () => {
      try {
        if (typeof this?.commentRef?.inputRef?.focus === 'function') {
          this.commentRef.inputRef.focus()
        }
      } catch (error) {}
    }

    get subjectFormHTML() {
      const { subjectId } = this.props
      return subjectStore.subjectFormHTML(subjectId)
    }

    get numberOfLines() {
      if (!_.isPad && _.isLandscape) return 2
      return _.device(4, 6)
    }

    renderInputTags() {
      const { tags } = this.state
      return (
        <Input
          style={this.styles.inputTags}
          defaultValue={tags}
          placeholder='我的标签'
          returnKeyType='next'
          onChangeText={text => this.changeText('tags', text)}
          onSubmitEditing={this.onSubmitEditing}
        />
      )
    }

    renderTags() {
      const { fetching } = this.state
      if (fetching) {
        return (
          <View style={_.ml.xs}>
            <ActivityIndicator />
          </View>
        )
      }

      const { _loaded, tags } = this.subjectFormHTML
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
      return (
        <Flex style={this.styles.tagsWrap} wrap='wrap'>
          {tags
            .filter((item, index) => index < 15)
            .map(({ name, count }) => {
              const isSelected = selected.indexOf(name) !== -1
              return (
                <Touchable
                  style={this.styles.touchTag}
                  key={name}
                  onPress={() => this.toggleTag(name)}
                >
                  <Flex
                    style={[this.styles.tag, isSelected && this.styles.tagSelected]}
                  >
                    <Text
                      size={12}
                      bold
                      type={_.select('desc', isSelected ? 'main' : 'desc')}
                    >
                      {name}
                    </Text>
                    <Text
                      style={_.ml.xs}
                      type={_.select('sub', isSelected ? 'main' : 'sub')}
                      size={12}
                    >
                      {count}
                    </Text>
                  </Flex>
                </Touchable>
              )
            })}
        </Flex>
      )
    }

    renderInputComment() {
      const { comment } = this.state
      return (
        <Input
          ref={ref => (this.commentRef = ref)}
          style={_.mt.xs}
          defaultValue={comment}
          placeholder='吐槽点什么'
          multiline
          numberOfLines={this.numberOfLines}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={text => this.changeText('comment', text)}
        />
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
      const { privacy } = this.state
      const label = MODEL_PRIVATE.getLabel<PrivateCn>(privacy)
      return (
        <Flex style={_.mt.md}>
          <Flex.Item>
            <Button type='main' onPress={this.onSubmit}>
              更新
            </Button>
          </Flex.Item>
          <Button
            style={this.styles.btnEye}
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
        <Modal
          style={this.styles.modal}
          visible={visible}
          title={title}
          focus={focus}
          onClose={onClose}
        >
          <Text style={_.mt.sm} type='sub' size={13} align='center'>
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
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
