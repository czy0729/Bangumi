/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:17:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-10 15:30:01
 */
import React from 'react'
import { Flex, Icon, Text } from '@components'
import _, { colorWarning } from '@styles'

const Stars = ({ style, value }) => {
  if (!value) {
    return null
  }

  return (
    <Flex style={style}>
      <Icon name='ios-star' size={12} color={colorWarning} />
      <Text style={_.ml.xs} type='sub' size={12} lineHeight={12}>
        {value}
      </Text>
    </Flex>
  )
}

export default Stars

/**
 * @tucao 星星展开感觉太花哨了
 */
// return (
//   <Flex style={style}>
//     {[1, 2, 3, 4, 5].map(item => {
//       let type
//       if (value / 2 >= item) {
//         type = 'ios-star'
//       } else if (value / 2 >= item - 0.5) {
//         type = 'ios-star-half'
//       } else {
//         type = 'ios-star-outline'
//       }
//       return (
//         <Icon
//           name={type}
//           size={12}
//           color={type === 'ios-star-outline' ? colorIcon : colorWarning}
//         />
//       )
//     })}
//   </Flex>
// )
