<script>
/**
 * @desc 函数式组件
 * @example
 * <base-temp-var :var1="`hello ${name}`">
 *   <template v-slot:default="{ var1 }"> aaa={{ var1 }} </template>
 * </base-temp-var>
 */
export default {
  name: 'BaseTempVar',
  functional: true,
  props: ['var1', 'var2', 'var3'], // 三个临时变量，需要的话可以在这里在扩展
  render: (h, ctx) => {
    // 调用名为 default 的默认插槽函数，并将参数props传入
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {});
  }
};
</script>
