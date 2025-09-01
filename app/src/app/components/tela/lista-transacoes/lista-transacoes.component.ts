import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-transacoes',
  templateUrl: './lista-transacoes.component.html',
  styleUrls: ['./lista-transacoes.component.css'],
})
export class ListaTransacoesComponent implements OnInit {
  transacoes = [
    {
      contaOrigemId: '6882a34c75d2865d49a26a14',
      contaDestinoId: '6882a51b75d2865d49a26a17',
      tipoTransacao: 'Transferencia',
      valor: 250,
      dataTransacao: '25/08/2025 13:00',
      status: 'Concluida',
    },
    {
      contaOrigemId: '6882a34c75d2865d49a26a14',
      contaDestinoId: '6882a51b75d2865d49a26a17',
      tipoTransacao: 'Saque',
      valor: 200,
      dataTransacao: '26/08/2025 08:00',
      status: 'Concluida',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
