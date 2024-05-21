/*
 * @Author: czy0729
 * @Date: 2020-07-30 18:10:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-21 19:44:39
 */
import React from 'react'
import { BackHandler, View } from 'react-native'
import { Button, Flex, Image, Modal, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl, tinygrailOSS, toFixed } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

class BonusModal extends React.Component<{
  visible?: boolean
}> {
  static defaultProps = {
    visible: false
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
  }

  UNSAFE_componentWillReceiveProps(nextProps: { visible: boolean }) {
    // if (!IOS) StatusBar.setHidden(nextProps.visible)
  }

  onBackAndroid = () => {
    const { $ } = this.context as Ctx
    const { visible } = this.props
    if (visible) {
      $.onCloseModal()
      return true
    }

    return false
  }

  get imageWidth() {
    const { $ } = this.context as Ctx
    const { bonus } = $.state
    if (bonus.length <= 4) {
      return Math.floor((Math.min(_.window.width - 2 * _.wind, 400) - 2 * _._wind - _.md) * 0.5)
    }

    return Math.floor((Math.min(_.window.width - 2 * _.wind, 400) - 2 * (_._wind + _.md)) * 0.33)
  }

  get imageHeight() {
    return this.imageWidth * 1.28
  }

  get total() {
    const { $ } = this.context as Ctx
    const { bonus } = $.state
    return bonus.reduce((total, item) => total + item.Amount * item.CurrentPrice, 0)
  }

  render() {
    r(COMPONENT)

    const { $, navigation } = this.context as Ctx
    const { bonus, isBonus2, loadingBonus } = $.state
    const { visible } = this.props
    return (
      <Modal
        style={this.styles.modal}
        visible={visible}
        title='刮刮乐'
        type='tinygrailPlain'
        onClose={$.onCloseModal}
      >
        <View style={this.styles.wrap}>
          <Flex align='start' wrap='wrap'>
            {bonus.map((item, index) => (
              <View
                key={String(item.Id)}
                style={stl(
                  this.styles.item,
                  {
                    width: this.imageWidth
                  },
                  (index + 1) % (bonus.length <= 4 ? 2 : 3) && _.mr.md
                )}
              >
                <Image
                  size={this.imageWidth}
                  height={this.imageHeight}
                  src={tinygrailOSS(item.Cover, 480)}
                  radius
                  imageViewer
                  imageViewerSrc={tinygrailOSS(item.Cover, 480)}
                  skeletonType='tinygrail'
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
          <Text type={_.tSelect('tinygrailPlain', 'tinygrailText')} align='center' bold>
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

export default obc(BonusModal)
