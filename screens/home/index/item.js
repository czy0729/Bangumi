/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-17 17:03:16
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Progress, Modal } from '@ant-design/react-native'
import { Flex, Iconfont, Image, Shadow, Text, Touchable } from '@components'
import { Eps } from '@screens/_'
import { _ } from '@stores'
import { getCoverMedium } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

class Item extends React.Component {
  static defaultProps = {
    top: false,
    subjectId: 0,
    subject: {},
    epStatus: ''
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  onPress = () => {
    const { navigation } = this.context
    const { subjectId, subject } = this.props
    navigation.push('Subject', {
      subjectId,
      _jp: subject.name,
      _cn: subject.name_cn || subject.name,
      _image: getCoverMedium(subject.images.medium)
    })
  }

  onLongPress = () => {
    const { $ } = this.context
    const { top } = $.state
    const { subjectId } = this.props
    const isTop = top.indexOf(subjectId) !== -1
    const data = [
      {
        text: (
          <Text
            style={{
              color: _.colorDark
            }}
          >
            全部展开
          </Text>
        ),
        onPress: () => {
          $.expandAll()
        }
      },
      {
        text: (
          <Text
            style={{
              color: _.colorDark
            }}
          >
            全部收起
          </Text>
        ),
        onPress: () => {
          $.closeAll()
        }
      },
      {
        text: (
          <Text
            style={{
              color: _.colorDark
            }}
          >
            置顶
          </Text>
        ),
        onPress: () => {
          $.itemToggleTop(subjectId, true)
        }
      }
    ]
    if (isTop) {
      data.push({
        text: (
          <Text
            style={{
              color: _.colorDark
            }}
          >
            取消置顶
          </Text>
        ),
        onPress: () => {
          $.itemToggleTop(subjectId, false)
        }
      })
    }
    Modal.operation(data)
  }

  renderBtnNextEp() {
    const { $ } = this.context
    const { subjectId } = this.props
    const { sort } = $.nextWatchEp(subjectId)
    if (!sort) {
      return null
    }

    return (
      <Touchable
        style={this.styles.touchable}
        onPress={() => $.doWatchedNextEp(subjectId)}
      >
        <Flex justify='center'>
          <Iconfont style={this.styles.icon} name='check' size={16} />
          <View style={[this.styles.placeholder, _.ml.sm]}>
            <Text type='sub' size={12}>
              {sort}
            </Text>
          </View>
        </Flex>
      </Touchable>
    )
  }

  renderToolBar() {
    const { $ } = this.context
    const { subjectId, subject } = this.props
    const { expand } = $.$Item(subjectId)
    const isBook = MODEL_SUBJECT_TYPE.getTitle(subject.type) === '书籍'
    return (
      <Flex style={this.styles.toolBar}>
        {this.renderBtnNextEp()}
        <Touchable
          style={[this.styles.touchable, _.ml.sm]}
          onPress={() => $.showManageModal(subjectId)}
        >
          <Iconfont name='star' size={16} />
        </Touchable>
        {!isBook && (
          <Touchable
            style={[this.styles.touchable, _.ml.sm]}
            onPress={() => $.itemToggleExpand(subjectId)}
          >
            <Iconfont
              name={expand ? 'grid-full' : 'grid-half'}
              size={16}
              color={expand ? _.colorMain : _.colorIcon}
            />
          </Touchable>
        )}
      </Flex>
    )
  }

  renderCount() {
    const { $ } = this.context
    const { subjectId, subject, epStatus } = this.props
    const { expand } = $.$Item(subjectId)
    if (expand) {
      return null
    }

    const label = MODEL_SUBJECT_TYPE.getTitle(subject.type)
    if (label === '书籍') {
      const { list = [] } = $.userCollection
      const { ep_status: epStatus, vol_status: volStatus } = list.find(
        item => item.subject_id === subjectId
      )
      return (
        <Flex>
          <Flex align='baseline'>
            <Text type='primary' size={10} lineHeight={1}>
              Chap.
            </Text>
            <Text style={_.ml.xs} type='primary' size={18} lineHeight={1}>
              {epStatus}
            </Text>
            <Text style={_.ml.xs} type='sub' size={10} lineHeight={1}>
              / ?
            </Text>
          </Flex>
          {this.renderBookNextBtn(subjectId, epStatus + 1, volStatus)}
          <Flex style={_.ml.md} align='baseline'>
            <Text type='primary' size={10} lineHeight={1}>
              Vol.
            </Text>
            <Text style={_.ml.xs} type='primary' size={18} lineHeight={1}>
              {volStatus}
            </Text>
            <Text style={_.ml.xs} type='sub' size={10} lineHeight={1}>
              / ?
            </Text>
          </Flex>
          {this.renderBookNextBtn(subjectId, epStatus, volStatus + 1)}
        </Flex>
      )
    }

    return (
      <Flex align='baseline'>
        <Text type='primary' size={18} lineHeight={1}>
          {epStatus || 1}
        </Text>
        <Text style={_.ml.xs} type='sub' size={10} lineHeight={1}>
          / {subject.eps_count || '?'}
        </Text>
      </Flex>
    )
  }

  renderBookNextBtn(subjectId, epStatus, volStatus) {
    const { $ } = this.context
    return (
      <Touchable
        style={this.styles.touchable}
        onPress={() => $.doUpdateNext(subjectId, epStatus, volStatus)}
      >
        <Flex justify='center'>
          <Iconfont style={this.styles.icon} name='check' size={16} />
        </Flex>
      </Touchable>
    )
  }

  render() {
    const { $, navigation } = this.context
    const { top, subjectId, subject } = this.props
    const { expand } = $.$Item(subjectId)
    const isToday = $.isToday(subjectId)
    const isNextDay = $.isNextDay(subjectId)
    const isBook = MODEL_SUBJECT_TYPE.getTitle(subject.type) === '书籍'
    const doing = isBook ? '读' : '看'
    return (
      <Shadow style={_.mb.md} initHeight={120}>
        <View style={this.styles.item}>
          <Flex style={this.styles.hd}>
            <Image
              size={88}
              src={getCoverMedium(subject.images.medium)}
              radius
              border={_.colorBorder}
              onPress={this.onPress}
              onLongPress={this.onLongPress}
            />
            <Flex.Item
              style={{
                marginLeft: 12
              }}
            >
              <Touchable withoutFeedback onPress={this.onPress}>
                <Flex align='start'>
                  <Flex.Item style={this.styles.title}>
                    <Text numberOfLines={1}>
                      {subject.name_cn || subject.name}
                    </Text>
                    <Text style={_.mt.xs} type='sub' size={11}>
                      {subject.collection.doing} 人在{doing}
                    </Text>
                  </Flex.Item>
                  {isToday ? (
                    <Text
                      style={_.ml.sm}
                      type='success'
                      size={12}
                      lineHeight={14}
                    >
                      {$.onAir[subjectId].timeCN.slice(0, 2)}:
                      {$.onAir[subjectId].timeCN.slice(2, 4)}
                    </Text>
                  ) : isNextDay ? (
                    <Text style={_.ml.sm} type='sub' size={12} lineHeight={14}>
                      明天{$.onAir[subjectId].timeCN.slice(0, 2)}:
                      {$.onAir[subjectId].timeCN.slice(2, 4)}
                    </Text>
                  ) : null}
                </Flex>
              </Touchable>
              <View style={_.mt.md}>
                <Flex>
                  <Flex.Item>{this.renderCount()}</Flex.Item>
                  {this.renderToolBar()}
                </Flex>
                <Progress
                  style={this.styles.progress}
                  barStyle={this.styles.bar}
                  percent={$.percent(subjectId, subject)}
                />
              </View>
            </Flex.Item>
          </Flex>
          {expand && (
            <Eps
              style={_.mt.md}
              marginRight={_.wind}
              login={$.isLogin}
              subjectId={subjectId}
              eps={$.eps(subjectId)}
              userProgress={$.userProgress(subjectId)}
              onSelect={(value, item, subjectId) =>
                $.doEpsSelect(value, item, subjectId, navigation)
              }
              onLongPress={item => $.doEpsLongPress(item, subjectId)}
            />
          )}
          {top && <View style={this.styles.dot} />}
        </View>
      </Shadow>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: _.wind,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain,
    borderColor: _.colorBorder,
    borderWidth: _.hairlineWidth,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  hd: {
    paddingRight: _.wind
  },
  toolBar: {
    marginRight: -8
  },
  icon: {
    marginBottom: -1
  },
  progress: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 2,
    borderRadius: 2
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: _.colorBorder,
    transform: [
      {
        rotate: '-45deg'
      }
    ]
  },
  touchable: {
    padding: _.sm
  }
}))
