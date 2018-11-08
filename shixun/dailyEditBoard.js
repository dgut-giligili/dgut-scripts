const axios = require('axios').default
const qs = require('qs')

const goal = ["我们小组的沙雕网站"];
const detail = ["登录界面", "注册界面", "购物车界面", "手机端界面", "网站首页", "订单界面", "个人信息界面", "商品分类界面", "商品详情界面", "后台管理主页界面", "后台用户管理", "后台商品管理", "后台订单管理"];
const encounter = ["很简单的问题", "有点复杂的代码", "不太容易解决的程序", "很好解决的运算", "难以解决的逻辑", "解决不了现象", "无法解决的问题",];
const result = ["不太理想，难过的想哭", "解决了很开心", "今天解决不了，请教了其他同学来解决", "可能需要花些时间来处理", "弄好了，真开心", "不容易啊", "希望老师明天能讲讲"];

async function bootstrap(ts) {
  const year = ts.getFullYear();
  const month = ts.getMonth() + 1;
  const date = ts.getDate();

  const dailyTime = `${year.toString()}/${month.toString().padStart(2, '0')}/${date.toString().padStart(2, '0')}`
  const dailyTime2 = `${year.toString()}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`
  const opinion = ''
  const practicePlace = '微软实验室'
  const projectManager = '***'
  const info = `今天的要做的项目是${goal[Math.floor(Math.random() * goal.length)]}，任务是${detail[Math.floor(Math.random() * detail.length)]}，我遇到了${encounter[Math.floor(Math.random() * encounter.length)]}，结果${result[Math.floor(Math.random() * result.length)]}。`
  const content = `计算机与网络安全学院专业综合实训学习日志实训地点： ${practicePlace}日期： ${dailyTime}正文： ${info}`
  const dailyContent = `<p>计算机与网络安全学院</p><p>专业综合实训学习日志</p><p>实训地点： ${practicePlace}</p><p>日期： ${dailyTime2}</p><p>正文： ${info}</p>`

  const res = await axios.get('https://shixun.dgut.edu.cn/student/dailyEditBoard', {
    params: {
      dailyTime,
    },
    headers: {
      Cookie: 'JSESSIONID=***',
      Host: 'shixun.dgut.edu.cn',
      Referer: `https://shixun.dgut.edu.cn/student/dailyManager`,
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:1.0) Gecko/20100101 Firefox/1.0',
    }
  })
  const mySelect = res.data.match(/<option value="(\d+)">JavaEE-软件工程-恒宇<\/option>/)[1]

  const res2 = await axios.post('https://shixun.dgut.edu.cn/student/saveDaily', qs.stringify({
    content,
    dailyContent,
    dailyTime: dailyTime2,
    mySelect,
    opinion,
    practicePlace,
    projectManager
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Cookie: 'JSESSIONID=***',
      Host: 'shixun.dgut.edu.cn',
      Referer: `https://shixun.dgut.edu.cn/student/dailyEditBoard&${qs.stringify(dailyTime)}`,
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:1.0) Gecko/20100101 Firefox/1.0',
      'X-Requested-With': 'XMLHttpRequest',
    }
  })

  return res2.data;
}

const ar = []
for (let i = 3; i <= 30; i++) {
  ar.push(new Date(2018, 8, i))
}
for (let i = 1; i <= new Date().getDate(); i++) {
  ar.push(new Date(2018, 9, i))
}

async function realBs() {
  for (const ts of ar) {
    await bootstrap(ts);
  }
}

realBs().then(console.log).catch(console.error);
