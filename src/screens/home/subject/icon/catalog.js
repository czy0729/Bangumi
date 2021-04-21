/*
 * @Author: czy0729
 * @Date: 2021-01-16 19:42:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 18:00:00
 */
import React from 'react'
import { Flex, Heatmap, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils/app'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

function IconCatalog(props, { $, navigation }) {
  return (
    <Touchable
      style={styles.touch}
      onPress={() => {
        t('条目.跳转', {
          to: 'SubjectCatalogs',
          from: '目录',
          subjectId: $.subjectId
        })

        navigation.push('SubjectCatalogs', {
          subjectId: $.subjectId,
          name: cnjp($.cn, $.jp)
        })
      }}
    >
      <Flex>
        <Text type='sub'>更多</Text>
        <Iconfont name='md-navigate-next' />
      </Flex>
      <Heatmap
        id='条目.跳转'
        data={{
          from: '目录'
        }}
      />
    </Touchable>
  )
}

export default obc(IconCatalog)

const styles = _.create({
  touch: {
    paddingLeft: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
