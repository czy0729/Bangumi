/*
 * @Author: czy0729
 * @Date: 2019-03-10 06:43:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-21 20:01:59
 */
import { observable, computed } from 'mobx'
import common, { dev } from './common'

const initPopover = {
  show: false,
  contentStyle: {
    top: 0,
    right: 'auto',
    bottom: 'auto',
    left: 0
  },
  contentPosition: 'left-bottom',
  props: {}
}

class UI extends common {
  state = observable({
    popover: initPopover
  })

  @computed get popover() {
    return this.state.popover
  }

  // showPopover = (props, evt, { offsetWidth, offsetHeight, showTabBar }) => {
  //   const popover = {
  //     show: true,
  //     props: {
  //       ...props
  //     },
  //     contentStyle: {},
  //     contentPosition: ''
  //   }

  //   const {
  //     windowWidth,
  //     statusBarHeight,
  //     pixelRatio
  //   } = Taro.getSystemInfoSync()
  //   const windowHeight = getWindowHeight(showTabBar)
  //   let pageX
  //   let pageY
  //   let layerX
  //   let layerY
  //   if (process.env.TARO_ENV === 'h5') {
  //     pageX = evt.pageX
  //     pageY = evt.pageY
  //     layerX = evt.layerX
  //     layerY = evt.layerY
  //   } else if (process.env.TARO_ENV === 'weapp') {
  //     pageX = evt.detail.x
  //     pageY = evt.detail.y
  //     layerX = evt.target.offsetLeft
  //     layerY = evt.target.offsetTop
  //   } else if (process.env.TARO_ENV === 'rn') {
  //     pageX = evt.nativeEvent.pageX

  //     // ? 貌似纵坐标包含了设备头部的高度
  //     pageY = evt.nativeEvent.pageY - statusBarHeight * (pixelRatio - 1)
  //     layerX = evt.nativeEvent.locationX
  //     layerY = evt.nativeEvent.locationY
  //   }

  //   // 以点击元素左下角的点坐标, 判断放置方向
  //   const left = pageX - layerX
  //   if (left <= windowWidth / 2) {
  //     popover.contentStyle.left = left
  //     popover.contentStyle.right = 'auto'
  //     popover.contentPosition = 'left'
  //   } else {
  //     popover.contentStyle.right = windowWidth - pageX + layerX - offsetWidth
  //     popover.contentStyle.left = 'auto'
  //     popover.contentPosition = 'right'
  //   }

  //   const bottom = pageY + offsetHeight - layerY
  //   if (bottom <= windowHeight / 2) {
  //     popover.contentStyle.top = bottom
  //     popover.contentStyle.bottom = 'auto'
  //     popover.contentPosition = popover.contentPosition + '-bottom'
  //   } else {
  //     popover.contentStyle.bottom = windowHeight - pageY + layerY
  //     popover.contentStyle.top = 'auto'
  //     popover.contentPosition = popover.contentPosition + '-top'
  //   }

  //   this.setState({ popover })
  // }

  hidePopover = () => {
    this.setState({
      popover: initPopover
    })
  }
}

const Store = new UI()
dev('ui', Store)

export default Store
