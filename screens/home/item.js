/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 18:36:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Progress, Modal } from '@ant-design/react-native'
import {
  Activity,
  Flex,
  Icon,
  Image,
  Shadow,
  Text,
  Touchable
} from '@components'
import { Eps } from '@screens/_'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { pad } from '@utils'
import _, {
  wind,
  colorPlain,
  colorMain,
  colorBg,
  colorIcon,
  colorBorder,
  radiusXs
} from '@styles'

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
    const { subjectId } = this.props
    navigation.push('Subject', {
      subjectId
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
      <Touchable onPress={() => $.doWatchedNextEp(subjectId)}>
        <Flex justify='center'>
          <Icon
            style={styles.icon}
            name='ios-checkbox-outline'
            size={18}
            color={colorIcon}
          />
          <View style={[styles.placeholder, _.ml.sm]}>
            {doing ? (
              <Activity style={styles.activity} size='xs' />
            ) : (
              <Text type='sub' size={13}>
                {pad(sort)}
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
        <Touchable style={_.ml.md} onPress={() => $.showManageModal(subjectId)}>
          <Icon name='ios-star-outline' size={18} color={colorIcon} />
        </Touchable>
        {!isBook && (
          <Touchable
            style={_.ml.md}
            onPress={() => $.itemToggleExpand(subjectId)}
          >
            <Icon
              name='ios-menu'
              size={18}
              color={expand ? colorMain : colorIcon}
            />
          </Touchable>
        )}
      </Flex>
    )
  }

  render() {
    const { $ } = this.context
    const { top, subjectId, subject, epStatus } = this.props
    const { expand } = $.$Item(subjectId)
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
                  {$.isToday(subjectId) && (
                    <Text style={_.ml.sm} type='success' size={12}>
                      放送中
                    </Text>
                  )}
                </Flex>
              </Touchable>
              <View style={_.mt.sm}>
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
                  percent={$.percent(subjectId, subject)}
                  barStyle={styles.bar}
                />
              </View>
            </Flex.Item>
          </Flex>
          {expand && (
            <Eps
              style={_.mt.wind}
              login={$.isLogin}
              subjectId={subjectId}
              eps={$.eps(subjectId)}
              userProgress={$.userProgress(subjectId)}
              onSelect={$.doEpsSelect}
            />
          )}
          {top && <View style={styles.dot} />}
        </View>
      </Shadow>
    )
  }
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    padding: wind,
    backgroundColor: colorPlain,
    borderColor: colorBorder,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  icon: {
    marginBottom: -1
  },
  progress: {
    marginTop: 6,
    backgroundColor: colorBg
  },
  bar: {
    borderBottomWidth: 2,
    borderRadius: 2
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderLeftColor: colorBorder,
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-45deg' }]
  }
})
