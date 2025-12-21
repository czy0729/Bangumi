/*
 * @Author: czy0729
 * @Date: 2025-08-08 18:14:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-08 18:14:55
 */
export function hashString(str: string) {
  // 简单 32-bit hash -> base36，足够用于生成 guard key
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h).toString(36)
}

export function wrapWithGuard(code: string, guardName: string) {
  // 备注：末尾需要返回 true; 以满足 react-native-webview 对注入脚本的要求
  return `(function(){try{if(window.${guardName}){return;}window.${guardName}=true;${code}}catch(e){try{console.warn('inject error:', e)}catch(_){}}})(); true;`
}
