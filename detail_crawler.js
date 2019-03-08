import axios from 'axios'
import cheerio from 'cheerio'

//获取单个职位页面的信息
async function getDetail(url){
    let result = {};
    await axios.get(url).then(
        res=>{
            const $ = cheerio.load(res.data);
            result.jobInfo = getJobInfo($);
            result.conpanyInfo = getCompanyInfo($);
            result.salary = getSalary($);
            result.url = url;
            console.log(result);
            return result;
        }
    );

}


//获取详细的信息
async function getJobInfo ($) {
    let str = /[0-9]+/;
    let temp = $('.job-sec .text','#main')[0].children;
    let jobInfo = {Introduction:{}};
    for(let i = 0;i < temp.length;i ++){
        if(temp[i].type==='text'){
            let info = temp[i].data.replace(/\s+/g,"");
            jobInfo.Introduction[i/2] = info;
        }
    }
    jobInfo.Tag = getJobTag($);
    return jobInfo;
}


async function getCompanyInfo ($) {
    const position = getPosition($);
    const chinese = /[\u4e00-\u9fa5]+/;
    let tempInfo = {};
    let businessInfo = {};
    // businessInfo.companyName = $('.job-sec .name','#main')[0].children[0].data;
    tempInfo = $('.job-sec .level-list li','#main');
    tempInfo.each((i,e)=>{
        let single = e.children;
        let key = chinese.exec(single[0].children[0].data)[0];
        businessInfo[key] = single[1].data;
    });
    businessInfo.position = position;
    return businessInfo;
}


const getPosition = $ => {
    let position;
    position = $('.job-location .location-address', '#main')[0].children[0].data;
    return position;
};


async function getSalary  ($) {
    let salary = $('.info-primary .salary','#main')[0].children[0].data;
    let str = /[0-9]+-[0-9]+/;
    let single_min = /[0-9]+/;
    let single_max = /[^0-9][^-][0-9]+/;
    let number = str.exec(salary)[0];
    let min = Number(single_min.exec(number)[0]);
    let max = -Number(single_max.exec(number)[0]);
    return ({
        min:min,
        max:max
    })
}

const getJobTag = $ => {
    let something = {};
    let tag = $('.tag-container .tag-all span','#main');
    let length = tag.length/2;
    for (let i = 0;i < length;i++){
        // console.log(tag[i].children[0].data)
        something[i] = tag[i].children[0].data;
    }
    return something;
};

export default getDetail;