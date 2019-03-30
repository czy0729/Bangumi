/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:19:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 06:41:45
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Flex, Carousel } from '@ant-design/react-native'
import { Button, Text } from '@components'
import Popover from '@components/@ant-design/popover'
import { arrGroup, pad } from '@utils'
import { colorPlain, colorDesc } from '@styles'
import ProgressMenu from './progress-menu'

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
      return 'ghost-primary'
    case 'Today':
      return 'ghost-success'
    default:
      return 'ghost-plain'
  }
}

export default class Eps extends React.Component {
  static defaultProps = {
    login: false,
    subjectId: 0,
    advance: false,
    eps: [],
    userProgress: {},
    onSelect: () => {}
  }

  renderButton(item) {
    const { userProgress } = this.props
    return (
      <Popover
        key={item.id}
        style={styles.popover}
        overlay={this.renderOverlay(item)}
      >
        <Button type={getType(userProgress[item.id], item.status)} size='sm'>
          {pad(item.sort)}
        </Button>
      </Popover>
    )
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
      <ProgressMenu
        title={[
          `ep.${item.sort} ${item.name || item.name_cn}`,
          `${item.airdate} 讨论数：${item.comment}`
        ]}
        data={data}
        onSelect={value => onSelect(value, item, subjectId)}
      />
    )
  }

  renderNormal(eps) {
    const itemsNormal = []
    const itemsSp = []
    eps.forEach(item => {
      // SP 0, 普通 1
      if (item.type === 1) {
        itemsSp.push(item)
      } else {
        itemsNormal.push(item)
      }
    })
    return (
      <Flex wrap='wrap'>
        {itemsNormal.map(item => this.renderButton(item))}
        {!!itemsSp.length && (
          <Flex style={styles.sp} justify='center'>
            <Text type='desc' size={12}>
              SP
            </Text>
          </Flex>
        )}
        {itemsSp.map(item => this.renderButton(item))}
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
          .filter((item, index) => index < 10)
          .map((eps, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>{this.renderNormal(eps)}</View>
          ))}
      </Carousel>
    )
  }

  render() {
    const { style, eps } = this.props
    const pages = arrGroup(eps)
    if (!pages.length) return null
    return (
      <View style={style}>
        {pages.length === 1
          ? this.renderNormal(pages[0])
          : this.renderCarousel(pages)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  carousel: {
    height: 248
  },
  dotStyle: {
    backgroundColor: colorPlain,
    borderWidth: 1,
    borderColor: colorDesc
  },
  dotActiveStyle: {
    backgroundColor: colorDesc
  },
  popover: {
    marginRight: 12,
    marginBottom: 12
  },
  sp: {
    width: 32,
    height: 30,
    marginRight: 12,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderColor: colorDesc
  }
})
