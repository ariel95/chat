$(document).ready(() => {
    var socket = io('http://localhost:7000');
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessage(socket);
    initializeEvents();
})

function username(socket){
    socket.emit('username',{
        username: localStorage.username
    });
}

function updateUsers(socket){
    socket.on('updateUsers',(data) => {
        let html = '';
        let username = localStorage.username; 
        $('.inbox_chat').html('');
        data.users.forEach(element => {
            if(element.username!=username){
                html += '<div class="chat_list" data-user="'+element.username+'">\
                            <div class="chat_people">\
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">\
                                </div>\
                                <div class="chat_ib">\
                                    <h5>' + element.username+ '</h5>\
                                </div>\
                                <input type="hidden" class="u" value="'+element.id+'" />\
                            </div>\
                        </div>';
            }
        });
        $('.inbox_chat').html(html);
    })
}

function newMessage(socket){
    $(document).on("click",".msg_send_btn", function () {
        sendMessage();
    })
    $(document).on("keyup",".write_msg", function (event) {
        var data = $(".write_msg").val();
        if (data == null || data == "") {
            socket.emit('stoptyping', {
                from: localStorage.username
            });
            return;
        }
        socket.emit('typing', {
            from: localStorage.username
        });
        if (event.which == 13) {
            sendMessage()
        }
    })

    function sendMessage() {
        var data = $(".write_msg").val();
        socket.emit('message', {
            from: localStorage.username,
            to: $('.chat_list.active_chat').data('user'),
            msg: data
        });
        $(".write_msg").val("");
    }
}

function updateMessage(socket){
    socket.on("updateMessage", function (data) {
        if (localStorage.username.trim() == data.from.trim()) {
            $(".msg_history").append(
                `<div class="outgoing_msg">
                <div class="sent_msg">
                    <p>${data.msg}</p>
                    <span class="time_date"> ${moment().fromNow()}</span>
                </div>
            </div>`
            )
        } else if (localStorage.username.trim() == data.to.trim()) {
            $(".msg_history").append(
                `<div class="incoming_msg">
                <div class="incoming_msg_img"><img src="https://ptetutorials.com/images/user-profile.png" alt="${data.from}">
                    <span class="username">${data.to.trim()}</span>
                    </div>
                <div class="received_msg">
                    <div class="received_withd_msg">
                        <p>${data.msg}</p>
                        <span class="time_date"> ${moment().fromNow()}</span>
                    </div>
                </div>
            </div>`
            )
        }
        $(".pencil_anim").hide();
    })
        
}



function initializeEvents(){
    $(".pencil_anim").hide();
//    username = $(this).find(".chat_ib").text();

    $(document).on("click",".chat_list", function () {
        $(".chat_list").removeClass("active_chat")
        $(this).addClass("active_chat")
        $("#username").html("Talking to <strong>" + $(this).find(".chat_ib").text() + "</strong>");
        $(".mesgs").show();
    })
}



///****************************************************** *///
// $("document").ready(function () {
//     var username = null;
//     var myname = '<%= user %>';
//     var socket = io('http://localhost:7777', {
//         query: {
//             username: '<%= user %>'
//         }
//     });
//     socket.on('connect', function () {
//         //Add all controls here, instead of document load    
//     });
//     socket.on('typing', function (data) {
//         if (myname != data.from) {
//             $(".pencil_anim").show();
//         }
//     });
//     socket.on('stoptyping', function (data) {
//         if (myname != data.from) {
//             $(".pencil_anim").hide();
//         }
//     });
//     socket.on("message", function (data) {
//         if (myname.trim() == data.from.trim()) {
//             $(".msg_history").append(
//                 `<div class="outgoing_msg">
//                 <div class="sent_msg">
//                     <p>${data.msg}</p>
//                     <span class="time_date"> ${moment().fromNow()}</span>
//                 </div>
//             </div>`
//             )
//         } else if (myname.trim() == data.to.trim()) {
//             $(".msg_history").append(
//                 `<div class="incoming_msg">
//                 <div class="incoming_msg_img"><img src="https://ptetutorials.com/images/user-profile.png" alt="${data.from}">
//                     <span class="username">${username}</span>
//                     </div>
//                 <div class="received_msg">
//                     <div class="received_withd_msg">
//                         <p>${data.msg}</p>
//                         <span class="time_date"> ${moment().fromNow()}</span>
//                     </div>
//                 </div>
//             </div>`
//             )
//         }
//         $(".pencil_anim").hide();
//     })
//     socket.on('newuser', function (data) {
//         if (data.name != username) {
//             //alert("new user joined")

//         }
//     })
//     socket.on('disconnect', function () {});

//     $(".pencil_anim").hide();
//     username = $(this).find(".chat_ib").text();

//     $(".chat_list").on('click', function () {
//         $(".chat_list").removeClass("active_chat")
//         $(this).addClass("active_chat")
//         $("#username").html("Talking to <strong>" + $(this).find(".chat_ib").text() + "</strong>");
//         $(".mesgs").show();
//     })
//     $(".msg_send_btn").on("click", function () {
//         sendMessage();
//     })
//     $(".write_msg").keyup(function (event) {
//         var data = $(".write_msg").val();
//         if (data == null || data == "") {
//             socket.emit('stoptyping', {
//                 from: myname
//             });
//             return;
//         }
//         socket.emit('typing', {
//             from: myname
//         });
//         if (event.which == 13) {
//             sendMessage()
//         }
//     })

//     function sendMessage() {
//         var data = $(".write_msg").val();
//         socket.emit('message', {
//             from: myname,
//             to: username,
//             msg: data
//         });
//         $(".write_msg").val("");
//     }
// });