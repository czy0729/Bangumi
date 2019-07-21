/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-22 01:14:24
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Button, Icon, Text, Touchable } from '@components'
import { SectionTitle } from '@screens/_'
import { getType, getRating } from '@utils/app'
import _, { colorPlain, shadow } from '@styles'

const Box = ({ style }, { $, navigation }) => {
  const { collection = {} } = $.subject
  // const { typeNum = '' } = $.subjectFormHTML
  const { status = { name: '未收藏' }, rating = 0 } = $.collection
  const leftStyle = []
  const rightStyle = []
  const btnText = $.isLogin ? status.name : '登陆管理'
  const onPress = $.isLogin
    ? $.showManageModel
    : () => navigation.push('LoginV2')
  if (rating) {
    leftStyle.push(styles.left)
    rightStyle.push(styles.right)
  }

  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>收藏盒</SectionTitle>
      <View style={[shadow, _.mt.md]}>
        <Touchable onPress={onPress}>
          <Flex justify='center'>
            <Flex.Item>
              <Button style={leftStyle} type={getType(btnText)}>
                {btnText}
              </Button>
            </Flex.Item>
            {!!rating && (
              <Flex.Item>
                <Button style={rightStyle} type={getType(btnText)}>
                  {getRating(rating)}{' '}
                  {[1, 2, 3, 4, 5].map(item => {
                    let type
                    if (rating / 2 >= item) {
                      type = 'ios-star'
                    } else if (rating / 2 >= item - 0.5) {
                      type = 'ios-star-half'
                    } else {
                      type = 'ios-star-outline'
                    }
                    return (
                      <Icon
                        key={item}
                        name={type}
                        size={16}
                        color={colorPlain}
                      />
                    )
                  })}
                </Button>
              </Flex.Item>
            )}
          </Flex>
        </Touchable>
      </View>
      <Text style={_.mt.md} size={12} type='sub'>
        {collection.wish || '-'}人想看 / {collection.collect || '-'}人看过 /{' '}
        {collection.doing || '-'}人在看 / {collection.on_hold || '-'}人搁置 /{' '}
        {collection.dropped || '-'}人抛弃
      </Text>
    </View>
  )
}

Box.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Box)

const styles = StyleSheet.create({
  container: {
    minHeight: 120
  },
  touchable: {
    ...shadow
  },
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  right: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})
