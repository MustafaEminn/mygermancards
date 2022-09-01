let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd D:/Software/React/mygermancards
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +8 D:/Software/React/mygermancards/src/storage/packages.ts
badd +0 term://D:/Software/React/mygermancards//14660:C:/Windows/system32/cmd.exe
badd +26 D:/Software/React/mygermancards/src/storage/index.ts
badd +4 D:/Software/React/mygermancards/src/main.tsx
argglobal
%argdel
$argadd NvimTree_1
edit D:/Software/React/mygermancards/src/storage/index.ts
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 30 + 104) / 209)
exe '2resize ' . ((&lines * 40 + 26) / 52)
exe 'vert 2resize ' . ((&columns * 178 + 104) / 209)
exe '3resize ' . ((&lines * 8 + 26) / 52)
exe 'vert 3resize ' . ((&columns * 178 + 104) / 209)
argglobal
enew
file NvimTree_1
balt D:/Software/React/mygermancards/src/storage/packages.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal nofen
wincmd w
argglobal
balt D:/Software/React/mygermancards/src/storage/packages.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 26 - ((25 * winheight(0) + 20) / 40)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 26
normal! 031|
wincmd w
argglobal
if bufexists(fnamemodify("term://D:/Software/React/mygermancards//14660:C:/Windows/system32/cmd.exe", ":p")) | buffer term://D:/Software/React/mygermancards//14660:C:/Windows/system32/cmd.exe | else | edit term://D:/Software/React/mygermancards//14660:C:/Windows/system32/cmd.exe | endif
if &buftype ==# 'terminal'
  silent file term://D:/Software/React/mygermancards//14660:C:/Windows/system32/cmd.exe
endif
balt D:/Software/React/mygermancards/src/storage/packages.ts
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 36 - ((7 * winheight(0) + 4) / 8)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 36
normal! 0
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 30 + 104) / 209)
exe '2resize ' . ((&lines * 40 + 26) / 52)
exe 'vert 2resize ' . ((&columns * 178 + 104) / 209)
exe '3resize ' . ((&lines * 8 + 26) / 52)
exe 'vert 3resize ' . ((&columns * 178 + 104) / 209)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
