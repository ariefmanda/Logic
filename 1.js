let selfNumber = (num = 10) => {
  let reduce = (x1,x2)=> parseInt(x1) + parseInt(x2)
  return Array.from({length: num}, (v, k) => k+1).reduce((acc,value)=>{
    let check = true
    Array.from({length: value}, (v, k) => k+1).forEach(e=>{
      var compare = parseInt(e.toString().split('').reduce(reduce))
      if (e + compare == value) check = false
    })
    if(check) acc.push(value)
    return acc
  },[])
}

console.log(selfNumber(12))
