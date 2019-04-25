/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:19:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 15:37:26
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import { Flex, Popover, Menu, Button, Text } from '@components'
import { MODEL_EP_TYPE } from '@constants/model'
import { arrGroup, pad } from '@utils'
import { colorPlain, colorDesc, colorSub } from '@styles'

export default class Eps extends React.Component {
  static defaultProps = {
    numbersOfLine: 8, // 一行多少个, 为了美观, 通过计算按钮占满一行
    pagination: false, // 是否分页, 1页4行按钮, 不分页显示1页, 分页会显示Carousel
    advance: false, // 详情页模式, 显示SP和更多的操作按钮
    login: false,
    subjectId: 0,
    eps: [],
    userProgress: {},
    onSelect: () => {}
  }

  state = {
    width: 0
  }

  onLayout = ({ nativeEvent }) => {
    const { width } = this.state
    if (!width) {
      this.setState({
        width: nativeEvent.layout.width
      })
    }
  }

  get style() {
    const { width } = this.state
    const { numbersOfLine } = this.props
    if (!width) {
      return {}
    }

    const marginPercent = 0.24
    const marginNumbers = numbersOfLine - 1
    const marginSum = width * marginPercent
    const widthSum = width - marginSum

    return {
      width: widthSum / numbersOfLine,
      margin: marginSum / marginNumbers
    }
  }

  renderOverlay(item) {
    const { login, subjectId, advance, userProgress, onSelect } = this.props
    let data
    if (login) {
      data = [userProgress[item.id] === '看过' ? '撤销' : '看过']
      if (advance) {
        data.push('想看', '抛弃')
      }
      data.push('看到', '本集讨论')
    } else {
      data = ['本集讨论']
    }
    return (
      <Menu
        title={[
          `ep.${item.sort} ${item.name || item.name_cn}`,
          `${item.airdate} 讨论数：${item.comment}`
        ]}
        data={data}
        onSelect={value => onSelect(value, item, subjectId)}
      />
    )
  }

  /**
   * @param {*} item
   * @param {*} num  当前第几个
   */
  renderButton(item, num) {
    const { numbersOfLine, userProgress } = this.props
    const { width, margin } = this.style
    const isSide = num % numbersOfLine === 0
    return (
      <Popover
        key={item.id}
        style={{
          marginRight: isSide ? 0 : margin,
          marginBottom: margin
        }}
        overlay={this.renderOverlay(item)}
      >
        <Button
          type={getType(userProgress[item.id], item.status)}
          size='sm'
          style={{
            width,
            height: width
          }}
        >
          {pad(item.sort)}
        </Button>
      </Popover>
    )
  }

  /**
   * @param {*} itemsSp
   * @param {*} preNum  之前有几个
   */
  renderSp(itemsSp = [], preNum = 0) {
    if (!itemsSp.length) {
      return null
    }

    const { numbersOfLine } = this.props
    const { width, margin } = this.style
    const isSide = (preNum + 1) % numbersOfLine === 0
    return (
      <>
        {!!itemsSp.length && (
          <Flex
            style={[
              styles.sp,
              {
                width,
                height: width - 4, // 感觉短一点好看
                marginRight: isSide ? 0 : margin,
                marginBottom: margin
              }
            ]}
            justify='center'
          >
            <Text type='sub' size={12}>
              SP
            </Text>
          </Flex>
        )}
        {itemsSp.map((item, index) =>
          this.renderButton(item, preNum + index + 2)
        )}
      </>
    )
  }

  renderNormal(eps) {
    const itemsNormal = []
    const itemsSp = []
    eps.forEach(item => {
      const label = MODEL_EP_TYPE.getLabel(item.type)
      if (label === '普通') {
        itemsSp.push(item)
      } else if (label === 'SP') {
        itemsNormal.push(item)
      }
    })
    return (
      <Flex wrap='wrap' align='start'>
        {itemsNormal.map((item, index) => this.renderButton(item, index + 1))}
        {this.renderSp(itemsSp, itemsNormal.length)}
      </Flex>
    )
  }

  renderCarousel(epsGroup) {
    return (
      <Carousel
        style={styles.carousel}
        dotStyle={styles.dotStyle}
        dotActiveStyle={styles.dotActiveStyle}
        infinite
      >
        {epsGroup
          // @todo 暂时只取前10页
          .filter((item, index) => index < 10)
          .map((eps, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>{this.renderNormal(eps)}</View>
          ))}
      </Carousel>
    )
  }

  render() {
    const { numbersOfLine, advance, eps } = this.props
    let _eps = eps
    if (!advance) {
      _eps = _eps.filter(item => MODEL_EP_TYPE.getLabel(item.type) !== '普通')
    }
    _eps = _eps
      // 保证SP排在普通章节后面
      .sort((a, b) => {
        const normalA = MODEL_EP_TYPE.getLabel(a.type) === '普通' ? 1 : 0
        const normalB = MODEL_EP_TYPE.getLabel(b.type) === '普通' ? 1 : 0
        return normalA - normalB
      })

    // SP可能会占用一格, 所以减1避免换行
    const pages = arrGroup(_eps, numbersOfLine * 4 - 1)
    if (!pages.length) {
      return null
    }
    const { style, pagination } = this.props
    const { width } = this.state
    const mounted = width !== 0
    const _style = mounted ? style : undefined
    if (pagination) {
      return (
        <View style={_style} onLayout={this.onLayout}>
          {mounted
            ? pages.length === 1
              ? this.renderNormal(pages[0])
              : this.renderCarousel(pages)
            : null}
        </View>
      )
    }

    return (
      <View style={_style} onLayout={this.onLayout}>
        {mounted ? this.renderNormal(pages[0]) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  carousel: {
    height: 200
  },
  dotStyle: {
    backgroundColor: colorPlain,
    borderWidth: 1,
    borderColor: colorDesc
  },
  dotActiveStyle: {
    backgroundColor: colorDesc
  },
  sp: {
    marginTop: 2,
    borderLeftWidth: 2,
    borderColor: colorSub
  }
})

const getType = (progress, status) => {
  switch (progress) {
    case '想看':
      return 'main'
    case '看过':
      return 'primary'
    case '抛弃':
      return 'disabled'
    default:
      break
  }
  switch (status) {
    case 'Air':
      return 'ghostPrimary'
    case 'Today':
      return 'ghostSuccess'
    default:
      return 'ghostPlain'
  }
}
