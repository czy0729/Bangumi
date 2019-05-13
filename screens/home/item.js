/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-13 12:12:13
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ActivityIndicator, Progress, Modal } from '@ant-design/react-native'
import { Flex, Iconfont, Image, Shadow, Text, Touchable } from '@components'
import { Eps } from '@screens/_'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'

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
      _image: subject.images.medium
    })
  }

  onLongPress = () => {
    const { $ } = this.context
    const { top } = $.state
    const { subjectId } = this.props
    const isTop = top.indexOf(subjectId) !== -1
    const data = [
      {
        text: <Text>置顶</Text>,
        onPress: () => {
          $.itemToggleTop(subjectId, true)
        }
      }
    ]
    if (isTop) {
      data.push({
        text: <Text>取消置顶</Text>,
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

    const { doing } = $.$Item(subjectId)
    return (
      <Touchable
        style={styles.touchable}
        onPress={() => $.doWatchedNextEp(subjectId)}
      >
        <Flex justify='center'>
          <Iconfont style={styles.icon} name='check' size={16} />
          <View style={[styles.placeholder, _.ml.sm]}>
            {doing ? (
              <ActivityIndicator size='small' />
            ) : (
              <Text type='sub' size={13}>
                {sort}
              </Text>
            )}
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
      <Flex>
        {this.renderBtnNextEp()}
        <Touchable
          style={[styles.touchable, _.ml.sm]}
          onPress={() => $.showManageModal(subjectId)}
        >
          <Iconfont name='star' size={16} />
        </Touchable>
        {!isBook && (
          <Touchable
            style={[styles.touchable, _.ml.sm]}
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

  render() {
    const { $, navigation } = this.context
    const { top, subjectId, subject, epStatus } = this.props
    const { expand } = $.$Item(subjectId)
    const isToday = $.isToday(subjectId)
    const isBook = MODEL_SUBJECT_TYPE.getTitle(subject.type) === '书籍'
    const doing = isBook ? '读' : '看'
    return (
      <Shadow style={_.mb.md} initHeight={120}>
        <View style={styles.item}>
          <Flex>
            <Image
              size={72}
              src={subject.images.medium}
              radius
              onPress={this.onPress}
              onLongPress={this.onLongPress}
            />
            <Flex.Item style={_.ml.wind}>
              <Touchable withoutFeedback onPress={this.onPress}>
                <Flex align='start'>
                  <Flex.Item style={styles.title}>
                    <Text numberOfLines={1}>
                      {subject.name_cn || subject.name}
                    </Text>
                    <Text style={_.mt.xs} type='sub' size={11}>
                      {subject.collection.doing} 人在{doing}
                    </Text>
                  </Flex.Item>
                  {!top && isToday && (
                    <Text style={_.ml.sm} type='success' size={12}>
                      放送中
                    </Text>
                  )}
                </Flex>
              </Touchable>
              <View>
                <Flex>
                  <Flex.Item>
                    {!expand && (
                      <Flex align='baseline'>
                        <Text type='primary' size={18} lineHeight={1}>
                          {epStatus}
                        </Text>
                        <Text
                          style={_.ml.xs}
                          type='sub'
                          size={10}
                          lineHeight={1}
                        >
                          / {subject.eps_count || '-'}
                        </Text>
                      </Flex>
                    )}
                  </Flex.Item>
                  {this.renderToolBar()}
                </Flex>
                <Progress
                  style={styles.progress}
                  barStyle={styles.bar}
                  percent={$.percent(subjectId, subject)}
                />
              </View>
            </Flex.Item>
          </Flex>
          {expand && (
            <Eps
              style={_.mt.md}
              login={$.isLogin}
              subjectId={subjectId}
              eps={$.eps(subjectId)}
              userProgress={$.userProgress(subjectId)}
              onSelect={(value, item, subjectId) =>
                $.doEpsSelect(value, item, subjectId, navigation)
              }
            />
          )}
          {top && (
            <View
              style={[
                styles.dot,
                {
                  borderLeftColor: isToday ? _.colorSuccess : _.colorBorder
                }
              ]}
            />
          )}
        </View>
      </Shadow>
    )
  }
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    padding: _.wind,
    backgroundColor: _.colorPlain,
    borderColor: _.colorBorder,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  icon: {
    marginBottom: -1
  },
  progress: {
    backgroundColor: _.colorBg
  },
  bar: {
    borderBottomWidth: 2,
    borderRadius: 2,
    backgroundColor: 'transparent'
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-45deg' }]
  },
  touchable: {
    padding: _.sm
  }
})
