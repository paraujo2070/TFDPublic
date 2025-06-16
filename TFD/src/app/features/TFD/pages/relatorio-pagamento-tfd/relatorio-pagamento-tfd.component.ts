import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PagamentoTFD {
  nomePaciente: string;
  nomeTitularConta: string;
  banco: string;
  agencia: string;
  conta: string;
  digito: string;
  cpfTitular: string;
  valorPago: number;
}

@Component({
  selector: 'app-relatorio-pagamento-tfd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio-pagamento-tfd.component.html',
  styleUrl: './relatorio-pagamento-tfd.component.css'
})
export class RelatorioPagamentoTfdComponent implements OnInit {
  dadosRelatorio: PagamentoTFD[] = [];
  totalPago: number = 0;
  isLoading: boolean = false;

  selectedMonth: number;
  selectedYear: number;
  anos: number[] = [];
  meses: { value: number, label: string }[] = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const dataAtual = new Date();
    this.selectedMonth = dataAtual.getMonth() + 1;
    this.selectedYear = dataAtual.getFullYear();


    for (let i = 0; i < 5; i++) {
      this.anos.push(this.selectedYear - i);
    }
    this.anos.sort((a, b) => a - b);
  }

  ngOnInit(): void {
    this.carregarRelatorio();
  }

  carregarRelatorio(): void {
    this.isLoading = true;
    setTimeout(() => {
      const dadosFicticios: PagamentoTFD[] = [
        {
          nomePaciente: 'Ana Clara Silva',
          nomeTitularConta: 'João Carlos Silva',
          banco: 'Banco do Brasil',
          agencia: '0011',
          conta: '12345',
          digito: '6',
          cpfTitular: '111.222.333-44',
          valorPago: 250.75
        },
        {
          nomePaciente: 'Bruno Alves Costa',
          nomeTitularConta: 'Bruno Alves Costa',
          banco: 'Caixa Econômica Federal',
          agencia: '0022',
          conta: '54321',
          digito: '0',
          cpfTitular: '222.333.444-55',
          valorPago: 180.00
        },
        {
          nomePaciente: 'Carla Dias Souza',
          nomeTitularConta: 'Maria Eduarda Souza',
          banco: 'Itaú Unibanco',
          agencia: '0033',
          conta: '67890',
          digito: '1',
          cpfTitular: '333.444.555-66',
          valorPago: 320.50
        },
        {
          nomePaciente: 'Daniel Ferreira Lima',
          nomeTitularConta: 'Daniel Ferreira Lima',
          banco: 'Bradesco',
          agencia: '0044',
          conta: '09876',
          digito: '5',
          cpfTitular: '444.555.666-77',
          valorPago: 95.20
        }
      ];

      // Lógica de filtro para dados fictícios (ajuste conforme necessário)
      this.dadosRelatorio = dadosFicticios.filter((item, index) => {
        return (index % 12) + 1 === this.selectedMonth;
      });

      if (this.selectedMonth === (new Date().getMonth() + 1) && this.selectedYear === new Date().getFullYear() && this.dadosRelatorio.length === 0) {
        this.dadosRelatorio = dadosFicticios;
      }

      this.totalPago = this.dadosRelatorio.reduce((sum, item) => sum + item.valorPago, 0);
      this.isLoading = false;
    }, 2000);
  }

  async exportToPdf(): Promise<void> {
    console.log('exportToPdf chamado');

    if (isPlatformBrowser(this.platformId)) {
      console.log('Executando no navegador.');

      if (this.dadosRelatorio.length === 0) {
        console.log('Nenhum dado para exportar. Exibindo alerta.');
        alert('Não há dados para exportar.');
        return;
      }

      try {
        const { default: jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default

        const doc = new jsPDF({ orientation: 'landscape' });

        const colunas = [
          "Nome do Paciente", "Nome do Titular", "Banco", "Agência", "Conta", "Dígito", "CPF Titular", "Valor Pago"
        ];
        const linhas = this.dadosRelatorio.map(item => [
          item.nomePaciente,
          item.nomeTitularConta,
          item.banco,
          item.agencia,
          item.conta,
          item.digito,
          item.cpfTitular,
          item.valorPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        ]);

        doc.setFontSize(18);
        doc.text(`Relatório Detalhado TFD - ${this.meses.find(m => m.value === this.selectedMonth)?.label}/${this.selectedYear}`, 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);

        autoTable(doc, {
          head: [colunas],
          body: linhas,
          startY: 30,
          theme: 'striped',
          headStyles: { fillColor: [22, 160, 133] },
          footStyles: { fillColor: [211, 211, 211], textColor: [0, 0, 0], fontStyle: 'bold' },
          foot: [['', '', '', '', '', '', 'Total:', this.totalPago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })]],
          didDrawPage: (dataArg: any) => {
            doc.setFontSize(12);
            doc.text('Página ' + (doc as any).internal.getNumberOfPages(), dataArg.settings.margin.left, doc.internal.pageSize.height - 10);
          }
        });

        doc.save(`relatorio_tfd_detalhado_${this.selectedMonth}_${this.selectedYear}.pdf`);
      } catch (error) {
        console.error('Erro durante a exportação para PDF:', error);
      }
    } else {
      console.warn('A exportação para PDF só pode ser executada no navegador. (Chamada no servidor)');
    }
  }
}