/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 05:24:51
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Progress, Modal } from '@ant-design/react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Eps, Cover } from '@screens/_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { IOS, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const itemPadding = _._wind
const layoutWidth = _.window.contentWidth - _.wind
const wrapWidth = layoutWidth - IMG_WIDTH - _.wind - itemPadding + 2
const colorDark = {
  color: _.colorDark
}

class Item extends React.Component {
  static defaultProps = {
    subjectId: 0,
    subject: {},
    epStatus: ''
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  onPress = () => {
    t('首页.跳转', {
      to: 'Subject',
      from: 'list'
    })

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
        text: <Text style={colorDark}>全部展开</Text>,
        onPress: () =>
          setTimeout(() => {
            $.expandAll()
          }, 40)
      },
      {
        text: <Text style={colorDark}>全部收起</Text>,
        onPress: $.closeAll
      },
      {
        text: <Text style={colorDark}>置顶</Text>,
        onPress: () => $.itemToggleTop(subjectId, true)
      }
    ]
    if (isTop) {
      data.push({
        text: <Text style={colorDark}>取消置顶</Text>,
        onPress: () => $.itemToggleTop(subjectId, false)
      })
    }
    Modal.operation(data)
  }

  onEpsSelect = (value, item) => {
    const { $, navigation } = this.context
    const { subjectId } = this.props
    $.doEpsSelect(value, item, subjectId, navigation)
  }

  onEpsLongPress = item => {
    const { $ } = this.context
    const { subjectId } = this.props
    $.doEpsLongPress(item, subjectId)
  }

  onCheckPress = () => {
    const { $ } = this.context
    const { subjectId } = this.props
    $.doWatchedNextEp(subjectId)
  }

  onStarPress = () => {
    const { $ } = this.context
    const { subjectId } = this.props
    $.showManageModal(subjectId)
  }

  onGridPress = () => {
    const { $ } = this.context
    const { subjectId } = this.props
    $.itemToggleExpand(subjectId)
  }

  get isTop() {
    const { $ } = this.context
    const { subjectId } = this.props
    const { top } = $.state
    return top.indexOf(subjectId) !== -1
  }

  renderBtnNextEp() {
    const { $ } = this.context
    const { subjectId } = this.props
    const { sort } = $.nextWatchEp(subjectId)
    if (!sort) {
      return null
    }

    return (
      <Touchable style={this.styles.touchable} onPress={this.onCheckPress}>
        <Flex justify='center'>
          <Iconfont style={this.styles.icon} name='check' size={18} />
          <View style={[this.styles.placeholder, _.ml.sm]}>
            <Text type='sub'>{sort}</Text>
          </View>
        </Flex>
      </Touchable>
    )
  }

  renderToolBar() {
    return (
      <Flex style={this.styles.toolBar}>
        {this.renderBtnNextEp()}
        <Touchable
          style={[this.styles.touchable, _.ml.sm]}
          onPress={this.onStarPress}
        >
          <Iconfont name='star' size={18} />
        </Touchable>
      </Flex>
    )
  }

  renderCount() {
    const { $ } = this.context
    const { subjectId, subject, epStatus } = this.props
    const label = MODEL_SUBJECT_TYPE.getTitle(subject.type)
    if (label === '书籍') {
      const { list = [] } = $.userCollection
      const { ep_status: epStatus, vol_status: volStatus } = list.find(
        item => item.subject_id === subjectId
      )
      return (
        <Flex>
          <Text type='primary' size={20}>
            <Text type='primary' size={12} lineHeight={20}>
              Chap.{' '}
            </Text>
            {epStatus}
          </Text>
          {this.renderBookNextBtn(epStatus + 1, volStatus)}
          <Text style={_.ml.sm} type='primary' size={20}>
            <Text type='primary' size={12} lineHeight={20}>
              Vol.{' '}
            </Text>
            {volStatus}
          </Text>
          {this.renderBookNextBtn(epStatus, volStatus + 1)}
        </Flex>
      )
    }

    const { expand } = $.$Item(subjectId)
    const isBook = MODEL_SUBJECT_TYPE.getTitle(subject.type) === '书籍'
    let _epStatus = epStatus
    if (!_epStatus) {
      const userProgress = $.userProgress(subjectId)
      _epStatus = Object.keys(userProgress).length ? 1 : 0
    }
    return (
      <Flex>
        <Text type='primary' size={20}>
          {epStatus || _epStatus}
          <Text type='sub' size={13} lineHeight={20}>
            {' '}
            / {subject.eps_count || '?'}{' '}
          </Text>
          {!isBook && (
            <Iconfont
              name={expand ? 'down' : 'up'}
              size={13}
              lineHeight={(20 + _.fontSizeAdjust) * _.lineHeightRatio}
              color={_.colorIcon}
            />
          )}
        </Text>
      </Flex>
    )
  }

  renderBookNextBtn(epStatus, volStatus) {
    const { $ } = this.context
    const { subjectId } = this.props
    return (
      <Touchable
        style={this.styles.touchable}
        onPress={() => $.doUpdateNext(subjectId, epStatus, volStatus)}
      >
        <Flex justify='center'>
          <Iconfont style={this.styles.icon} name='check' size={18} />
        </Flex>
      </Touchable>
    )
  }

  render() {
    const { $ } = this.context
    const { subjectId, subject, epStatus } = this.props
    const { expand } = $.$Item(subjectId)
    const isToday = $.isToday(subjectId)
    const isNextDay = $.isNextDay(subjectId)
    const percent = subject.eps_count
      ? (parseInt(epStatus || 0) / parseInt(subject.eps_count)) * 100
      : 0
    const onAir = $.onAir[subjectId] || {}
    const time = onAir.timeCN || onAir.timeJP || ''
    const isBook = MODEL_SUBJECT_TYPE.getTitle(subject.type) === '书籍'
    const doing = isBook ? '读' : '看'
    return (
      <View
        style={[
          this.styles.item,
          $.heatMap && expand && this.styles.itemWithHeatMap
        ]}
      >
        <Flex style={this.styles.hd}>
          <Cover
            src={subject.images.medium}
            size={IMG_WIDTH}
            height={IMG_HEIGHT}
            radius
            shadow
            onPress={this.onPress}
            onLongPress={this.onLongPress}
          />
          <Flex.Item style={this.styles.content}>
            <Touchable
              style={this.styles.title}
              withoutFeedback
              onPress={this.onPress}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Text size={15} numberOfLines={2} bold>
                    {HTMLDecode(subject.name_cn || subject.name)}
                  </Text>
                  <Text style={_.mt.xs} type='sub' size={12}>
                    {subject.collection.doing} 人在{doing}
                  </Text>
                </Flex.Item>
                {isToday ? (
                  <Text
                    style={_.ml.sm}
                    type='success'
                    size={13}
                    lineHeight={15}
                    bold
                  >
                    {time.slice(0, 2)}:{time.slice(2, 4)}
                  </Text>
                ) : isNextDay ? (
                  <Text
                    style={_.ml.sm}
                    type='sub'
                    size={13}
                    lineHeight={15}
                    bold
                  >
                    明天{time.slice(0, 2)}:{time.slice(2, 4)}
                  </Text>
                ) : null}
              </Flex>
            </Touchable>
            <View>
              <Flex style={this.styles.info}>
                <Flex.Item>
                  {isBook ? (
                    <View style={this.styles.touchablePlaceholder}>
                      {this.renderCount()}
                    </View>
                  ) : (
                    <Touchable
                      style={this.styles.touchablePlaceholder}
                      onPress={this.onGridPress}
                    >
                      {this.renderCount()}
                    </Touchable>
                  )}
                </Flex.Item>
                {this.renderToolBar()}
              </Flex>
              <Progress
                style={this.styles.progress}
                barStyle={this.styles.bar}
                wrapWidth={wrapWidth}
                percent={percent}
              />
            </View>
          </Flex.Item>
        </Flex>
        {expand && (
          <Eps
            style={this.styles.eps}
            layoutWidth={layoutWidth}
            marginRight={itemPadding}
            login={$.isLogin}
            subjectId={subjectId}
            eps={$.eps(subjectId)}
            userProgress={$.userProgress(subjectId)}
            onSelect={this.onEpsSelect}
            onLongPress={this.onEpsLongPress}
          />
        )}
        {this.isTop && <View style={this.styles.dot} />}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: itemPadding,
    paddingLeft: itemPadding,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  itemWithHeatMap: {
    paddingBottom: itemPadding + 4
  },
  itemBorder: {
    borderBottomWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  hd: {
    paddingRight: itemPadding
  },
  content: {
    marginLeft: itemPadding - 2
  },
  title: {
    minHeight: 60
  },
  info: {
    height: 40
  },
  toolBar: {
    marginRight: -itemPadding / 2 - 3
  },
  touchablePlaceholder: {
    width: '100%',
    minHeight: 24
  },
  icon: {
    marginBottom: -1
  },
  progress: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 4
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 4,
    borderRadius: 4
  },
  eps: {
    marginTop: itemPadding
  },
  dot: {
    position: 'absolute',
    top: 6,
    right: 6,
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
    paddingLeft: _.sm,
    paddingRight: _.sm + 2
  },
  placeholder: {
    marginBottom: -1.5
  }
}))
