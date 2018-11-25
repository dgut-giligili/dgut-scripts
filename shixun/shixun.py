#!/bin/env/python3
# -*- coding: utf-8 -*-

import re
import copy
from random import choice
from datetime import datetime
import requests
import pandas as pd

requests.packages.urllib3.disable_warnings()
session = requests.Session()

login_url = "https://cas.dgut.edu.cn/home/Oauth/getToken/appid/shixun.html"
daily_url = "https://shixun.dgut.edu.cn/student/saveDaily"
daily_headers = {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
login_data = {
    "username": "",
    "password": "",
    "wechat_verify": ""
    # "__token__": "",
}
class_list = [
    "Cisco路由器/交换机各部件的功能",
    "子网划分",
    "VLAN的功能",
    "防火墙的主要功能",
    "无线网络的安全问题及其解决方案",
    "了解iptables、firewall、netfilter",
    "配置firewall日志记录",
    "配置SSH服务",
    "邮件服务配置",
    "了解系统引导过程",
]
encounter = [
    "很简单的问题",
    "有点复杂的代码",
    "不太容易解决的程序",
    "很好解决的运算",
    "难以解决的逻辑",
    "解决不了的问题",
    "无法解决的问题"
]
result = [
    "不太理想，难过的想哭",
    "解决了很开心",
    "今天解决不了，请教了其他同学来解决",
    "可能需要花些时间来处理",
    "弄好了，真开心",
    "不容易啊",
    "希望老师明天能讲讲"
]
project_manager = "老师"
practice_place = "华为实验室"



def date_list(begin_date, end_date):
    day_list = []
    # beginDate, endDate是形如‘20160601’的字符串或datetime格式
    dl = [datetime.strftime(x, '%Y-%m-%d') for x in list(pd.date_range(start=begin_date, end=end_date))]
    # 去除周末
    for day in dl:
        tmp = datetime.strptime(day, '%Y-%m-%d')
        if tmp.isoweekday() in [1, 2, 3, 4, 5]:
            day_list.append(day)
    return day_list


def login():
    token_page = session.get(url=login_url, verify=False)
    token = re.findall("var token = \"(.*?)\"", token_page.text, re.S)[0]
    login_data["__token__"] = token
    test_login = session.post(url=login_url, data=login_data, verify=False).json()
    session.get(test_login["info"], headers=daily_headers, verify=False)
    return session


def addlog(session, day_list):
    begin_date = str(day_list[0].replace("-", "/"))
    myselect_url = "https://shixun.dgut.edu.cn/student/dailyEditBoard?dailyTime=" + begin_date
    myselect_page = session.get(url=myselect_url, verify=False)
    my_select = re.findall("<option value=\"(.*?)\">", myselect_page.text, re.S)[0].encode("utf-8")
    data = {
        "mySelect": my_select,
        "projectManager": project_manager,
        "practicePlace": practice_place,
        "opinion": ""
        # "dailyTime": "2018-09-03",
        # "dailyContent": content,
        # "content": content,
    }
    for daytime in day_list:
        data["dailyTime"] = str(daytime)
        content = "计算机与网络安全学院专业综合实训地点：%s，日期：%s，正文：今天的任务是：%s，我遇到了：%s，结果：%s" % \
                  (practice_place, str(daytime), choice(class_list), choice(encounter), choice(result))
        data["dailyContent"] = data["content"] = content
        confirm = session.post(url=daily_url, headers=daily_headers, data=data, verify=False)
        print(str(daytime) + ": " + confirm.text)


if __name__ == '__main__':
    dl = date_list("2018-09-03", "2018-10-14")
    s = login()
    addlog(s, dl)
