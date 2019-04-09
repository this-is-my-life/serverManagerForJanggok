const filewacher = require('chokidar')
function start () {
  const wacher = filewacher.watch(document.getElementById('folder').value)
  wacher.on('ready', () => {
    document.getElementById('result').value = document.getElementById('folder').value + "폴더를 스켄합니다...\n\n"
  }).on('change', (path, stats) => {
    document.getElementById('result').value += path.split(document.getElementById('folder').value).join('') + '('+ stats.size +' Byte)가 수정되었습니다'
  })
}
