const fs = require('fs')
const path = require('path')
const axios = require('axios').default

async function bootstrap() {
  for (let i = 1; i < 2000; i++) {
    if (fs.existsSync(`problem_${i}_test_cases`)) {
      if (!fs.existsSync(path.join(`problem_${i}_test_cases`, '2.out'))) {
        const data = {
          code: `print '''${fs.readFileSync(path.join(`problem_${i}_test_cases`, '1.out')).toString()}'''`,
          language: 'Python2',
          problem_id: i
        }

        const checkResponse = await axios.get(`https://oj.dgut.edu.cn/api/xproblem/${i}/`, { headers });

        console.log(i, checkResponse.data.data.my_status);

        if (checkResponse.data.data.my_status === 0) {
          continue;
        }

        const response = await axios.post('https://oj.dgut.edu.cn/api/submission', data, { headers });
        
        if (response.data.error !== null) {
          if (response.data.error === 'error') {
            i--;
            continue;
          }
          if (response.data.error === 'invalid-code') {
            continue;
          }
        }

        console.info(i, response.data);
      }
    }
  }
}
bootstrap();
