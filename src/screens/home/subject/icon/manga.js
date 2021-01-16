/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:31:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 19:19:36
 */
import React from 'react'
import { Flex, Touchable, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconManga(props, { $ }) {
  if ($.isLimit || !$.source.mangaId) {
    return null
  }

  return (
    <Touchable style={styles.icon} onPress={$.toManhuadb}>
      <Flex>
        <Iconfont name='discovery' size={16} />
        <Text style={_.ml.xs} size={12} type='sub'>
          漫画
        </Text>
      </Flex>
      <Heatmap id='条目.阅读漫画' />
    </Touchable>
  )
}

export default obc(IconManga)

const styles = _.create({
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs
  }
})
