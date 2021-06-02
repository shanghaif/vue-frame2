import Vue from 'vue';

const compile = (tpl, vm) => {
  const keys = ['methods', 'computed', 'data', 'filters'];
  const props = {};

  const node = Vue.compile(tpl);
  keys.forEach(key => {
    props[key] = vm.$parent.$parent.$options[key];

    if (key === 'data' && typeof props[key] === 'function') {
      props[key] = props[key]();
    }
  });

  const vNode = new Vue({
    ...props,
    ...node
  });

  vNode.$mount();
  return vNode;
};

const mountedVNode = vn => {
  const instance = new Vue({ render: h => h('div', vn) });
  instance.$mount();
  return instance;
};

const mountedRenderFn = (renderFn, vueInstance) => {
  const instance = new Vue({ render: h => renderFn(h, vueInstance) });
  instance.$mount();
  return instance;
};
export { compile, mountedVNode, mountedRenderFn };
