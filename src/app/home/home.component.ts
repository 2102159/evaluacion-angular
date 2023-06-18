import { Component, OnInit } from '@angular/core';
import { HttpService } from '../ServiceUno/http.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data: any;
  public editMode = false;
  public objetoAEditar: any;
  public objetoEditado: any;
  public actualizadoObjeto: any;


  constructor(private httpService: HttpService) {}
  productoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    thumbnail: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.httpService.getProducts().subscribe((data: any) => {
      this.data = data;
      console.log('data from server ', this.data);
    });
  }

  editarObjeto(objeto: any): void {
    this.objetoAEditar = objeto
    this.objetoEditado = { ...objeto };
    this.editMode = true;
  }

  guardarEdicion(): void {
    const body = {
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      title: this.objetoEditado.title
    }
    console.log('En edicion',body);

    this.httpService.editarObjeto(this.objetoEditado.id,body).subscribe((response: any) => {
      console.log('Objeto editado:', response);
      this.cancelarEdicion();
      this.loadData();
    }      );
  }
  actualizarObjeto(): void {
    const body = {
      "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      title: this.objetoEditado.title
    }
    console.log('En actulizacion',body);

    this.httpService.editarObjeto(this.objetoEditado.id,body).subscribe((response: any) => {
      console.log('Objeto editado:', response);
      this.cancelarEdicion();
      this.loadData();
    }      );
  }

  cancelarEdicion(): void {
    this.editMode = false;
    this.objetoAEditar = null;
  }

  eliminarObjeto(objeto: any): void {
    const confirmacion = confirm('¿si desea eliminar este producto?');
    if (confirmacion) {
      const index = this.data.indexOf(objeto); // Obtener el índice del objeto en la lista
      if (index !== -1) {
        this.data.splice(index, 1); // Eliminar el objeto de la lista
        this.httpService.eliminarObjeto(objeto.id).subscribe((response: any) => {
          console.log('Objeto eliminado:', response);
        });
      }
    }
  }
}
