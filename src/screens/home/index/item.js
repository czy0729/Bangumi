/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 15:01:20
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
import { IMG_WIDTH } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const itemPadding = 12
const layoutWidth = parseInt(_.window.width - _.wind * 2 - itemPadding) - 1
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
        onPress: $.expandAll
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
    const { $ } = this.context
    const { subjectId, subject } = this.props
    const { expand } = $.$Item(subjectId)
    const isBook = MODEL_SUBJECT_TYPE.getTitle(subject.type) === '书籍'
    return (
      <Flex style={this.styles.toolBar}>
        {this.renderBtnNextEp()}
        <Touchable
          style={[this.styles.touchable, _.ml.sm]}
          onPress={this.onStarPress}
        >
          <Iconfont name='star' size={18} />
        </Touchable>
        {!isBook && (
          <Touchable
            style={[this.styles.touchable, _.ml.sm]}
            onPress={this.onGridPress}
          >
            <Iconfont
              name={expand ? 'grid-full' : 'grid-half'}
              size={18}
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
        <Flex style={_.mr.md} justify='end'>
          <Text type='primary' size={20}>
            <Text type='primary' size={12} lineHeight={20}>
              Chap.{' '}
            </Text>
            {epStatus}
          </Text>
          {this.renderBookNextBtn(epStatus + 1, volStatus)}
          <Text style={_.ml.md} type='primary' size={20}>
            <Text type='primary' size={12} lineHeight={20}>
              Vol.{' '}
            </Text>
            {volStatus}
          </Text>
          {this.renderBookNextBtn(epStatus, volStatus + 1)}
        </Flex>
      )
    }

    return (
      <Text type='primary' size={20}>
        {epStatus || 1}
        <Text type='sub' size={12} lineHeight={20}>
          {' '}
          / {subject.eps_count || '?'}
        </Text>
      </Text>
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
    return (
      <View
        style={[
          this.styles.item,
          $.heatMap && expand && this.styles.itemWithHeatMap,
          $.itemShadow ? this.styles.itemShadow : this.styles.itemBorder
        ]}
      >
        <Flex style={this.styles.hd}>
          <Cover
            size={IMG_WIDTH}
            src={subject.images.medium}
            radius
            border={_.colorBorder}
            onPress={this.onPress}
            onLongPress={this.onLongPress}
          />
          <Flex.Item style={this.styles.content}>
            <Touchable withoutFeedback onPress={this.onPress}>
              <Flex align='start'>
                <Flex.Item style={this.styles.title}>
                  <Text size={15} numberOfLines={1} bold>
                    {HTMLDecode(subject.name_cn || subject.name)}
                  </Text>
                </Flex.Item>
                {isToday ? (
                  <Text style={_.ml.sm} type='success' lineHeight={15}>
                    {time.slice(0, 2)}:{time.slice(2, 4)}
                  </Text>
                ) : isNextDay ? (
                  <Text style={_.ml.sm} type='sub' lineHeight={15}>
                    明天{time.slice(0, 2)}:{time.slice(2, 4)}
                  </Text>
                ) : null}
              </Flex>
            </Touchable>
            <View style={_.mt.md}>
              <Flex>
                <Flex.Item>
                  <Touchable
                    style={this.styles.touchablePlaceholder}
                    onPress={this.onGridPress}
                  >
                    {this.renderCount()}
                  </Touchable>
                </Flex.Item>
                {this.renderToolBar()}
              </Flex>
              <Progress
                style={this.styles.progress}
                barStyle={this.styles.bar}
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
    marginBottom: itemPadding,
    backgroundColor: _.colorPlain,
    borderRadius: _.radiusXs
  },
  itemWithHeatMap: {
    paddingBottom: itemPadding + 4
  },
  itemBorder: {
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  },
  itemShadow: {
    shadowColor: _.colorShadow,
    shadowOffset: {
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16
  },
  hd: {
    paddingRight: itemPadding
  },
  content: {
    marginLeft: itemPadding
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
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 2,
    borderRadius: 2
  },
  eps: {
    marginTop: itemPadding
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
  },
  placeholder: {
    marginBottom: -1.5
  }
}))
