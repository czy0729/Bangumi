/*
 * @Author: czy0729
 * @Date: 2019-03-23 09:16:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 07:09:47
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex } from '@ant-design/react-native'
import { Activity, Text, Button, Icon } from '@components'
import { getType, getRating } from '@utils/app'
import _, { colorPlain, shadow } from '@styles'

const Box = ({ style }, { $ }) => {
  const { status = {}, tag = [], rating = 0 } = $.collection
  const btnStyle = [styles.button, shadow, _.mt.md]
  const leftStyle = []
  const rightStyle = []
  const loading = !status.name
  const btnText = $.isLogin ? status.name : '登陆管理'
  if (rating) {
    leftStyle.push(styles.left)
    rightStyle.push(styles.right)
  }

  return (
    <View style={[_.container.wind, style]}>
      <Text size={20}>收藏盒</Text>
      {loading && $.isLogin ? (
        <Flex style={btnStyle} justify='center'>
          <Activity />
        </Flex>
      ) : (
        <Flex style={btnStyle} justify='center'>
          <Flex.Item>
            <Button style={leftStyle} type={getType(btnText)}>
              {btnText}
            </Button>
          </Flex.Item>
          {!!rating && (
            <Flex.Item>
              <Button style={rightStyle} type={getType(btnText)}>
                <Text type='plain'>{getRating(rating)} </Text>
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
                    <Icon key={item} name={type} size={16} color={colorPlain} />
                  )
                })}
              </Button>
            </Flex.Item>
          )}
        </Flex>
      )}
      {!!tag.filter(item => !!item).length && (
        <Text style={_.mt.md} type='sub'>
          {tag.join(' / ')}
        </Text>
      )}
    </View>
  )
}

Box.contextTypes = {
  $: PropTypes.object
}

export default observer(Box)

const styles = StyleSheet.create({
  button: {
    minHeight: 40
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
