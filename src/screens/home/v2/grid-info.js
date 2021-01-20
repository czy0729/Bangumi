/*
 * @Author: czy0729
 * @Date: 2019-10-19 21:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:24:53
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { Eps, Cover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const imageWidth = 88 * (_.isPad ? 1.2 : 1)
const imageHeight = imageWidth * 1.4

export default
@obc
class GridInfo extends React.Component {
  static defaultProps = {
    subjectId: 0,
    subject: {},
    epStatus: ''
  }

  onPress = () => {
    const { navigation } = this.context
    const { subjectId, subject } = this.props
    t('首页.跳转', {
      to: 'Subject',
      from: 'grid',
      subjectId
    })

    navigation.push('Subject', {
      subjectId,
      _jp: subject.name,
      _cn: subject.name_cn || subject.name,
      _image: subject?.images?.medium || ''
    })
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

  get label() {
    const { subject } = this.props
    return MODEL_SUBJECT_TYPE.getTitle(subject.type)
  }

  renderBtnNextEp() {
    const { $ } = this.context
    const { subjectId } = this.props
    const { sort } = $.nextWatchEp(subjectId)
    if (!sort) {
      return null
    }

    return (
      <Touchable style={styles.touchable} onPress={this.onCheckPress}>
        <Flex justify='center'>
          <Iconfont style={styles.icon} name='check' size={18} />
          <View style={[styles.placeholder, _.ml.sm]}>
            <Text type='sub'>{sort}</Text>
          </View>
        </Flex>
      </Touchable>
    )
  }

  renderToolBar() {
    return (
      <Flex>
        {this.renderBtnNextEp()}
        <Touchable
          style={[styles.touchable, _.ml.sm]}
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
    if (this.label === '游戏') {
      return null
    }

    if (this.label === '书籍') {
      const { list = [] } = $.userCollection
      const { ep_status: epStatus, vol_status: volStatus } = list.find(
        item => item.subject_id === subjectId
      )
      return (
        <Flex justify='end'>
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
        style={styles.touchable}
        onPress={() => $.doUpdateNext(subjectId, epStatus, volStatus)}
      >
        <Flex justify='center'>
          <Iconfont style={styles.icon} name='check' size={18} />
        </Flex>
      </Touchable>
    )
  }

  render() {
    const { $ } = this.context
    const { subjectId, subject } = this.props
    const isToday = $.isToday(subjectId)
    const isNextDay = $.isNextDay(subjectId)
    const onAir = $.onAir[subjectId] || {}
    const time = onAir.timeCN || onAir.timeJP || ''
    return (
      <Flex style={styles.item} align='start'>
        <View>
          <Cover
            size={imageWidth}
            height={imageHeight}
            src={subject?.images?.medium || ''}
            radius
            shadow
            onPress={this.onPress}
          />
          {isToday ? (
            <Text style={_.mt.sm} type='success' align='center'>
              {time.slice(0, 2)}:{time.slice(2, 4)}
            </Text>
          ) : isNextDay ? (
            <Text style={_.mt.sm} type='sub' align='center'>
              明天{time.slice(0, 2)}:{time.slice(2, 4)}
            </Text>
          ) : null}
        </View>
        <Flex.Item style={_.ml.wind}>
          <Touchable onPress={this.onPress}>
            <Flex align='start'>
              <Flex.Item>
                <Text size={15} numberOfLines={1} bold>
                  {HTMLDecode(subject.name_cn || subject.name)}
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
          <Flex>
            <Flex.Item>{this.renderCount()}</Flex.Item>
            {this.renderToolBar()}
          </Flex>
          <Eps
            style={_.mt.xs}
            numbersOfLine={6}
            lines={3}
            login={$.isLogin}
            subjectId={subjectId}
            eps={$.eps(subjectId)}
            userProgress={$.userProgress(subjectId)}
            onSelect={this.onEpsSelect}
            onLongPress={this.onEpsLongPress}
          />
        </Flex.Item>
      </Flex>
    )
  }
}

const styles = _.create({
  item: {
    paddingVertical: 16,
    paddingHorizontal: _.wind
  },
  icon: {
    marginBottom: -1
  },
  touchable: {
    padding: _.sm
  },
  placeholder: {
    marginBottom: -1.5
  }
})
