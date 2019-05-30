<template>
  <div id="frame">
    <h3>Demo</h3>
    <div class="uploader-error" v-show="isShowError">
      Your browser, unfortunately, is not supported by simple-uploader.js. The library requires support for
      <a
        href="http://www.w3.org/TR/FileAPI/"
      >the HTML5 File API</a>
      along with
      <a href="http://www.w3.org/TR/FileAPI/#normalization-of-params">file slicing</a>
      .
    </div>
    <div
      class="uploader-drop"
      ref="drop"
      v-show="isShowDrop"
      ondragend="jQuery(this).removeClass('uploader-dragover');"
      ondragenter="jQuery(this).addClass('uploader-dragover');"
      ondrop="jQuery(this).removeClass('uploader-dragover');"
    >
      Drop files here to upload or
      <a class="uploader-browse-folder" ref="folder">
        <u>上传文件夹</u>
      </a>
      or
      <a class="uploader-browse" ref="file">
        <u>上传文件</u>
      </a>
      or
      <a class="uploader-browse-image" ref="image">
        <u>上传图片</u>
      </a>
    </div>
    <div class="uploader-progress" v-show="isShowProgress">
      <table>
        <tr>
          <td width="100%">
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
          <td class="progress-text" nowrap="nowrap"></td>
          <td class="progress-pause" nowrap="nowrap">
            <a
              class="progress-resume-link"
              href="javascript:;"
              onclick="r.upload()"
              v-show="isShowProgressResume"
            >
              <img src="@/assets/resume.png" title="Resume upload">
            </a>
            <a
              class="progress-pause-link"
              href="javascript:;"
              onclick="r.pause()"
              v-show="isShowProgressPause"
            >
              <img src="@/assets/pause.png" title="Pause upload">
            </a>
            <a
              class="progress-cancel-link"
              href="javascript:;"
              onclick="r.cancel()"
              v-show="isShowProgressCancle"
            >
              <img src="@/assets/cancel.png" title="Cancel upload">
            </a>
          </td>
        </tr>
      </table>
    </div>
    <ul class="uploader-list">
      <li class="uploader-file" v-for="file in fileList" :key="file.id">
        Uploading----
        <span class="uploader-file-name">{{file.name}}----</span>
        <span
          class="uploader-file-size"
        >{{formatProgress(file.progress())}}----{{file.getFormatSize()}}----</span>
        <span class="uploader-file-progress">{{formatSize(file.averageSpeed)}}----</span>
        <span class="uploader-file-progress">{{file.timeRemaining()}}----</span>
        <span class="uploader-file-progress">(completed)----</span>
        <span class="uploader-file-pause" @click="pauseFile(file)" v-show="file.paused">
          暂停
          <img src="@/assets/pause.png" title="Pause upload">
        </span>
        <span class="uploader-file-resume" @click="resumeFile(file)" v-show="!file.paused">
          开始
          <img src="@/assets/resume.png" title="Resume upload">
        </span>
        <span class="uploader-file-cancel" @click="cancelFile(file)">
          <img src="@/assets/cancel.png" title="Cancel upload">
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import Uploader from "simple-uploader.js";
// import { login, test } from "../api/index";

export default {
  name: "Uploader",
  data() {
    return {
      options: {
        target: "//localhost:3000/upload",
        chunkSize: 10 * 1024 * 1024,
        autoStart: false
      },
      files: [],
      fileList: [],
      autoStart: true,
      isShowProgress: false,
      isShowProgressResume: false,
      isShowProgressPause: false,
      isShowProgressCancle: false,
      isShowError: false,
      isShowDrop: false,
      uploader: null
    };
  },
  created() {
    // test();
    const uploader = new Uploader(this.options);
    this.uploader = uploader;
  },
  mounted() {
    if (!this.uploader.support) {
      this.isShowError = true;
      return false;
    }
    this.isShowDrop = true;
    // this.uploader.on("fileAdded", this.fileAdded);
    this.uploader.on("filesAdded", this.filesAdded);
    this.uploader.on("fileSuccess", this.fileSuccess);
    // this.uploader.on("filesSubmitted", this.filesSubmitted);
    this.uploader.assignDrop(this.$refs.drop);
    this.uploader.assignBrowse(this.$refs.file);
    this.uploader.assignBrowse(this.$refs.folder, true);
    this.uploader.assignBrowse(this.$refs.image, false, false, {
      accept: "image/*"
    });
  },
  methods: {
    filesAdded(files, fileList) {
      let that = this;
      this.files = files;
      this.fileList = fileList.map(function(file) {
        file.isShowPause = true;
        file.isShowResume = true;
        return file;
      });
      this.isShowProgress = true;
      this.isShowProgressResume = true;
      this.isShowProgressPause = true;
      this.isShowProgressCancle = true;
    },
    fileSuccess(rootFile, file, message, chunk) {
      console.log(1111);
    },
    filesSubmitted(files, fileList) {
      // this.uploader.upload();
    },
    complete() {
      this.isShowProgressPause = false;
      this.isShowProgressCancle = false;
    },
    // 暂停
    pauseFile(file) {
      console.log(111111);
      file.isShowPause = false;
      file.isShowResume = false;
      file.pause();
    },
    // 重新开始
    resumeFile(file) {
      file.name = "11111.txt";
      console.log(222222);
      file.isShowPause = false;
      file.isShowResume = false;
      file.resume();
    },
    cancelFile(file) {
      file.cancel();
      let index = this.fileList.indexOf(file);
      this.fileList.splice(index, 1);
    },
    formatProgress(progress) {
      return "已上传：" + Math.floor(progress * 100) + "%";
    },
    formatSize: function(size) {
      let formatSize;
      if (size < 1024) {
        formatSize = size.toFixed(0) + " bytes";
      } else if (size < 1024 * 1024) {
        formatSize = (size / 1024.0).toFixed(0) + " KB";
      } else if (size < 1024 * 1024 * 1024) {
        formatSize = (size / 1024.0 / 1024.0).toFixed(1) + " MB";
      } else {
        formatSize = (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + " GB";
      }
      return "上传速率：" + formatSize + " / s";
    }
  }
};
</script>

<style scoped src="../assets/style.css">