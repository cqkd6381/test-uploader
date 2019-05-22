<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="form-group">
      <div class="input-group">
        <input class="form-control datetimepicker" placeholder="有效期" type="text">
        <div class="input-group-addon">
          <i class="ti-calendar"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  methods: {
    init() {
      $(".datetimepicker").datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        autoclose: true,
        startView: 0,
        minView: 2,
        pickerPosition: "bottom-right",
        language: "zh-CN",
        todayHighlight: true
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

