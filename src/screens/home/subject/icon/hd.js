/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:35:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 20:18:34
 */
import React from 'react'
import { Flex, Touchable, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconHD(props, { $, navigation }) {
  if ($.isLimit || !$.hd) {
    return null
  }

  return (
    <Touchable
      style={styles.icon}
      onPress={() => {
        navigation.push('HD', {
          cn: $.cn,
          subjectId: $.hd
        })
      }}
    >
      <Flex>
        <Iconfont name='list' size={17} />
        <Text style={_.ml.xs} size={12} type='sub' bold>
          HD
        </Text>
      </Flex>
    </Touchable>
  )
}

export default obc(IconHD)

const styles = _.create({
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs
  }
})
