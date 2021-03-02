<template>
  <div :class="$style.box">
    <div :class="$style.wrapper">
      <h4>切换select穿梭组件</h4>
      <el-select
        v-model="selectValue"
        placeholder="请选择"
        :clearable="false"
        @change="onSelectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <br /><br />
      <base-transfer-tree
        ref="select-transfer-tree-ref"
        width="700px"
        v-model="value"
        :title="transferTitle"
        :treeAttribute="treeAttribute"
        :activeName="selectValue"
        :filter="filterHandler"
        @removeItem="removeItem"
        itemDisplayField="menuName"
      >
        <template slot="expand" v-if="true">
          <div title="角色" name="role">
            <base-tree
              ref="role-ref"
              :filterNodeMethod="filterNode"
              v-bind="treeAttribute"
              :checkStrictly="true"
              @treeChange="roleTreeChange"
              :default-checked-keys="roleDefaultExpandedKeys"
              :default-expanded-keys="roleDefaultExpandedKeys"
            ></base-tree>
          </div>
          <div title="部门" name="department">
            <base-tree
              api="common/getTree"
              displayField="label"
              :lazy="false"
              :multiple="true"
              ref="department-ref"
              :checkStrictly="true"
              :showCheckbox="true"
              :filterNodeMethod="filterDepartmentNode"
              @treeChange="departmentTreeChange"
              :default-checked-keys="departmentDefaultExpandedKeys"
              :default-expanded-keys="departmentDefaultExpandedKeys"
            ></base-tree>
          </div>
          <div title="人员" name="user" ref="user-ref">
            <base-grid
              ref="user-grid-ref"
              :columns="columns"
              api=""
              :options="girdOptions"
              :selectMode="true"
              :isShowIndex="false"
              :isShowPagination="false"
              :isSelectedFirstRow="false"
              @select="gridSelect"
              @select-all="gridAllSelection"
              @onLoadSuccess="onLoadSuccess"
            >
            </base-grid>
          </div>
        </template>
      </base-transfer-tree>
      <br />
      <div>{{ value }}</div>
      <br />
      <br />
      <h4>穿梭tree组件</h4>
      <base-transfer-tree
        ref="transfer-tree-ref"
        width="700px"
        v-model="value1"
        title="角色架构"
        :treeAttribute="treeAttribute1"
        itemDisplayField="menuName"
        @treeLoadSuccess="treeLoadSuccess"
      >
      </base-transfer-tree>
      <br />
      <div>{{ value1 }}</div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.oTransferTitle = {
      role: '角色架构',
      department: '部门架构',
      user: '人员列表'
    };
    this.gridCheckedList = []; // grid 选中的列表
    this.gridSearch = false; // grid 是否正在搜索
    this.gridResult = [];
    return {
      transferTitle: this.oTransferTitle.role,
      value: [],
      value1: [
        {
          menuName: '', // 在树加载完成后在从节点上获取名称
          id: 7
        },
        { menuName: '', id: 2 },
        { menuName: '', id: 22 }
      ],
      treeAttribute: {
        api: 'common/complicateTree',
        queryParams: { name: '' },
        displayField: 'menuName',
        valueField: 'id',
        lazy: false,
        rootLabel: '菜单',
        isRenderRoot: true,
        showCheckbox: true,
        checkStrictly: true, // 父子不相关联
        props: {
          children: 'children',
          label: 'menuName',
          value: 'id',
          isLeaf: 'leaf'
        }
      },
      treeAttribute1: {
        api: 'common/complicateTree',
        queryParams: { name: '' },
        displayField: 'menuName',
        valueField: 'id',
        lazy: false,
        isRenderRoot: true,
        showCheckbox: true,
        checkStrictly: true, // 父子不相关联
        props: {
          children: 'children',
          label: 'label',
          value: 'id',
          isLeaf: 'leaf'
        },
        'default-expanded-keys': [],
        'default-checked-keys': []
      },
      options: [
        {
          value: 'role',
          label: '角色'
        },
        {
          value: 'department',
          label: '部门'
        },
        {
          value: 'user',
          label: '人员'
        }
      ],
      selectValue: 'role',
      columns: [
        {
          prop: 'id',
          label: '主键',
          hide: true
        },
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'department',
          label: '部门'
        }
      ],
      girdOptions: {
        code: '0000',
        message: '',
        data: {
          pageNum: 1,
          pageSize: 30,
          results: [
            { id: 1, name: '公孙胜', department: '部门A' },
            { id: 2, name: '关胜', department: '部门A' },
            { id: 3, name: '林冲', department: '部门B' },
            { id: 4, name: '秦明', department: '部门B' },
            { id: 5, name: '呼延灼', department: '部门C' },
            { id: 6, name: '花荣', department: '部门C' },
            { id: 7, name: '柴进', department: '部门D' },
            { id: 8, name: '李应', department: '部门D' },
            { id: 9, name: '朱仝', department: '部门E' },
            { id: 10, name: '鲁智深', department: '部门E' },
            { id: 11, name: '武松', department: '部门F' },
            { id: 12, name: '董平', department: '部门F' },
            { id: 13, name: '张清', department: '部门F' }
          ],
          totalPage: 1,
          totalRecord: 2
        },
        timestamp: Date.parse(new Date())
      },
      roleDefaultExpandedKeys: [], // 角色树默认选中
      departmentDefaultExpandedKeys: [] // 部门树默认选中
    };
  },
  created() {
    // this.gridResult = JSON.parse(JSON.stringify(this.girdOptions)); // _cloneDeep
    this.gridResult = _cloneDeep(this.girdOptions.data.results);
    // console.log('eee ', this.gridResult);
    // 测试响应式
    setTimeout(() => {
      this.value = [
        {
          role: [
            {
              menuName:
                '据外媒11月26日报道，菲律宾国防部长德尔芬·洛伦扎纳警告称',
              id: 7
            },
            { menuName: '基金募集管理', id: 8 },
            { menuName: '用户管理', id: 12 },
            { menuName: '下拉菜单', id: 26 }
          ]
        },
        { department: [{ menuName: '一级 2', id: 2 }] },
        {
          user: [
            { menuName: '秦明', id: 4 },
            { menuName: '柴进', id: 7 }
          ]
        }
      ];
      this.$nextTick(this.setDefautHandler);
    }, 2000);
  },
  methods: {
    /**
     * @desc 数据过滤
     */
    filterHandler(val, activeName) {
      console.log('...filter...', val, activeName);
      if (activeName === 'role') {
        this.$refs['role-ref'].getTree().filter(val);
      } else if (activeName === 'department') {
        this.$refs['department-ref'].getTree().filter(val);
      } else if (activeName === 'user') {
        this.gridSearch = true; // 设置搜索状态
        this.girdOptions.data.results = _filter(this.gridResult, v =>
          v.name.includes(val)
        );
        this.$nextTick(() => {
          const oCheckedUser = _find(this.value, o => _keys(o)[0] === 'user');
          if (!_isEmpty(oCheckedUser)) {
            this.$refs['user-grid-ref'].selectRows(
              _map(oCheckedUser.user, o => ({ field: 'id', value: o.id }))
            ); // 切换选中行
            this.$nextTick(() => {
              this.gridSearch = false;
            });
          } else {
            this.gridSearch = false; // 取消搜索状态
          }
        });
        /* this.$nextTick(() => {
          console.log('ppppppppppppp', this.gridCheckedList);
          this.$refs['select-transfer-tree-ref'].setActivateTabData(this.gridCheckedList);
        }); */
        /* this.girdOptions.data.results = [
          { id: 1, name: '公孙胜', department: '部门A' },
          { id: 2, name: '关胜', department: '部门A' },
          { id: 3, name: '林冲', department: '部门B' }
        ]; */
      }
    },
    /**
     * @desc tree 的搜索
     */
    filterNode(value, data) {
      if (!value) return true;
      return (
        _get(data, this.treeAttribute.displayField, 'name').indexOf(value) !==
        -1
      );
    },
    /**
     * @desc tree 的搜索
     */
    filterDepartmentNode(value, data) {
      if (!value) return true;
      return _get(data, 'label', data.name).indexOf(value) !== -1;
    },
    /**
     * @desc 角色树的选中切换事件
     */
    roleTreeChange(checkedValues, node, treeCheckedNode) {
      if (_isNil(node) || _isNil(treeCheckedNode)) {
        return;
      }
      const treeCheckedStore = _filter(
        _map(treeCheckedNode.checkedNodes, v => {
          // if (!_has(v, this.childrenField)) {
          const oFieldNode = {
            menuName: v.menuName,
            id: v.id
          };
          return oFieldNode;
          // }
        }),
        v => !_isNil(v)
      );
      this.$refs['select-transfer-tree-ref'].setActivateTabData(
        treeCheckedStore
      );
    },
    /**
     * @desc 部门树的选中切换事件
     */
    departmentTreeChange(checkedValues, node, treeCheckedNode) {
      if (_isNil(node) || _isNil(treeCheckedNode)) {
        return;
      }
      const treeCheckedStore = _filter(
        _map(treeCheckedNode.checkedNodes, v => {
          // if (!_has(v, this.childrenField)) {
          const oFieldNode = {
            menuName: v.label,
            id: v.id
          };
          return oFieldNode;
          // }
        }),
        v => !_isNil(v)
      );
      this.$refs['select-transfer-tree-ref'].setActivateTabData(
        treeCheckedStore
      );
    },
    /**
     * @desc 当用户手动勾选数据行的 Checkbox 时触发的事件
     */
    gridSelect(selection, row) {
      console.log(
        '当用户手动勾选数据行的 Checkbox 时触发的事件',
        selection,
        row
      );
      let curSelection = selection;
      // 搜索状态时不进行切换
      if (_isNil(selection) || this.gridSearch) {
        return;
      }
      let checkedState = true; // 选中状态
      if (_isNil(_find(selection, o => o.id === row.id))) {
        checkedState = false;
      }
      if (_isEmpty(selection)) {
        if (!_isEmpty(this.value)) {
          const aUserList = _find(this.value, v => _keys(v)[0] === 'user').user;
          const oMenuIndex = _findIndex(aUserList, o => o.id === row.id);
          aUserList.splice(oMenuIndex, 1);
          curSelection = aUserList;
        }
      } else {
        if (!_isEmpty(this.value)) {
          let aUserList = _find(this.value, v => _keys(v)[0] === 'user').user;
          aUserList = _filter(aUserList, o => {
            const selectIndex = _findIndex(selection, v => v.id === o.id);
            if (selectIndex === -1 && checkedState) {
              return o;
            }
          });
          if (!_isEmpty(aUserList)) {
            curSelection.push(...aUserList);
          }
        }
      }
      const gridCheckedStore = _filter(
        _map(curSelection, v => {
          const oFieldNode = {
            menuName: _get(v, 'name', v.menuName),
            id: v.id
          };
          return oFieldNode;
        }),
        v => !_isNil(v)
      );
      this.$refs['select-transfer-tree-ref'].setActivateTabData(
        gridCheckedStore
      );
    },
    /**
     * @desc 全选
     */
    gridAllSelection(selection) {
      if (
        _isEmpty(this.value) ||
        _find(this.value, v => _keys(v)[0] === 'user')
      ) {
        const gridCheckedStore = _filter(
          _map(selection, v => {
            const oFieldNode = {
              menuName: _get(v, 'name', v.menuName),
              id: v.id
            };
            return oFieldNode;
          }),
          v => !_isNil(v)
        );
        this.$refs['select-transfer-tree-ref'].setActivateTabData(
          gridCheckedStore
        );
      }
      if (_isEmpty(selection)) {
        this.$refs['select-transfer-tree-ref'].setActivateTabData([]);
      }
      /* console.log('aaa ', selection);
      const curSelection = selection;
      if (!_isEmpty(this.value)) {
        let aUserList = _find(this.value, v => _keys(v)[0] === 'user').user;
        aUserList = _filter(aUserList, o => {
          const selectIndex = _findIndex(selection, v => v.id === o.id);
          if (selectIndex === -1) {
            return o;
          }
        });
        if (!_isEmpty(aUserList)) {
          curSelection.push(...aUserList);
        }
      }
      const gridCheckedStore = _filter(
        _map(curSelection, v => {
          const oFieldNode = {
            menuName: _get(v, 'name', v.menuName),
            id: v.id
          };
          return oFieldNode;
        }),
        v => !_isNil(v)
      );
      this.$refs['select-transfer-tree-ref'].setActivateTabData(
        gridCheckedStore
      ); */
    },
    /**
     * @desc 右侧tab中数据项的移除事件
     * @param {Array} datas - 当前tab页中所选择的列表-响应式对象
     * @param {String} activeName - 当前的激活项
     * @param {Object} item - 当前的移除项
     * @param {Object} event - 点击事件对象
     */
    removeItem(datas, item, activeName, event) {
      if (activeName === 'role') {
        const index = _findIndex(datas, o => o.id === item.id);
        if (index !== -1) {
          datas.splice(index, 1);
          this.$nextTick(() => {
            this.$refs['role-ref'].setCheckedKeys(_map(datas, o => o.id));
          });
        }
      }
      if (activeName === 'department') {
        const index = _findIndex(datas, o => o.id === item.id);
        if (index !== -1) {
          datas.splice(index, 1);
          this.$nextTick(() => {
            this.$refs['department-ref'].setCheckedKeys(_map(datas, o => o.id));
          });
        }
      }
      if (activeName === 'user') {
        const index = _findIndex(datas, o => o.id === item.id);
        if (index !== -1) {
          const oRemoveRow = datas[index];
          datas.splice(index, 1);
          this.$nextTick(() => {
            this.$refs['user-grid-ref'].selectRows([
              { field: 'id', value: oRemoveRow.id }
            ]); // 切换选中行
          });
        }
      }
    },
    /**
     * @desc select 切换
     */
    onSelectChange(item) {
      this.transferTitle = this.oTransferTitle[item];
    },
    /**
     * @desc 设置默认选择
     */
    setDefautHandler() {
      console.log('设置默认选择', this.value);
      if (_isEmpty(this.value)) {
        return;
      }
      const aRoleList = _find(this.value, v => _keys(v)[0] === 'role');
      const aDepartmentList = _find(
        this.value,
        v => _keys(v)[0] === 'department'
      );
      if (!_isEmpty(aRoleList)) {
        setTimeout(() => {
          this.roleDefaultExpandedKeys = _map(aRoleList.role, o => o.id);
        }, 0);
      }
      if (!_isEmpty(aDepartmentList)) {
        setTimeout(() => {
          this.departmentDefaultExpandedKeys = _map(
            aDepartmentList.department,
            o => o.id
          );
        }, 0);
      }
      console.log('aRoleList', aRoleList);
    },
    /**
     * @desc grid 加载完成
     */
    onLoadSuccess(data) {
      const aUserList = _find(this.value, v => _keys(v)[0] === 'user');
      if (!_isEmpty(aUserList)) {
        this.$refs['user-grid-ref'].selectRows(
          _map(aUserList, o => ({ field: 'id', value: o.id }))
        ); // 切换选中行
      }
    },
    /**
     * @desc tree 数据加载完成
     */
    treeLoadSuccess(data) {
      this.$nextTick(() => {
        const oTreeRef = this.$refs['transfer-tree-ref'].getTree();
        const aExpandedKeys = [];
        const aValueList = _map(this.value1, o => {
          aExpandedKeys.push(o.id);
          return { id: o.id, menuName: oTreeRef.getNode(o.id).data.menuName };
        });
        this.value1 = aValueList;
        this.treeAttribute1['default-checked-keys'] = aExpandedKeys;
        this.treeAttribute1['default-expanded-keys'] = aExpandedKeys;
      });
    }
  }
};
</script>

<style lang="less" module>
.box {
  .full-y;

  overflow: auto;
  .wrapper {
    height: 550px;
  }
}
</style>
