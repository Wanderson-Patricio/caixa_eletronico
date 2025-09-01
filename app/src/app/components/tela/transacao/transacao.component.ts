import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.css'],
})
export class TransacaoComponent implements OnInit {
  @Input() transacao = {
    contaOrigemId: '6882a34c75d2865d49a26a14',
    contaDestinoId: '6882a51b75d2865d49a26a17',
    tipoTransacao: 'Transferencia',
    valor: 250,
    dataTransacao: '25/08/2025 13:00',
    status: 'Concluida',
  };

  constructor() {}

  ngOnInit(): void {}

  corValor() {
    const transacao = this.transacao;
    if(transacao.tipoTransacao === 'Transferência'){
      if(transacao.contaDestinoId){
        return 'color-red'
      }else{
        return 'color-green'
      }
    }
    if(transacao.tipoTransacao === 'Saque'){
      return 'color-red'
    }
    return 'color-green'
  }  

  corStatus() {
    return (this.transacao.status === 'Concluida') ? 'color-green' : 'color-red'
  }
}
