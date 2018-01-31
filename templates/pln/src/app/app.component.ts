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
          console.log(this.textoCompleto);
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
          console.log(this.textoCompleto);
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


    $(".mytext").on("keyup", e=>{
      if (e.which == 13){
        var text = $(".mytext").val();
        if (text !== ""){
          this.ServiceAgregarTexto(text);
               this.chat.push(
                 {
                   t:$(".mytext").val(),
                   time:this.formatAMPM(new Date())
                 }
               );
        }
        $(".mytext").val('');
      }
    });
    $('.mytext').on('input',e=>{
     this.verificar();
    });
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
