<template>
  <div :class="$style.box">
    <h3>
      上传文件（excel）成功后，前端发起文件校验接口请求（将文件再次传到后台），后台校验成功后再次将第一步后台返回的文件oss服务器的链接地址发送给后台接口
    </h3>
    <pre>
      1.先用element上传文件组件上传文件，然后上传成功后调用验证接口是否通过验证，通过验证后调用保存接口，保存上传成功返回的url
{{ uploadHtml }}
2.监听el-upload上传成功事件调用验证接口，验证成功后调用保存接口
    /**
     * @desc 监听导入成功
     */
    handleSuccess(response, file, fileList) {
      this.ruleForm.fileUrl = response.data;
      this.ruleForm.fileName = file.name;
      if (response.code === this.$constant.apiServeCode.SUCCESS_CODE) {
        this.upLoad();//调用保存接口
      } else {
        this.$errorMsg(response.mesg);
        this.$refs.upload.clearFiles();
        this.parent.submitLoading = false;
      }
      // }
    },
3.调用保存接口
    upLoad() {
      const file = this.fileList[0];
      const formdata = new FormData();
      formdata.append('file', file.raw);
      formdata.append('summaryId', this.row.id);
      this.$axios({
        method: 'post',
        url: '/api/garden-management/performanceAppraisal/checkImportFile',
        data: formdata,
        headers: this.headers
      }).then(res => {
        const { data } = res;
        const { type, list } = data?.data || {};
        if (data.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          if (type === 0) {
            this.saveImportFile(this.row, file);
          } else if (type === 1 || type === 2) {
            this.$errorMsg(
              '因为模板匹配不成功，导致数据上传失败，请下载正确的模板上传数据'
            );
          } else if (type === 3) {
            this.dialogTableVisible = true;
            this.errorList =
              list.map(item => {
                return { name: item };
              }) || [];
          } else if (type === 4) {
            this.$errorMsg('上传的文件中有园区重复，请检查后重新上传');
          }
        } else {
          this.parent.submitLoading = false;
        }
      });
    },
    /**
     * @desc @desc 绩效评价-数据上传-保存文件信息
     */
    saveImportFile(row) {
      const formData = this.ruleForm;
      const params = {
        summaryId: row.id,
        fileName: formData.fileName,
        fileUrl: formData.fileUrl
      };
      this.$api['appraisal/upload-data/saveImportFile']({ params }).then(
        resData => {
          this.parent.submitLoading = false;
          if (this.$constant.apiServeCode.SUCCESS_CODE === resData.code) {
            this.$successMsg('上传成功');
            this.parent.$refs['base-grid'].reloadGrid();
            this.parent.dialog.close();
          } else {
            this.$errorMsg(resData.mesg);
          }
        }
      );
    },
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    this.uploadHtml = `<el-upload
          ref="upload"
          :headers="headers"
          :accept="accept"
          action="/api/garden-management/uploadMinio/upload"
          :on-success="handleSuccess"
          :on-change="uploadChange"
          :on-error="handleError"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip">只能上传xls/xlsx文件</div>
        </el-upload>`;
    return {};
  }
};
</script>
<style lang="less" module>
.box {
  overflow: auto;
}
</style>
