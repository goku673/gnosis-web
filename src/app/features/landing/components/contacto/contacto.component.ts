import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

interface ContactoInfo {
  icono: string;
  titulo: string;
  detalles: string[];
}

interface EnlaceRapido {
  texto: string;
  enlace: string;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contactoInfo: ContactoInfo[] = [
    {
      icono: 'map-pin',
      titulo: 'Ubicación',
      detalles: ['Av. Principal #123', 'Santa Cruz, Bolivia']
    },
    {
      icono: 'phone',
      titulo: 'Teléfonos',
      detalles: ['+591 3 123-4567', '+591 7 987-6543']
    },
    {
      icono: 'mail',
      titulo: 'Email',
      detalles: ['info@gnosis.edu.bo', 'admisiones@gnosis.edu.bo']
    }
  ];

  enlacesRapidos: EnlaceRapido[] = [
    { texto: 'Sobre la Carrera', enlace: '#' },
    { texto: 'Cursos de Temporada', enlace: '#' },
    { texto: 'Admisiones', enlace: '#' },
    { texto: 'Reglamentos', enlace: '#' }
  ];

  redesSociales = [
    { icono: 'facebook', enlace: '#' },
    { icono: 'instagram', enlace: '#' },
    { icono: 'youtube', enlace: '#' }
  ];
}
