
// □■□■□■□■
// □□□□□■□□
// ■□■□□■□■
// □□□□□□□□
// □□□■□□□□
// □□□□□■□■
// □■□□□□□□
// □□□□■□■□

let random_wall = () => Math.floor(Math.random() * 6) > 3.5

const make_table = ({ rows, total_wall }) => {
  let table = []
  Array.from({length: rows}, (v, k) => k+1).map((e,i)=>{
    table.push([])
    Array.from({length: rows}, (v, k) => k+1).map(()=>{
      table[i].push(random_wall() ? 1 : 0)
    })
  })
  return table
}

let check_field = (row, index) => {
  let check = true
  for (var i = 0; i <= row.length; i++) {
    if(row[i]==2){
      let check_wall = false
      let length = row.length
      let array_reverse =  row.reverse().slice(length - index, (length - i) - 1 )
      if(array_reverse[0]){
        for (var x = 0; x <= array_reverse.length; x++) {
          if(array_reverse[x] == 1) {
            check_wall = true
            break
          } else if(array_reverse[x] == 2){
            check_wall = false
            break
          }
        }
      }
      if(!check_wall) {
        check = false
        break
      } else {
        break
      }
    }
  }
  return check
}

let check = (object, x) => {
  let { index, table_3 } = object
  let check = false
  let table_length = table_3.length
  let row = Math.floor(index/table_length)
  let column = (index%table_length)
  let array_row = table_3[row]
  let array_column = table_3.map(e=> e[column])
  if(table_3[row][column] == 0){
    let check_row = check_field([...array_row], column )
    let check_col = check_field([...array_column], row )
    if(check_row && check_col){
      table_3[row][column] = 2
      check = true
    }
  }
  return {
    table_3,
    result: check
  }
}

let clear_force = (force) => force.map(element=>element.map(e=> e == 2 ? 0 : e))

let get_init_index = (force) => {
  let index_first_way = 0
  force.map((element, index)=>{
     if(index_first_way == 0) {
       let index_of = element.indexOf(2)
       if(index_of > -1){
          index_first_way *= index
          index_first_way += index_of
       }
     }
  })
  return index_first_way
}

let header = (object) => {
  let { total_gunman = 10, rows = 8, total_wall = 18  } = object
  console.log(`-- Total gunman ${total_gunman} --`)
  console.log(`-- Total Row Table ${rows} --`)
  console.log(`-- Total Wall ${total_wall} --`)
  console.log(`Code board:`)
  console.log(`0: Empty Space`)
  console.log(`1: Wall`)
  console.log(`2: Gunman\n\n`)
}

const gunman = (object = {}) => {
  header(object)
  let { total_gunman = 10, rows = 8, total_wall = 18  } = object
  let table = make_table({ rows, total_wall })
  let possible_ways = 0
  let index_next_way = 0
  for (let index = 0; index < ((rows * rows) - total_gunman) ; index++) {
    let count_possible = 0
    let table_2 = clear_force(table)
    for (let i = 0; i < (((rows * rows) - (index + index_next_way))) ; i++) {
      let check_table = check({index: (i + index + index_next_way), 
      table_3: table_2}, table)
      if(check_table.result) {
        table_2 = check_table.table_3
        count_possible += 1
      }
      if(count_possible >= total_gunman){
        index_next_way = get_init_index(table_2)
        console.log(table_2, (possible_ways + 1) + '  Possible Ways')
        break
      }
    }
    if(count_possible >= total_gunman) possible_ways += 1
  }
  return possible_ways
}

let obj_param = {}
obj_param.total_gunman = 10
obj_param.rows = 8
obj_param.total_wall = 10

console.log(gunman(obj_param))
