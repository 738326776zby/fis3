var $ = require('../../module/jquery');
// require('../../common/common.js');
// require('../../common/validate.js');
var axios = require('../../module/axios');
var main ={
  init:function(){
    this.bindEvent();
  },
  bindEvent:function(){
    $('#btn').click(function(){
        axios.post('/post2',{
          params:1
        }).then(function(response){
          alert(response);
        })
        .catch(function(err){
          console.log(err);
        });
    })
  }
}
module.exports = main;