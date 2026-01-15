
const dddd = (callBack, time)=>{
  var timer = null
  return (...args)=>{
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      callBack(...args)
    },time)
  }
}



const th = (callBack, time)=>{
  var time1 = 0;
  return (...args)=>{
    if(new Date().getTime() - time1 >= time || time1 === 0){
      callBack(...args)
      time1 = new Date().getTime()
    }
  }
}

function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

const aa = th((a,b)=>{
  console.log(a, b)
},5000)
