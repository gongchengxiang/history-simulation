const History = function () {
  this.urlList = [];
}
// 前进
History.prototype.forward = function(){
  if(this.urlList.length>0){
    if(this.urlList[this.urlList.length-1].active){
      // 前进到头了
    }else{
      const len = this.urlList.length;
      for(let i=0; i<len; i++){
        if(this.urlList[i].active){
          this.urlList[i].active = false;
          this.urlList[i+1].active = true;
          break;
        }
      }
    }
    return this;
  }
}
// 后退
History.prototype.back = function(){
  if(this.urlList.length>0){
    if(this.urlList[0].active){
      // 退到头了
    }else{
      const len = this.urlList.length;
      for(let i=0; i<len; i++){
        if(this.urlList[i].active){
          this.urlList[i].active = false;
          this.urlList[i-1].active = true;
          break;
        }
      }
    }
    return this;
  }
}
// 在记录中穿梭
History.prototype.go = function(num){
  if(typeof num  === 'number'){
    const len = this.urlList.length;
    if(len){
      let activeIndex;
      for(let i=0; i<len; i++){
        if(this.urlList[i].active){
          activeIndex = i;
          break;
        }
      }
      if(activeIndex + num >= 0 && activeIndex + num <= len-1){
        this.urlList[activeIndex].active = false;
        this.urlList[activeIndex+num].active = true;
      }
    }
    return this;
  }
}
// 去往一个地址
History.prototype.push = function(url){
  let activeIndex = -1;
  const len = this.urlList.length;
  for(let i=0; i<len; i++){
    if(this.urlList[i].active){
      activeIndex = i;
      this.urlList[i].active = false;
      break;
    }
  }
  this.urlList.splice(
    activeIndex + 1,
    this.urlList.length - activeIndex - 1,
    { url, active:true }
  )
  return this;
}