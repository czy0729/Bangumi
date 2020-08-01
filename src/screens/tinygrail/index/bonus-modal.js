/*
 * @Author: czy0729
 * @Date: 2020-07-30 18:10:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-08-01 14:35:44
 */
import React from 'react'
import { View, BackHandler, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import Modal from '@components/@/ant-design/modal'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { IOS } from '@constants'

export default
@observer
class BonusModal extends React.Component {
  static defaultProps = {
    visible: false
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!IOS) {
      StatusBar.setHidden(nextProps.visible)
    }
  }

  onBackAndroid = () => {
    const { $ } = this.context
    const { visible } = this.props
    if (visible) {
      $.onCloseModal()
      return true
    }
    return false
  }

  get imageWidth() {
    const { $ } = this.context
    const { bonus } = $.state
    if (bonus.length <= 4) {
      return parseInt(
        (Math.min(_.window.width - 2 * _.wind, 400) - 2 * _._wind - _.md) * 0.5
      )
    }

    return parseInt(
      (Math.min(_.window.width - 2 * _.wind, 400) - 2 * (_._wind + _.md)) * 0.33
    )
  }

  get imageHeight() {
    return this.imageWidth * 1.28
  }

  get total() {
    const { $ } = this.context
    const { bonus } = $.state
    return bonus.reduce(
      (total, item) => total + item.Amount * item.CurrentPrice,
      0
    )
  }

  render() {
    const { $, navigation } = this.context
    const { bonus } = $.state
    const { visible } = this.props
    return (
      <Modal
        style={this.styles.modal}
        visible={visible}
        title={
          <Text type='tinygrailPlain' bold>
            刮刮乐
          </Text>
        }
        transparent
        closable
        maskClosable
        onClose={$.onCloseModal}
      >
        <View style={this.styles.wrap}>
          <Flex align='start' wrap='wrap'>
            {bonus.map((item, index) => (
              <View
                key={String(item.Id)}
                style={[
                  this.styles.item,
                  {
                    width: this.imageWidth
                  },
                  (index + 1) % (bonus.length <= 4 ? 2 : 3) && _.mr.md
                ]}
              >
                <Image
                  size={this.imageWidth}
                  height={this.imageHeight}
                  src={tinygrailOSS(item.Cover, 480)}
                  radius
                  imageViewer
                  imageViewerSrc={tinygrailOSS(item.Cover, 480)}
                />
                <Touchable
                  style={_.mt.sm}
                  onPress={() => {
                    $.onCloseModal()
                    navigation.push('TinygrailDeal', {
                      monoId: `character/${item.Id}`,
                      type: 'ask'
                    })
                  }}
                >
                  <Text type='tinygrailPlain' bold align='center'>
                    {item.Name}
                    <Text type='ask' size={12} lineHeight={14}>
                      {' '}
                      lv{item.Level}
                    </Text>
                  </Text>
                  <Text
                    style={_.mt.xxs}
                    type={_.tSelect('tinygrailText', 'tinygrailPlain')}
                    size={12}
                    bold
                    align='center'
                  >
                    ₵{toFixed(item.CurrentPrice)}{' '}
                    <Text type='warning' size={12}>
                      x{item.Amount}
                    </Text>
                  </Text>
                </Touchable>
              </View>
            ))}
          </Flex>
          <Text
            type={_.tSelect('tinygrailPlain', 'tinygrailText')}
            align='center'
            bold
          >
            总价值
            <Text type={_.tSelect('tinygrailText', 'tinygrailPlain')} bold>
              {' '}
              ₵{toFixed(this.total)}{' '}
            </Text>
          </Text>
        </View>
      </Modal>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 400,
    backgroundColor: _.tSelect(_.colorTinygrailContainer, _.colorBg)
  },
  focus: {
    marginTop: -parseInt(_.window.height * 0.56)
  },
  wrap: {
    width: '100%',
    maxWidth: _.window.maxWidth,
    paddingBottom: _.sm,
    marginTop: _.md
  },
  item: {
    marginBottom: _.md
  }
}))
