/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-22 11:46:21
 */
import React from 'react'
import { Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Button, Icon, Text, Touchable } from '@components'
import { SectionTitle, IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { getType, getRating } from '@utils/app'

function Box({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { wish, collect, doing, on_hold: onHold, dropped } = $.subjectCollection

  // 自己的收藏状态
  const { status = { name: '未收藏' }, rating = 0 } = $.collection
  const { formhash } = $.subjectFormHTML
  const showErase = status.name !== '未收藏' && !!formhash
  const leftStyle = []
  const rightStyle = []
  if (rating) {
    leftStyle.push(styles.left)
    rightStyle.push(styles.right)
  }
  const btnText = $.isLogin ? status.name : '登陆管理'
  const onPress = $.isLogin
    ? $.showManageModel
    : () => navigation.push('LoginV2')

  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle
        style={{
          height: 28
        }}
        right={
          showErase && (
            <IconTouchable
              name='close'
              style={{
                marginRight: -_.sm
              }}
              size={14}
              color={_.colorIcon}
              onPress={() => {
                Alert.alert('警告', '确定删除收藏?', [
                  {
                    text: '取消',
                    style: 'cancel'
                  },
                  {
                    text: '确定',
                    onPress: () => $.doEraseCollection()
                  }
                ])
              }}
            />
          )
        }
      >
        收藏
      </SectionTitle>
      <View style={[_.select(_.shadow, undefined), _.mt.md]}>
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
                        color={_.__colorPlain__}
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
        {wish || '-'}人想{$.action} / {collect || '-'}人{$.action}过 /{' '}
        {doing || '-'}人在{$.action} / {onHold || '-'}
        人搁置 / {dropped || '-'}人抛弃
      </Text>
    </View>
  )
}

Box.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Box)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120,
    backgroundColor: _.colorPlain
  },
  left: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  right: {
    borderLeftWidth: _.select(0, 1),
    borderLeftColor: 'rgba(33, 33, 33, 0.1)',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
}))
