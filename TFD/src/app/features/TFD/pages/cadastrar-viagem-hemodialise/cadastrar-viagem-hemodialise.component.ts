import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-viagem-hemodialise',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-viagem-hemodialise.component.html',
  styleUrl: './cadastrar-viagem-hemodialise.component.css'
})
export class CadastrarViagemHemodialiseComponent {
  viagemForm!: FormGroup;
  diasSemana = [
    { id: 'segunda', label: 'Segunda-feira' },
    { id: 'terca', label: 'Terça-feira' },
    { id: 'quarta', label: 'Quarta-feira' },
    { id: 'quinta', label: 'Quinta-feira' },
    { id: 'sexta', label: 'Sexta-feira' },
    { id: 'sabado', label: 'Sábado' },
    { id: 'domingo', label: 'Domingo' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.viagemForm = this.fb.group({
      paciente: this.fb.group({
        nomeCompleto: ['', Validators.required],
        dataNascimento: ['', Validators.required],
        nomeMae: ['', Validators.required],
        cpf: ['', [Validators.required , Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
        cartaoSus: ['', Validators.required],
        telefone: ['', Validators.required],
        endereco: this.fb.group({
          rua: ['', Validators.required],
          numero: ['', Validators.required],
          bairro: ['', Validators.required],
          cidade: ['', Validators.required],
          estado: ['', Validators.required],
          cep: ['', Validators.required]
        })
      }),
      acompanhante: this.fb.group({
        nomeCompleto: [''],
        cpf: ['' , Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)],
        cartaoSus: ['']
      }),
      hemodialise: this.fb.group({
        nomeLocal: ['', Validators.required],
        enderecoLocal: ['', Validators.required],
        telefoneLocal: [''],
        dias: this.buildDiasSemanaControls()
      })
    });
  }

  buildDiasSemanaControls() {
    const group: any = {};
    this.diasSemana.forEach(dia => {
      group[dia.id] = this.fb.control(false);
    });
    return this.fb.group(group);
  }
  get pacienteCtrl() { return this.viagemForm.get('paciente') as FormGroup; }
  get acompanhanteCtrl() { return this.viagemForm.get('acompanhante') as FormGroup; }
  get hemodialiseCtrl() { return this.viagemForm.get('hemodialise') as FormGroup; }
  get diasHemodialiseCtrl() { return this.hemodialiseCtrl.get('dias') as FormGroup; }

  onSubmit(): void {
    if (this.viagemForm.valid) {
      const formValue = { ...this.viagemForm.value };
      // Transforma os dias de {segunda: true, terca: false} para um array como ['segunda']
      const diasSelecionados = Object.entries(formValue.hemodialise.dias)
        .filter(([, value]) => value === true)
        .map(([key]) => key);
      formValue.hemodialise.dias = diasSelecionados;

      console.log('Formulário Enviado:', formValue);
    } else {
      console.log('Formulário inválido. Verifique os campos.');
      this.viagemForm.markAllAsTouched();
    }
  }

}
