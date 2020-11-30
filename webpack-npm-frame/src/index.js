/**
 * @desc 加法
 */
const add = () => {
  const a = 2
  const b = 1
  // 这里用 Promise 来测试 @babel/polyfill 垫片是否起效
  return new Promise((resolve, reject) => {
    console.info(a + b)
    resolve(a + b)
  })
}
export default add
