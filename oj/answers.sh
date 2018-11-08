#!/bin/sh
for ((i=1; i<=2000; i++))
do
  curl -o 'problem_'$i'_test_cases.zip' 'https://oj.dgut.edu.cn/api/test_case/?problem_id='$i --compressed
done
