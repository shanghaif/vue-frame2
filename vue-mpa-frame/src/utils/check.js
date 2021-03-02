/**
 * 判断字符串是否以数字开头
 * @param str
 * @returns {boolean}
 */
export const isStartWithNum = str => {
  return /^[1-9]/.test(str);
};

/**
 * 验证字符串中是否包含字母
 * @param str
 * @returns {boolean}
 */
export const hasLetter = str => {
  return /[a-z]/i.test(str + '');
};

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
