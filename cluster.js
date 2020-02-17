var cluster = require('cluster');
var os = require('os');
var uuid = require('uuid');
const port = 5000;
//키생성 - 서버 확인용
var instance_id = uuid.v4();
 
/**
 * 워커 생성
 */
var cpuCount = os.cpus().length; //CPU 수
var workerCount = cpuCount/2; //2개의 컨테이너에 돌릴 예정 CPU수 / 2
 
//마스터일 경우
if (cluster.isMaster) {
    console.log('서버 ID : '+instance_id);
    console.log('서버 CPU 수 : ' + cpuCount);
    console.log('생성할 워커 수 : ' + workerCount);
    console.log(workerCount + '개의 워커가 생성됩니다\n');
   
    //워커 메시지 리스너
    var workerMsgListener = function(msg){
       
            var worker_id = msg.worker_id;
           
            //마스터 아이디 요청
            if (msg.cmd === 'MASTER_ID') {
                cluster.workers[worker_id].send({cmd:'MASTER_ID',master_id: instance_id});
            }
    }
   
    //CPU 수 만큼 워커 생성
    for (var i = 0; i < workerCount; i++) {
        console.log("워커 생성 [" + (i + 1) + "/" + workerCount + "]");
        var worker = cluster.fork();
       
        //워커의 요청메시지 리스너
        worker.on('message', workerMsgListener);
    }
   
    //워커가 online상태가 되었을때
    cluster.on('online', function(worker) {
        console.log('워커 온라인 - 워커 ID : [' + worker.process.pid + ']');
    });
   
    //워커가 죽었을 경우 다시 살림
    cluster.on('exit', function(worker) {
        console.log('워커 사망 - 사망한 워커 ID : [' + worker.process.pid + ']');
        console.log('다른 워커를 생성합니다.');
       
        var worker = cluster.fork();
        //워커의 요청메시지 리스너
        worker.on('message', workerMsgListener);
    });
 
//워커일 경우
} else if(cluster.isWorker) {
    var express = require('express');
    var app = express();
    var worker_id = cluster.worker.id;
    var master_id;
   
    var server = app.listen(port, function () {
        console.log("Express 서버가 " + server.address().port + "번 포트에서 Listen중입니다.");
    });
   
    //마스터에게 master_id 요청
    process.send({worker_id: worker_id, cmd:'MASTER_ID'});
    process.on('message', function (msg){
        if (msg.cmd === 'MASTER_ID') {
            master_id = msg.master_id;
        }
    });
   
    app.get('/', function (req, res) {
        res.send('안녕하세요 저는<br>['+master_id+']서버의<br>워커 ['+ cluster.worker.id+'] 입니다.');
    });
}