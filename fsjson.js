const fs = require('fs')

// 读取数据 进行提纯
fs.readFile('./data_json/goods.json', 'utf8', function(err, data){
    let newData = JSON.parse(data)
    let pushData = []
    let a = 0
    newData.RECORDS.map(function(value, index){
        if(value.IMAGE1){
            pushData.push(value)
            a++
        }
    })
    console.log(a)
    // 写入可用数据
    fs.writeFile('./data_json/newgoods.json', JSON.stringify(pushData),function(err, data){
        if(err) console.log("写入失败")
        else console.log("写入成功")
    })
    // console.log(pushData)
})