# Rules
1. never run `git push -f` or `git push --force`
2. always run `git pull` before `git push`

------------------

check for new changes:

```
git fetch origin --prune
git pull --rebase
git push
```

if u get error cuz u pushed before pulling then do:
```
git stash
git pull --rebase
git stash apply
git push
```

to check for new/current branches do:
```
git fetch origin
git branch --remote
```
