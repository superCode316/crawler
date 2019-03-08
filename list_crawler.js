import cheerio from 'cheerio'
import axios from 'axios'
import getDetail from './detail_crawler'
import isEmpty from 'lodash/isEmpty'
let randomNumber;
let url = 'https://www.zhipin.com/job_detail/';
let page = 1;
let data = [];
let result = {};
let lastPage = false;

//重置随机数
function resetRandomNumber(){
    randomNumber = Math.random()*100+2000;
}


//获取工作列表，以{工作名称：URL}的形式返回
async function getList (query) {
    console.log('=======================');
    console.log(page + 'posts has sent');
    page++;
    //发送get请求
    axios.get(url, {
        params: {
            query: query,
            page: page,
            ka: 'sel-city-101210100'
        }
    }).then(res => {

        let $ = cheerio.load(res.data);
        //获取查询到的页面数量，功能尚未实现
        // let pages = $('.job-box .job-list .page', '#main')[0].children;
        // let currentPage = pages[1];
        // if (isEmpty(currentPage.next.next))
        //     lastPage = true;
        //获取职位列表，以及URL
        let infoPrimary = $('.job-box .job-list .job-primary .info-primary .name a', '#main'); //包含info-primary 的数组
        infoPrimary.each((i, e) => {
            let key = e.children[1].children[0].data;
            result[key] = 'https://www.zhipin.com' + $(e).attr("href");
            data.push('https://www.zhipin.com' + $(e).attr("href"))
        });
        console.log('data handled');
        //完成列表爬取之后传入getDetail进行单个页面的读取
        for (let x in result){
            getDetail(result[x]).then();
        }
        return result;
    }).catch(err => {
        console.log(err)
    })
}

export default getList;