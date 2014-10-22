/**
 * Created by davidzhang on 14-10-22.
 */
$(function(){
    var content = $('#content');
    var status = $('#status');
    var input = $('#input');
    var myName = false;

    //建立socket链接
    socket = io.connect('http://localhost:3000');

    //收到server的连接确认
    socket.on('open',function(){
        status.text('Choose a name:');
    });


    //监听system事件，判断welcome或disconnect，打印系统消息
    socket.on('system',function(json){
        var p = '';
        if(json.type == 'welcome'){

            if(myName == json.text) {
                status.text(myName + ':').css('color', json.color);
            }
            p = '<p style="background:"'+json.color+'">system @ '+json.time+' : Welcome ' + json.text + '</p>';

        }else if(json.type == 'disconnect'){
            p = '<p style="background:"'+json.color+'">system @ '+json.time+' : Bye ' + json.text + '</p>';

        }

        content.prepend(p);

    });


    //监听message事件，打印消息
    socket.on('message',function(json){
        var p = '<p<span style="color:"'+json.color+';">'+ json.author + '</span> @ ' + json.time +' :' + json.text + '</p>';
        content.prepend(p);
    });

    input.keydown(function(e){
        if(e.keyCode == 13){
            var msg = $(this).val();
            if(!msg) return false;
            socket.send(msg);
            $(this).val('');
            if(myName == false){
                myName = msg;
            }
        }
    });
});