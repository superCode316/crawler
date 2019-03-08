import getDetail from './detail_crawler'
import getList from './list_crawler'

let query = '后端';

for(let i = 0;i < 10;i ++){
    getList(query).then(something=>{
        console.log(something)
    })
}