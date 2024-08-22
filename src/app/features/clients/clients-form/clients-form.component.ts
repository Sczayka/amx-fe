import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputMaskModule } from 'primeng/inputmask';

// Services
import { ClientService } from '@services/client.service';

// Interfaces
import { Client } from '@shared/interfaces/clients.interface';

// Pipes
import { BytesToKbPipe } from '@shared/pipes/bytes-to-kb.pipe';
import { ViaCepService } from '@services/viacep.service';

// Utils
import { removeNomNumbersCharacters } from '@shared/utils/remove-nom-numbers-characters';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BytesToKbPipe, InputTextModule, InputGroupModule, DropdownModule, InputNumberModule, FileUploadModule, EditorModule, ToastModule, InputMaskModule],
  providers: [MessageService],
  templateUrl: './clients-form.component.html',
})
export class ClientsFormComponent implements OnInit {
  private id!: string;

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: '',
    cellphone: ['', Validators.required],
    address: this.fb.group({
      street: [{ value: '', disabled: true }, (Validators.required)],
      number: ['', Validators.required],
      neighborhood: [{ value: '', disabled: true }, Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      state: [{ value: '', disabled: true }, Validators.required],
      country: ['Brasil', Validators.required],
      zipcode: ['', Validators.required],
      complement: [''],
    })
  });

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private clientService: ClientService, private viaCepService: ViaCepService, private messageService: MessageService) { }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) this.findClient(this.id);
    });
  }

  private async findClient(id: string) {
    try {
      const client = await this.clientService.findById(id)

      this.form.patchValue(client);
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch client' })
    }
  }

  public async findClientAddress() {
    const cep = this.form.get('address.zipcode')!.value;

    if (!cep) return;

    const fields = ['street', 'neighborhood', 'city', 'state'];

    this.form.get('address')?.reset();

    try {
      const address = await this.viaCepService.findAddress(cep);

      const complement = this.form.get('address.complement')!.value;

      this.form.get('address')?.patchValue({
        street: address.logradouro,
        number: '',
        neighborhood: address.bairro,
        city: address.localidade,
        state: address.uf,
        country: 'Brasil',
        zipcode: cep,
        complement: complement
      })

      fields.forEach((field: string) => this.form.get(`address.${field}`)?.disable())
    } catch {
      fields.forEach((field: string) => this.form.get(`address.${field}`)?.enable())

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to find the address, fill the fields manually', life: 5000 })
    }
  }

  public async create(payload: Client) {
    try {
      const client = await this.clientService.create(payload)

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client created' });

      setTimeout(() => this.router.navigate(['/panel/clients', client.id]), 2000);
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update the client' })
    }
  }

  public async update(payload: Client) {
    try {
      await this.clientService.update(this.id, payload)

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client updated' });
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update the client' })
    }
  }

  public onSave() {
    if (this.form.invalid) return;

    const form = this.form.getRawValue()

    form.phone = removeNomNumbersCharacters(form.phone!)

    form.cellphone = removeNomNumbersCharacters(form.cellphone!)

    form.address.zipcode = removeNomNumbersCharacters(form.address.zipcode!)

    if (this.id) this.update(form as Client);
    else this.create(form as Client)
  }

  public clear() {
    this.form.reset();
  }
}
