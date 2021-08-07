/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:19:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-08 00:46:34
 */
import React from 'react'
import { View } from 'react-native'
import { computed } from 'mobx'
import { _ } from '@stores'
import { arrGroup } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_EP_TYPE } from '@constants/model'
import { NormalButtons } from './normal-buttons'
import { Carousel } from './carousel'

export const Eps = ob(
  class extends React.Component {
    static defaultProps = {
      subjectId: 0, // 条目Id
      layoutWidth: 0, // 容器宽度, 存在此值则不计算onLayout, 加速渲染
      marginRight: 0, // 容器右侧的margin值
      numbersOfLine: 8, // 1行多少个, 为了美观, 通过计算按钮占满1行, iPad会忽略
      lines: 4, // 最大显示多少行
      pagination: false, // 是否分页, 1页4行按钮, 不分页显示1页, 分页会显示Carousel
      canPlay: false, // 有播放源
      login: false, // 是否已登陆
      advance: false, // 详情页模式, 显示SP和更多的操作按钮
      eps: [], // 章节数据
      userProgress: {}, // 用户收藏记录
      onSelect: Function.prototype, // 操作选择 (value, item, subjectId) => void
      onLongPress: Function.prototype // 按钮长按 (item) => void
    }

    static pageLimit = 32 // 1页32个

    state = {
      width: 0
    }

    UNSAFE_componentWillMount() {
      const { layoutWidth, marginRight } = this.props
      if (layoutWidth) {
        this.setState({
          width: layoutWidth - marginRight
        })
      }
    }

    onLayout = ({ nativeEvent }) => {
      const { width } = this.state
      if (width) return

      const { marginRight } = this.props
      this.setState({
        width: nativeEvent.layout.width - marginRight
      })
    }

    @computed get style() {
      if (_.isPad) {
        return {
          width: 48,
          margin: _.sm
        }
      }

      const { width } = this.state
      const { grid, numbersOfLine } = this.props
      if (!width) return {}

      const marginPercent = 0.2
      const marginNumbers = numbersOfLine - 1
      const marginSum = width * marginPercent
      const widthSum = width - marginSum
      const _width = widthSum / numbersOfLine
      const _margin = marginSum / marginNumbers
      return {
        width: grid ? parseInt(_width) : _width,
        margin: grid ? parseInt(_margin) : _margin
      }
    }

    @computed get passProps() {
      const {
        subjectId,
        numbersOfLine,
        advance,
        canPlay,
        login,
        userProgress,
        onSelect,
        onLongPress
      } = this.props
      const { width, margin } = this.style
      return {
        subjectId,
        width,
        margin,
        numbersOfLine,
        canPlay,
        login,
        advance,
        userProgress,
        onSelect,
        onLongPress
      }
    }

    @computed get pages() {
      const { numbersOfLine, lines, advance, eps } = this.props
      let _eps = eps || []
      let hasSp = false // 是否有SP
      if (!advance) {
        _eps = _eps.filter(item => {
          const isNormal = MODEL_EP_TYPE.getLabel(item.type) !== '普通'
          if (!isNormal) hasSp = true
          return isNormal
        })
      }

      _eps = _eps
        // 保证SP排在普通章节后面
        .sort((a, b) => {
          const sortA = MODEL_EP_TYPE.getLabel(a.type) === '普通' ? 1 : 0
          const sortB = MODEL_EP_TYPE.getLabel(b.type) === '普通' ? 1 : 0
          return sortA - sortB
        })

      // SP可能会占用一格, 若eps当中存在sp, 每组要减1项避免换行
      const arrNum = numbersOfLine * lines - (lines <= 3 ? 0 : hasSp ? 1 : 0)
      const pages = arrGroup(_eps, arrNum)

      return pages
    }

    renderPaginationSide() {
      const { style } = this.props
      const { width } = this.state
      const mounted = width !== 0
      const _style = mounted ? style : undefined
      return (
        <View style={_style} onLayout={this.onLayout}>
          {mounted ? (
            this.pages.length === 1 ? (
              <NormalButtons props={this.passProps} eps={this.pages[0]} />
            ) : (
              <Carousel props={this.passProps} epsGroup={this.pages} />
            )
          ) : null}
        </View>
      )
    }

    renderNormal() {
      const { style } = this.props
      const { width } = this.state
      const mounted = width !== 0
      const _style = mounted ? style : undefined
      const { margin } = this.style
      return (
        <View
          style={[
            _style,
            {
              marginBottom: margin ? -margin : 0 // 抵消最后一行的marginBottom
            }
          ]}
          onLayout={this.onLayout}
        >
          {mounted && (
            <NormalButtons props={this.passProps} eps={this.pages[0]} />
          )}
        </View>
      )
    }

    render() {
      if (!this.pages.length) return null

      const { pagination } = this.props
      if (pagination) return this.renderPaginationSide()

      return this.renderNormal()
    }
  }
)
