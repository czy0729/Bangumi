/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:20:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 16:18:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import Cover from './cover'
import Title from './title'
import OnAir from './onair'
import Eps from './eps'
import Count from './count'
import ToolBar from './tool-bar'
import Progress from './progress'
import { itemPadding } from './ds'

const LIMIT_HEAVY_RENDER = _.isPad ? 20 : 10

export default
@obc
class Item extends React.Component {
  static defaultProps = {
    index: '',
    subjectId: 0,
    subject: {},
    epStatus: ''
  }

  get isTop() {
    const { $ } = this.context
    const { subjectId } = this.props
    const { top } = $.state
    return top.indexOf(subjectId) !== -1
  }

  get isLazyRendered() {
    const { $ } = this.context
    const { index } = this.props
    const { _mounted } = $.state
    return index >= LIMIT_HEAVY_RENDER && !_mounted
  }

  render() {
    if (this.isLazyRendered) {
      return <View style={this.styles.lazy} />
    }

    const { $, navigation } = this.context
    const { index, subjectId, subject, epStatus } = this.props
    const { expand } = $.$Item(subjectId)
    return (
      <View
        style={
          $.heatMap && expand ? this.styles.itemWithHeatMap : this.styles.item
        }
      >
        <Flex style={this.styles.hd}>
          <Cover index={index} subjectId={subjectId} subject={subject} />
          <Flex.Item style={this.styles.content}>
            <Touchable
              style={this.styles.title}
              withoutFeedback
              onPress={() => $.onItemPress(navigation, subjectId, subject)}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Title subject={subject} />
                </Flex.Item>
                <OnAir subjectId={subjectId} />
              </Flex>
            </Touchable>
            <View>
              <Flex style={this.styles.info}>
                <Flex.Item>
                  <Count
                    index={index}
                    subjectId={subjectId}
                    subject={subject}
                    epStatus={epStatus}
                  />
                </Flex.Item>
                <ToolBar
                  index={index}
                  subjectId={subjectId}
                  subject={subject}
                />
              </Flex>
              <Progress epStatus={epStatus} subject={subject} />
            </View>
          </Flex.Item>
          {index === 1 && (
            <View>
              <Heatmap id='首页.置顶或取消置顶' />
            </View>
          )}
        </Flex>
        <Eps subjectId={subjectId} />
        {this.isTop && <View style={this.styles.dot} />}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  lazy: {
    height: 150,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  item: {
    paddingVertical: itemPadding,
    paddingLeft: itemPadding,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  itemWithHeatMap: {
    paddingTop: itemPadding,
    paddingBottom: itemPadding + 4,
    paddingLeft: itemPadding,
    backgroundColor: IOS ? _.colorPlain : 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  },
  hd: {
    paddingRight: itemPadding
  },
  content: {
    marginLeft: itemPadding
  },
  title: {
    minHeight: 60
  },
  info: {
    height: 40
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
  }
}))
