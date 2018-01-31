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

  chat=[];
  constructor(private _appService: AppService){
  }
  ServiceAgregarTexto(Texto:String){
    return this._appService.AgregarTexto(Texto)
      .subscribe({
        next: (response) => {

          this.textoCompleto=response;
          this.verificar();
          console.error(response)
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
          this.verificar()
        },
        error: (err) => {
        },
        complete: () => {
        }
      });
  }

  ngOnInit(): void {
    this.Actualizar();


    $(".mytext").on("keyup", e=>{
      if (e.which == 13){
        var text = $(".mytext").val();
        if (text !== ""){
          this.ServiceAgregarTexto(text);
               this.chat.push(
                 {
                   t:                 $(".mytext").val(),
                   time:this.formatAMPM(new Date())
                 }

               );
        }
        $(".mytext").val('');
      }
    });
    $('.mytext').on('input',e=>{
              if (text !== ""){

              var text = $(".mytext").val();
    text=text.split(" ");
    text=text[text.length-1];
                this.ServiceAgregarTexto(text);
              }
     this.verificar();

    });
    //-- Clear Chat
    //-- Print Messages


    //-- NOTE: No use time on insertChat.
  }
  formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // Mientras queden elementos a mezclar...
  while (0 !== currentIndex) {

    // Seleccionar un elemento sin mezclar...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E intercambiarlo con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
  verificar(){
    var text=$('.mytext').val();

    text=text.split(" ");
    text=text[text.length-1];

    if(this.textoCompleto[text]!=null){
      this.predicciones=[];
      var k=0;
      for(let x of this.textoCompleto[text]){
        this.predicciones.push(x);
        console.log(x)
          k++;
      }
      this.shuffle(this.predicciones)
      this.predicciones.splice(8,100)
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
    this.verificar();
  }
}
