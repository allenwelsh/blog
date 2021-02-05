

echo "git add -A"
git add -A


read -p "请输入commit:"  Commit


echo "git commit"
git commit -m ${Commit}

echo "git status"
git status




echo "git push"
git push origin  main


echo "done."



