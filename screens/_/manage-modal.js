/*
 * @Author: czy0729
 * @Date: 2019-03-18 05:01:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 03:35:11
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Modal } from '@ant-design/react-native'
import { Activity, Button, Flex, Icon, Input, Text } from '@components'
import { collectionStore } from '@stores'
import { MODEL_PRIVATE } from '@constants/model'
import _, { window, wind, colorBg, colorPlain } from '@styles'
import StarGroup from './star-group'
import StatusBtnGroup from './status-btn-group'

const initState = {
  loading: true,
  doing: false,
  rating: 0,
  tags: '',
  comment: '',
  status: '',
  privacy: MODEL_PRIVATE.getValue('公开')
}

class ManageModal extends React.Component {
  static defaultProps = {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    onSubmit: () => {},
    onClose: () => {}
  }

  state = initState

  async componentWillReceiveProps(nextProps) {
    const { visible, subjectId } = nextProps
    if (visible) {
      if (!this.props.visible) {
        const {
          rating,
          tag = [],
          comment,
          private: privacy,
          status: { type }
        } = await collectionStore.fetchCollection(subjectId)
        this.setState({
          loading: false,
          rating,
          tags: tag.join(' '),
          comment,
          status: type,
          privacy
        })
      }
    } else {
      // <Modal>有渐出动画
      setTimeout(() => {
        this.setState(initState)
      }, 400)
    }
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

  togglePrivacy = () => {
    const { privacy } = this.state
    const label = MODEL_PRIVATE.getLabel(privacy)
    this.setState({
      privacy: MODEL_PRIVATE.getValue(label === '公开' ? '私密' : '公开')
    })
  }

  onSubmit = async () => {
    const { subjectId, onSubmit } = this.props
    const { rating, tags, comment, status, privacy } = this.state

    this.setState({
      doing: true
    })

    await onSubmit({
      subjectId,
      rating,
      tags,
      comment,
      status,
      privacy
    })

    this.setState({
      doing: false
    })
  }

  render() {
    const { visible, title, desc, onClose } = this.props
    const {
      loading,
      doing,
      rating,
      tags,
      comment,
      status,
      privacy
    } = this.state
    return (
      <Modal
        style={styles.modal}
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
        <Text style={_.mt.sm} type='sub' size={12} align='center'>
          {desc}
        </Text>
        <Flex style={[styles.wrap, _.mt.sm]} justify='center'>
          {loading ? (
            <Activity />
          ) : (
            <Flex style={styles.content} direction='column'>
              <StarGroup value={rating} onChange={this.changeRating} />
              <Input
                style={_.mt.md}
                defaultValue={tags}
                placeholder='我的标签'
                onChangeText={text => this.changeText('tags', text)}
              />
              <Input
                style={_.mt.sm}
                defaultValue={comment}
                placeholder='吐槽点什么'
                multiline
                numberOfLines={4}
                onChangeText={text => this.changeText('comment', text)}
              />
              <StatusBtnGroup
                style={_.mt.md}
                value={status}
                onSelect={this.changeStatus}
              />
              <Flex style={_.mt.md}>
                <Flex.Item>
                  <Button type='main' loading={doing} onPress={this.onSubmit}>
                    更新收藏状态
                  </Button>
                </Flex.Item>
                <Button
                  style={[styles.btnEye, _.ml.sm]}
                  type='main'
                  onPress={this.togglePrivacy}
                >
                  <Icon
                    name={
                      MODEL_PRIVATE.getLabel(privacy) === '公开'
                        ? 'ios-eye'
                        : 'ios-eye-off'
                    }
                    size={24}
                    color={colorPlain}
                  />
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Modal>
    )
  }
}

export default observer(ManageModal)

const styles = StyleSheet.create({
  modal: {
    width: window.width - 2 * wind,
    backgroundColor: colorBg
  },
  wrap: {
    height: 340
  },
  content: {
    width: '100%',
    maxWidth: window.maxWidth,
    paddingBottom: 8
  },
  btnEye: {
    width: 56
  }
})
