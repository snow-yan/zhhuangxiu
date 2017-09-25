//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp();
Page({
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:500,
    showfilterindex:0,
    head:'西安'
  },
  onLoad: function () {        
      // lunbo图
    console.log(1)
      
    var self=this;
    wx.request({
      url: util.search+'index.php?s=/index/adv',
      success: function (res) {
        console.log(res)
        var date = res.data.info;       
          self.setData({
            lunbo: date
          })
        }
    });    
    
    
  },
  onReady:function(){
    this.anli()
    this.team()
    this.city()
  },
  // 表单提交
  formSubmit: function (e) {
    var self = this;
    // console.log(e.detail.value)
    var val = e.detail.value;
    // console.log(val.name)
    if (val.name.length == 0 || val.telPhone.length == 0 || val.loupan.length == 0 || val.mianji.length == 0) {
      wx.showModal({
        content: '表单不能为空！',
      })
    } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(val.telPhone))) {
      wx.showToast({
        title: '请输入正确的电话号码！！',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.request({
        url: util.search + 'index.php?s=/builprice/index',
        data: { "name": val.name, "tel": val.telPhone, "buildname": val.loupan, area: val.mianji },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // console.log(res)
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          self.closeAlert()
        },
        fail: function () {
          // console.log('==========')
        }

      })

    }
  },  
  // 筛选区域
  click_sx: function (e) {
    var keys = e.currentTarget.dataset.key;
    var name = e.currentTarget.dataset.name;
    this.data.head = name;   
    this.setData({
      head: this.data.head,     
    })
   this.setData({
     showfilterindex:2
   })
  },
  city: function () {
    var self = this;
    wx.request({
      url: util.search + 'index.php?s=/config/config',
      success: function (res) {
        // console.log(res)
        self.setData({
          citys: res.data[0],        
        })
      }
    })
  },
  getArea: function () {
    var i=this.data.showfilterindex;
    i+=1;
    this.setData({
      showfilterindex: i
    })
  },
  // 经典案例
  anli:function(){
    var self = this;    
    var arr=[];
    wx.request({
      url: util.search+'index.php?s=/index/example',
      success: function (res) {     
       if(res.data.info.length>=5){
          for (var i = 0; i <=4; i++) {
            arr.push(res.data.info[i])
          }          
          console.log(arr)
          self.setData({
            anliS: arr
          })
       }else{
         self.setData({
           anliS: res.data.info
         })
       }
        
          
        // console.log(arr)
        
      }    
    })
  },
  // 设计团队
  team:function(){
    var self = this;
    var arr = [];    
    wx.request({      
      url: util.search+'index.php?s=/index/designer',
      success: function (res) {
        if (res.data.info.length >= 5) {
          for (var i = 0; i <= 4; i++) {
            arr.push(res.data.info[i])
          }
          console.log(arr)
          self.setData({
            sheji: arr
          })
        } else {
          self.setData({
            sheji: res.data.info
          })
        }

      }
    })
  }, 
 
})
