/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 19:19:40
 */
import React from 'react'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconSearch(props, { $, navigation }) {
  if ($.isLimit || $.hd) {
    return null
  }

  return (
    <Touchable
      style={styles.icon}
      onPress={() => {
        t('条目.跳转', {
          from: '源头',
          subjectId: $.subjectId
        })

        navigation.push('Comic', {
          cn: $.cn,
          jp: $.jp,
          subjectId: $.subjectId
        })
      }}
    >
      <Flex>
        <Iconfont name='search' size={14} />
        <Text style={_.ml.xs} size={12} type='sub'>
          源头
        </Text>
      </Flex>
      <Heatmap
        id='条目.跳转'
        data={{
          from: '源头'
        }}
      />
    </Touchable>
  )
}

export default obc(IconSearch)

const styles = _.create({
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs
  }
})
