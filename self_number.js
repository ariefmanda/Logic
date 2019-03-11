let selfNumber = (num = 10) => {
  // function for add 2 data result of split
  let reduce = (x1,x2)=> parseInt(x1) + parseInt(x2)
  // generate array with "array from" for first
  return Array.from({length: num}, (v, k) => k+1).reduce((acc,value)=>{
    let check = true
     // generate array with "array from" for get own self number
    Array.from({length: value}, (v, k) => k+1).forEach(e=>{
      var compare = parseInt(e.toString().split('').reduce(reduce))
      if (e + compare == value) check = false
    })
    if(check) acc.push(value)
    return acc
  },[])
}

console.log(selfNumber(12))
