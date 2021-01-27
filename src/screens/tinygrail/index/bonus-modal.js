/*
 * @Author: czy0729
 * @Date: 2020-07-30 18:10:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:15:20
 */
import React from 'react'
import { View, BackHandler, StatusBar } from 'react-native'
import { Touchable, Flex, Text, Image, Button } from '@components'
import Modal from '@components/@/ant-design/modal'
import { _ } from '@stores'
import { toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { IOS } from '@constants'

export default
@obc
class BonusModal extends React.Component {
  static defaultProps = {
    visible: false
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
    const { bonus, isBonus2, loadingBonus } = $.state
    const { visible } = this.props
    return (
      <Modal
        style={this.styles.modal}
        visible={visible}
        title={
          <Text type='tinygrailPlain' bold>
            {isBonus2 && '幻想乡'}刮刮乐
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
          <Flex style={_.mt.md} justify='center'>
            <Button
              style={this.styles.btn}
              styleText={this.styles.text}
              size='sm'
              loading={loadingBonus}
              onPress={() => $.doLottery(navigation, isBonus2)}
            >
              再刮一次 ({$.nextPrice})
            </Button>
          </Flex>
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
    backgroundColor: _.tSelect(_.colorTinygrailContainer, _.__colorBg__)
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
  },
  btn: {
    width: 240,
    backgroundColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg),
    borderColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg)
  },
  text: {
    width: 160,
    color: _.tSelect(_.__colorPlain__, _.colorTinygrailPlain)
  }
}))
