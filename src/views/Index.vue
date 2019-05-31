<template>
  <uploader
    :options="options"
    :auto-start="autoStart"
    :file-status-text="statusText"
    @file-added="fileAdded"
    @file-success="fileSuccess"
    @complete="complete"
    @file-complete="fileComplete"
    class="uploader-example"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>select files</uploader-btn>
      <uploader-btn :attrs="attrs">select images</uploader-btn>
      <uploader-btn :directory="true">select folder</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
import { login, test, uploadFirst } from "../api/index";
export default {
  name: "Index",
  data() {
    return {
      options: {
        target: "//localhost:3000/upload",
        chunkSize: 10 * 1024 * 1024
      },
      attrs: {
        accept: "image/*"
      },
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      },
      autoStart: false,
      uploadSeting: {
        upload_chunk_size: null,
        upload_token: null,
        upload_params: []
      }
    };
  },
  methods: {
    // 一个文件被添加（不一定是真的添加）
    fileAdded(file, event) {
      let params = {
        file_name: file.name,
        byte: file.size,
        disk_type: "cloud",
        group_number: ""
      };
      console.log(params);
      uploadFirst(params)
        .then(res => {
          this.uploadSeting.upload_chunk_size = res.entity.upload_chunk_size;
          this.uploadSeting.upload_token = res.entity.upload_token;
          this.uploadSeting.upload_params = res.entity.upload_params;
          console.log(this.uploadSeting);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 一个文件上传成功事件
    fileSuccess(rootFile, file, message, chunk) {
      console.log(
        rootFile.name + "是：" + (rootFile.isFolder ? "文件夹" : "文件")
      );
      console.log(file.relativePath);
    },
    // 一个根文件（文件夹）成功上传完成。
    fileComplete(rootFile) {
      // console.log(rootFile.name);
      // console.log("file complete", arguments);
    },
    // 全部上传完成
    complete() {
      console.log("complete", arguments);
    }
  }
};
</script>

<style scoped>
</style>