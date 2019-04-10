const filewacher = require('chokidar')
const fs = require('fs')
const electron = require('electron')
let wacher

function start () {
  let pickedDir = document.getElementById('folder')
  let pickedDirValue = document.getElementById('folder').value
  let resultTextarea = document.getElementById('result')
  if (!fs.existsSync(pickedDirValue)) {
    pickedDir.style.backgroundColor = 'lightpink'
  } else {
    pickedDir.style.backgroundColor = 'white'
    pickedDir.disabled = true
    pickedDir.value = '파일 목록을 처리중입니다.. 잠시만 기다려주세요'
    wacher = filewacher.watch(pickedDirValue)
    wacher.on('ready', () => {
      document.getElementById('start').disabled = true
      document.getElementById('stop').disabled = false
      resultTextarea.style.display = 'unset'
      pickedDir.value = '폴더의 감시가 진행되고 있습니다'
      resultTextarea.value = "'" + pickedDirValue + "' 폴더의 감시가 시작되었습니다...\n\n"
      wacher.on('add', (path, stats) => {
        if (pickedDirValue.endsWith('\\')) {
          path = path.split(pickedDirValue).join('\\')
        } else if (pickedDirValue.endsWith('/')) {
          path = path.split(pickedDirValue).join('/')
        } else {
          path = path.split(pickedDirValue).join('')
        }
        resultTextarea.value += "파일 '" + path + "'(이)가 추가되었습니다\n"
      })
    })
    wacher.on('addDir', (path, stats) => {
      if (pickedDirValue.endsWith('\\')) {
        path = path.split(pickedDirValue).join('\\')
      } else if (pickedDirValue.endsWith('/')) {
        path = path.split(pickedDirValue).join('/')
      } else {
        path = path.split(pickedDirValue).join('')
      }
      resultTextarea.value += "폴더 '" + path + "'(이)가 추가되었습니다\n"
    })
    wacher.on('change', (path, stats) => {
      if (pickedDirValue.endsWith('\\')) {
        path = path.split(pickedDirValue).join('\\')
      } else if (pickedDirValue.endsWith('/')) {
        path = path.split(pickedDirValue).join('/')
      } else {
        path = path.split(pickedDirValue).join('')
      }
      resultTextarea.value += "파일 '" + path + "'(이)가 수정되었습니다\n"
    })
    wacher.on('unlink', (path, stats) => {
      if (pickedDirValue.endsWith('\\')) {
        path = path.split(pickedDirValue).join('\\')
      } else if (pickedDirValue.endsWith('/')) {
        path = path.split(pickedDirValue).join('/')
      } else {
        path = path.split(pickedDirValue).join('')
      }
      resultTextarea.value += "파일 '" + path + "'(이)가 삭제되었습니다\n"
    })
    wacher.on('unlinkDir', (path, stats) => {
      if (pickedDirValue.endsWith('\\')) {
        path = path.split(pickedDirValue).join('\\')
      } else if (pickedDirValue.endsWith('/')) {
        path = path.split(pickedDirValue).join('/')
      } else {
        path = path.split(pickedDirValue).join('')
      }
      resultTextarea.value += "폴더 '" + path + "'(이)가 삭제되었습니다\n"
    })
  }
}

function stop () {
  document.getElementById('result').style.display = 'none'
  wacher.close()
  document.getElementById('start').disabled = false
  document.getElementById('stop').disabled = true
  document.getElementById('folder').disabled = false
  document.getElementById('folder').value = ''
}

function select () {
  electron.remote.dialog.showOpenDialog({
    properties: ['openDirectory']
  }, (path) => {
    document.getElementById('folder').value = path ? path : ''
  })
}
