/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 02:14:57
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'

const imgWidth = 28
const defaultProps = {
  tinygrail: false,
  cover: '',
  nameTop: '',
  nameBottom: ''
}

const HeaderTitle = memo(({ tinygrail, cover, nameTop, nameBottom }) => {
  rerender('Mono.HeaderTitle.Main')

  return (
    <Flex style={[styles.container, tinygrail && styles.containerTinygrail]}>
      {!!cover && <Cover size={imgWidth} src={cover.replace('/m/', '/s/')} radius />}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {nameTop}
        </Text>
        {!!nameBottom && (
          <Text type='sub' size={10} numberOfLines={1}>
            {nameBottom}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}, defaultProps)

export default obc(({ $ }) => {
  rerender('Mono.HeaderTitle')

  return (
    <HeaderTitle
      cover={$.cover}
      tinygrail={$.tinygrail}
      nameTop={$.nameTop}
      nameBottom={$.nameBottom}
    />
  )
})

const styles = _.create({
  container: {
    marginLeft: -_.sm,
    marginRight: _.lg
  },
  containerTinygrail: {
    marginRight: 52
  }
})
