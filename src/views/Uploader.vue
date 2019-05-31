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
              @click="upload"
              v-show="isShowProgressResume"
            >
              <img src="@/assets/resume.png" title="Resume upload">
            </a>
            <a
              class="progress-pause-link"
              href="javascript:;"
              @click="pause"
              v-show="isShowProgressPause"
            >
              <img src="@/assets/pause.png" title="Pause upload">
            </a>
            <a
              class="progress-cancel-link"
              href="javascript:;"
              @click="cancel"
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
        <span class="uploader-file-size">{{file.getFormatSize()}}----</span>
        <span class="uploader-file-progress">
          <span>已上传：{{formatProgress(file.progress())}}%----</span>
          <span>上传速率：{{formatSize(file.averageSpeed)}} / s----</span>
          <span>剩余时间：{{secondsToStr(file.timeRemaining())}}----</span>
        </span>
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
import { setToken } from "../api/auth";
import { login, test } from "../api/index";

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
    login()
      .then(res => {
        let token = res.entity.token;
        setToken(token);
      })
      .catch();
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
    this.on("filesAdded", this.filesAdded);
    this.on("fileSuccess", this.fileSuccess);
    // this.uploader.on("filesSubmitted", this.filesSubmitted);
    this.assignDrop(this.$refs.drop);
    this.assignBrowse(this.$refs.file);
    this.assignBrowse(this.$refs.folder, true);
    this.assignBrowse(this.$refs.image, false, false, {
      accept: "image/*"
    });
  },
  methods: {
    // ------------------Uploader-------------------
    // ------方法--------
    assignDrop(domNodes) {
      this.uploader.assignDrop(domNodes);
    },
    assignBrowse(domNodes, isDirectory, singleFile, attributes) {
      this.uploader.assignBrowse(domNodes, isDirectory, singleFile, attributes);
    },
    unAssignDrop(domNodes) {
      this.uploader.unAssignDrop(domNodes);
    },
    on(event, callback) {
      this.uploader.on(event, callback);
    },
    off(event, callback) {},
    upload() {
      this.uploader.upload();
    },
    pause() {
      this.uploader.pause();
    },
    resume() {
      this.uploader.resume();
    },
    cancel() {
      this.uploader.cancel();
    },
    progress() {
      this.uploader.progress();
    },
    isUploading() {},
    addFile() {},
    removeFile() {},
    getFromUniqueIdentifier() {},
    getSize() {},
    sizeUploaded() {},
    timeRemaining() {},

    // ------事件--------
    fileSuccess(rootFile, file, message, chunk) {
      console.log(1111);
    },
    fileComplete(rootFile) {
      console.log("fileComplete");
    },
    fileProgress(rootFile, file, chunk) {},
    fileAdded(file, event) {},
    filesAdded(files, fileList, event) {
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
    filesSubmitted(files, fileList, event) {},
    fileRemoved(file) {},
    fileRetry(rootFile, file, chunk) {},
    fileError(rootFile, file, message, chunk) {},
    uploadStart() {},
    complete() {
      this.isShowProgressPause = false;
      this.isShowProgressCancle = false;
    },

    // ------------------Uploader.File-------------------
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
      return Math.floor(progress * 100);
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
      return formatSize;
    },
    secondsToStr: function(temp) {
      function numberEnding(number) {
        return number > 1 ? "s" : "";
      }
      var years = Math.floor(temp / 31536000);
      if (years) {
        return years + " year" + numberEnding(years);
      }
      var days = Math.floor((temp %= 31536000) / 86400);
      if (days) {
        return days + " day" + numberEnding(days);
      }
      var hours = Math.floor((temp %= 86400) / 3600);
      if (hours) {
        return hours + " hour" + numberEnding(hours);
      }
      var minutes = Math.floor((temp %= 3600) / 60);
      if (minutes) {
        return minutes + " minute" + numberEnding(minutes);
      }
      var seconds = temp % 60;
      return seconds + " second" + numberEnding(seconds);
    }
  }
};
</script>

<style scoped src="../assets/style.css">