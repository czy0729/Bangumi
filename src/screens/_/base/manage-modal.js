/*
 * @Author: czy0729
 * @Date: 2019-03-18 05:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-24 08:31:32
 */
import React from 'react'
import { BackHandler, ScrollView, View } from 'react-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Button, Flex, Input, Text, Touchable, Iconfont } from '@components'
import Modal from '@components/@/ant-design/modal'
import { _, collectionStore, subjectStore, systemStore } from '@stores'
import { window } from '@styles'
import { setStorage, getStorage } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_PRIVATE } from '@constants/model'
import { StarGroup } from './star-group'
import { StatusBtnGroup } from './status-btn-group'

const initState = {
  focus: false,
  loading: true,
  fetching: false,
  rating: 0,
  tags: '',
  showTags: true,
  comment: '',
  status: '',
  privacy: MODEL_PRIVATE.getValue('公开')
}
const storageKey = 'ManageModal|privacy'

export const ManageModal = ob(
  class extends React.Component {
    static defaultProps = {
      visible: false,
      subjectId: 0,
      title: '',
      desc: '',
      action: '看',
      onSubmit: Function.prototype,
      onClose: Function.prototype
    }

    state = initState
    commentRef

    async componentDidMount() {
      const privacy = (await getStorage(storageKey)) || MODEL_PRIVATE.getValue('公开')
      this.setState({
        showTags: systemStore.setting.showTags,
        privacy
      })
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
      const { visible, subjectId } = nextProps
      if (visible) {
        if (!this.props.visible) {
          this.setState({
            loading: false,
            focus: false
          })

          const {
            rating,
            tag = [],
            comment,
            private: privacy,
            status = {}
          } = await collectionStore.fetchCollection(subjectId)

          const state = {
            rating,
            tags: tag.join(' '),
            comment,
            status: status.type
          }
          if (privacy !== undefined) {
            state.privacy = privacy
          }
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
      const label = MODEL_PRIVATE.getLabel(privacy)
      const _privacy = MODEL_PRIVATE.getValue(label === '公开' ? '私密' : '公开')
      this.setState({
        privacy: _privacy
      })
      setStorage(storageKey, _privacy)
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

    get subjectFormHTML() {
      const { subjectId } = this.props
      return subjectStore.subjectFormHTML(subjectId)
    }

    get numberOfLines() {
      if (!_.isPad && _.isLandscape) return 2
      return _.device(5, 6)
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
              点击获取大家的标注
            </Text>
          </Touchable>
        )
      }

      const selected = this.state.tags.split(' ')
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode='never'
        >
          {tags.map(({ name, count }) => {
            const isSelected = selected.indexOf(name) !== -1
            return (
              <Touchable
                style={this.styles.touchTag}
                key={name}
                onPress={() => this.toggleTag(name)}
              >
                <Flex style={[this.styles.tag, isSelected && this.styles.tagSelected]}>
                  <Text size={13} type={_.select('desc', isSelected ? 'main' : 'desc')}>
                    {name}
                  </Text>
                  <Text
                    style={_.ml.xs}
                    type={_.select('sub', isSelected ? 'main' : 'desc')}
                    size={13}
                  >
                    {count}
                  </Text>
                </Flex>
              </Touchable>
            )
          })}
        </ScrollView>
      )
    }

    render() {
      const { visible, title, desc, action, onClose } = this.props
      const { focus, loading, rating, tags, comment, status, privacy } = this.state
      const label = MODEL_PRIVATE.getLabel(privacy)
      return (
        <Modal
          style={[this.styles.modal, focus && this.styles.focus]}
          visible={visible}
          title={
            <Text type='title' size={16}>
              {title}
            </Text>
          }
          transparent
          maskClosable
          closable
          onClose={onClose}
        >
          <Text style={_.mt.sm} type='sub' size={13} align='center'>
            {desc}
          </Text>
          <Flex style={[this.styles.wrap, _.mt.sm]} justify='center'>
            {loading ? (
              <ActivityIndicator size='small' />
            ) : (
              <Flex style={this.styles.content} direction='column'>
                <StarGroup value={rating} onChange={this.changeRating} />
                <Input
                  style={_.mt.md}
                  defaultValue={tags}
                  placeholder='我的标签'
                  returnKeyType='next'
                  onChangeText={text => this.changeText('tags', text)}
                  onSubmitEditing={() => this.commentRef.inputRef.focus()}
                />
                <Flex style={this.styles.tags}>{this.renderTags()}</Flex>
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
                <StatusBtnGroup
                  style={_.mt.md}
                  value={status}
                  action={action}
                  onSelect={this.changeStatus}
                />
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

const memoStyles = _.memoStyles(() => ({
  modal: {
    width: (_.window.width - 2 * _.wind) * _.ratio,
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  focus: {
    marginTop: -parseInt(window.height * 0.32)
  },
  wrap: {
    minHeight: _.device(380, 448)
  },
  content: {
    width: '100%',
    maxWidth: window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.isMobileLanscape ? -24 : 0
  },
  tags: {
    width: '100%',
    height: 54 * _.ratio,
    paddingVertical: 12
  },
  tag: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderWidth: _.select(1, 0),
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  tagSelected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel2)
  },
  btnEye: {
    width: 88 * _.ratio,
    marginLeft: _.sm
  },
  touch: {
    padding: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchTag: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
