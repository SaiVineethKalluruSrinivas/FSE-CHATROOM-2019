import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Content} from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { ChatroomService } from './chatroom-service';


@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
  providers: [ ChatroomService ]
})


export class ChatroomPage {

  @ViewChild(Content) content: Content;

  messages = [];
  username = '';
  message = '';
  chat = '';
 
  constructor(private chatroomService: ChatroomService, private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController){ 
  
  this.username = this.navParams.get('username');

  this.chatroomService.getHistory().subscribe(chats =>
  	{

 		for (var chat in chats)
 		{

 		console.log(chats[chat]);
 		  this.messages.push(chats[chat]);	
 		}

  		

  		// this.messages.push(message);
  	});

 	
 
    this.chatroomService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
 
    this.chatroomService.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  } //end of constructor


  ionViewDidEnter() {
    this.content.scrollToBottom();
  }

  setTimeout(){
  this.content.scrollToBottom(300);
};

 
  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
 
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



}
