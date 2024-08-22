import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileRemoveEvent, FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';

// Services
import { VehicleService } from '@services/vehicle.service';
import { MessageService } from 'primeng/api';

// Interfaces
import { Preload } from '@shared/interfaces/preload.interface';
import { Vehicle, VehicleGallery } from '@shared/interfaces/vehicles.interface';

// Pipes
import { BytesToKbPipe } from '@shared/pipes/bytes-to-kb.pipe';

@Component({
  selector: 'app-vehicles-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BytesToKbPipe, InputTextModule, DropdownModule, InputNumberModule, FileUploadModule, EditorModule, ToastModule],
  providers: [MessageService],
  templateUrl: './vehicles-form.component.html',
})
export class VehiclesFormComponent implements OnInit {
  private id!: string;

  public form = this.fb.group({
    model: ['', Validators.required],
    year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    fuelTypeId: ["", Validators.required],
    fuelTypeName: [""],
    gearTypeId: ["", Validators.required],
    gearTypeName: [""],
    manufacturerId: ["", Validators.required],
    manufacturerName: [""],
    colorId: ["", Validators.required],
    colorName: [""],
    gallery: this.fb.array([]),
    description: '',
  });

  public fuelTypes: Preload[] = [];

  public manufacturers: Preload[] = [];

  public colors: Preload[] = [];

  public gearTypes: Preload[] = [];

  public maxFileSize = "4000000"; // 4MB

  public innitialGalleryFiles: VehicleGallery[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private vehicleService: VehicleService, private messageService: MessageService) { }

  get gallery(): VehicleGallery[] {
    return this.form.get('gallery')?.value as VehicleGallery[];
  }

  public ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) this.findVehicle(this.id);
    });

    this.preload();
  }

  private async preload() {
    try {
      const preload = await this.vehicleService.preload();

      this.fuelTypes = preload["fuel-types"];
      this.manufacturers = preload["manufacturers"];
      this.colors = preload["colors"];
      this.gearTypes = preload["gear-types"];
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch preload' })
    }
  }

  private async findVehicle(id: string) {
    try {
      const vehicle = await this.vehicleService.findById(id)

      this.form.patchValue(vehicle);

      const gallery = this.form.get('gallery') as FormArray;

      vehicle.gallery?.forEach((file) => {
        gallery.push(this.fb.group(file));
      })

      this.innitialGalleryFiles = vehicle.gallery;
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch vehicle' })
    }
  }

  public handleDropdownChange(event: DropdownChangeEvent, controlName: string, options: Preload[]) {
    const find = options.find((el: Preload) => el.id === event.value);

    if (!find) return;

    this.form.get(controlName)?.setValue(find.name);
  }

  public onSelect(event: FileSelectEvent) {
    const gallery = this.form.get('gallery') as FormArray;

    for (const file of event.currentFiles) {
      const reader = new FileReader();

      reader.onload = () => {
        if (this.gallery.find(item => item.name === file.name)) return

        gallery.push(this.fb.group({
          name: file.name,
          size: file.size,
          base64: reader.result
        }));
      };

      reader.readAsDataURL(file);
    }
  }

  public onRemove(event: FileRemoveEvent) {
    const gallery = this.form.get('gallery') as FormArray;
    const find = this.gallery.find((el: VehicleGallery) => el.name === event.file.name);

    if (!find) return;

    const indexOf = this.gallery.indexOf(find)

    gallery.removeAt(indexOf);

    const findInnitial = this.innitialGalleryFiles.find((el: VehicleGallery) => el.name === event.file.name);

    if (!findInnitial) return;

    const innitialGalleryFilesIndexOf = this.innitialGalleryFiles.indexOf(findInnitial)

    this.innitialGalleryFiles.splice(innitialGalleryFilesIndexOf, 1);
  }

  public async create() {
    const form = this.form.getRawValue();

    try {
      const vehicle = await this.vehicleService.create(form as Vehicle)

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle created' });

      setTimeout(() => this.router.navigate(['/panel/vehicles', vehicle.id]), 2000);
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create the vehicle' })
    }
  }

  public async update() {
    const form = this.form.getRawValue();

    try {
      await this.vehicleService.update(this.id, form as Vehicle)

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vehicle updated' });
    } catch {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update the vehicle' })
    }
  }

  public onSave() {
    if (this.form.invalid) return;

    if (this.id) this.update();
    else this.create()
  }

  public clear() {
    this.form.reset();

    this.innitialGalleryFiles = []
  }
}
