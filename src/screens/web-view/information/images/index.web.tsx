/*
 * @Author: czy0729
 * @Date: 2023-12-23 11:11:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-23 15:12:26
 */
import React from 'react'
import { styles } from './styles'

function Images({ data = [] }: { data: string[] }) {
  if (!data.length) return null

  return (
    <>
      {data.map(item => (
        <img
          key={item}
          style={styles.image}
          src={item}
          rel='noreferrer'
          referrerPolicy='no-referrer'
          alt=''
        />
      ))}
    </>
  )
}

export default Images
