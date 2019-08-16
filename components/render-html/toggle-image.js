/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-15 20:52:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import { HOST } from '@constants'
import _ from '@styles'
import Flex from '../flex'
import Image from '../image'
import Touchable from '../touchable'
import Iconfont from '../iconfont'
import Text from '../text'

export default class ToggleImage extends React.Component {
  state = {
    show: this.props.show || false,
    loaded: false
  }

  toggleShow = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  onLoadEnd = () =>
    this.setState({
      loaded: true
    })

  render() {
    const { show, loaded } = this.state
    if (!show) {
      return (
        <Touchable onPress={this.toggleShow}>
          <Flex style={styles.imagePlaceholder} justify='center'>
            <Text size={12} type='sub'>
              点击显示图片
            </Text>
          </Flex>
        </Touchable>
      )
    }

    return (
      <Flex justify='center'>
        <Image
          {...this.props}
          headers={{
            Referer: HOST
          }}
          onLoadEnd={this.onLoadEnd}
          onError={this.onLoadEnd}
        />
        {!this.props.show && (
          <Touchable style={styles.closeImageWrap} onPress={this.toggleShow}>
            <Flex style={styles.closeImage} justify='center'>
              <Iconfont size={12} name='close' color={_.colorPlain} />
            </Flex>
          </Touchable>
        )}
        {!loaded && (
          <Flex
            style={[
              StyleSheet.absoluteFill,
              {
                width: this.props.autoSize
              }
            ]}
            justify='center'
          >
            <ActivityIndicator size='small' color={_.colorIcon} />
          </Flex>
        )}
      </Flex>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    width: 32,
    height: 32
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: _.colorBorder
  },
  closeImageWrap: {
    position: 'absolute',
    zIndex: 1,
    top: _.sm,
    right: _.sm
  },
  closeImage: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    overflow: 'hidden'
  }
})
