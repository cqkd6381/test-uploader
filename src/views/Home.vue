<template>
  <uploader :options="options" @complete="complete" class="uploader-example">
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
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        // 目标上传 URL
        target: "//localhost:3000/upload",
        // 单文件上传
        // singleFile: true,
        // 分块时按照该值来分
        chunkSize: 10 * 1024 * 1024,
        // // 是否强制所有的块都是小于等于 chunkSize 的值
        // // forceChunkSize
        // // 并发上传数，默认 3
        // simultaneousUploads: 3,
        // // 上传文件时文件的参数名
        // // fileParameterName
        // // 其他额外的参数
        // query: {},
        // headers: {},
        // withCredentials: false,
        // // 当上传的时候所使用的是方式，可选 multipart、octet
        // method: "multipart",
        // testMethod: "get",
        // uploadMethod: "post",
        // // 上传过的文件，是否还允许再次上传
        // allowDuplicateUploads: false,
        // // 是否优先上传第一个和最后一个
        // prioritizeFirstAndLastChunk: false,
        // // 是否测试每个块是否在服务端已经上传了，主要用来实现秒传、跨浏览器上传
        // testChunks: true,
        // preprocess: function(chunk) {
        //   console.log("当前正在上传的chunk: " + chunk.offset);
        //   // console.log(chunk);
        //   chunk.preprocessFinished();
        // },
        // initFileFn: function(file) {
        //   // console.log(file);
        //   file.aaaaaaaaaaaaaaa = 3;
        // },
        // readFileFn: function(file, fileType, startByte, endByte, chunk) {
        //   // console.log(file);
        //   // console.log(fileType);
        //   // console.log(startByte + " - " + endByte);
        //   // console.log(chunk);
        //   chunk.readFinished(endByte);
        // },
        // checkChunkUploadedByResponse: function(chunk, response) {
        //   // console.log(chunk);
        //   // console.log(response);
        // },
        // generateUniqueIdentifier: null,
        // maxChunkRetries: 0,
        // chunkRetryInterval: null,
        // progressCallbacksInterval: 500,
        // speedSmoothingFactor: 0.1,
        // successStatuses: [200, 201, 202],
        // permanentErrors: [404, 415, 500, 501],
        // initialPaused: true,
        // // 处理请求结果
        // processResponse: function(response, cb) {
        //   // console.log("处理请求结果");
        //   // console.log(response);
        //   cb(null, response);
        // },
        // processParams: function(params) {
        //   return params;
        // },
        // // ----------------
        autoStart: false,
        // parseTimeRemaining: function(timeRemaining, parsedTimeRemaining) {
        //   return parsedTimeRemaining
        //     .replace(/\syears?/, "年")
        //     .replace(/\days?/, "天")
        //     .replace(/\shours?/, "小时")
        //     .replace(/\sminutes?/, "分钟")
        //     .replace(/\sseconds?/, "秒");
        // },
        // categoryMap: {
        //   image: ["gif", "jpg", "jpeg", "png", "bmp", "webp"],
        //   video: ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"],
        //   audio: ["mp3", "wav", "wma", "ogg", "aac", "flac"],
        //   document: [
        //     "doc",
        //     "txt",
        //     "docx",
        //     "pages",
        //     "epub",
        //     "pdf",
        //     "numbers",
        //     "csv",
        //     "xls",
        //     "xlsx",
        //     "keynote",
        //     "ppt",
        //     "pptx"
        //   ]
        // }
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
      autoStart: false
    };
  },
  methods: {
    // 上传完成
    complete() {
      console.log("complete", arguments);
    },
    // 一个根文件（文件夹）成功上传完成。
    fileComplete() {
      console.log("file complete", arguments);
    }
  }
};
</script>
<style>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
