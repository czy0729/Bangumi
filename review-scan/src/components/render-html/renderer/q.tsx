/*
 * @Author: czy0729
 * @Date: 2024-08-14 07:25:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-14 07:25:53
 */
import React from 'react'
import QuoteText from '../quote-text'

export function q({ key, children }) {
  return <QuoteText key={key}>{children}</QuoteText>
}
