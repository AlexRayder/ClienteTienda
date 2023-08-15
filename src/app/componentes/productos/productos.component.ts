import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  public listaProductos: any;
  public listaCategorias: any;
  display = 'none';
  idProducto: any;
  url: any;

  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router) {
    this.url = "https://alexxoo.pythonanywhere.com/media/fotos" 
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe((result) => {
      this.listaProductos = result;
    });
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe(data => {
      console.log(data);
      this.listaCategorias = data;
    }, error => {
      console.log(error);
    })
  }
  cerrarModal() {
    this.display = 'none';
  }
  abrirModalEliminar(codigo:number) {
   this.display='block';
   this.idProducto=codigo;
  }
  eliminarProducto(){
    this.productoService.eliminarProducto(this.idProducto).subscribe((result) => {
      //this.obtenerProductos();
      this.router.navigate(['/','productos']);
    }, error => {
      console.log(error);
    });
    this.display='none';
  }

  ngOnInit(): void {
      this.listarCategorias();
      this.obtenerProductos();
  }
}