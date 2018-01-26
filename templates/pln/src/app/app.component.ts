import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  textoCompleto;
  predicciones=[];
  constructor(private _appService: AppService){
  }
  ServiceAgregarTexto(Texto:String){
    return this._appService.AgregarTexto(Texto)
      .subscribe({
        next: (response) => {
          this.textoCompleto=response;
        },
        error: (err) => {
        },
        complete: () => {
        }
      });
  }
  Actualizar(){
    return this._appService.ActualizarTexto()
      .subscribe({
        next: (response) => {
          this.textoCompleto=response;
        },
        error: (err) => {
        },
        complete: () => {
        }
      });
  }

  ngOnInit(): void {
    this.Actualizar();
    var me = {};
    me["avatar"] = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

    var you = {};
    you["avatar"] = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

    //-- No use time. It is a javaScript effect.
    function insertChat(who, text, time = 0){
      var control = "";
      var date = formatAMPM(new Date());

      if (who == "me"){

        control = '<li style="width:100%">' +
          '<div class="msj macro">' +
          '<div class="avatar"><img class="img-circle" style="width:50px;" src="'+ me["avatar"] +'" /></div>' +
          '<div class="text text-l">' +
          '<p>'+ text +'</p>' +
          '<p><small>'+date+'</small></p>' +
          '</div>' +
          '</div>' +
          '</li>';
      }else{
        control = '<li style="width:100%;">' +
          '<div class="msj-rta macro">' +
          '<div class="text text-r">' +
          '<p>'+text+'</p>' +
          '<p><small>'+date+'</small></p>' +
          '</div>' +
          '<  div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:50px;" src="'+you["avatar"]+'" /></div>' +
          '</li>';
      }
      setTimeout(
        function(){
          $("ul").append(control);

        }, time);

    }



    $(".mytext").on("keyup", e=>{
      if (e.which == 13){
        var text = $(".mytext").val();
        alert(text);
        if (text !== ""){
          insertChat("me", text);
          this.ServiceAgregarTexto(text);
        }
        $(".mytext").val('');
      }
    });
    $('.mytext').on('input',e=>{
     this.verificar();
    });
    //-- Clear Chat
    //-- Print Messages


    //-- NOTE: No use time on insertChat.
  }
  verificar(){
    var text=$('.mytext').val();
    text=text.split(" ");
    text=text[text.length-1];
    if(this.textoCompleto[text]!=null){
      this.predicciones=[];
      for(let x in this.textoCompleto[text]){
        this.predicciones.push(x);
      }
    }else{
      this.predicciones=[];
    }
  }
  title = 'app';
  precion(texto){

    this.predicciones=[];
    var aux=$('.mytext').val();
    aux=aux+" "+texto;
    $('.mytext').val(aux);
    this.verificar();
    $('.mytext').focus();
  }

}
