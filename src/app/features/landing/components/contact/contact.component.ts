import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
}

interface QuickLink {
  text: string;
  link: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactInfo: ContactInfo[] = [
    {
      icon: 'map-pin',
      title: 'Ubicación',
      details: ['Av. Principal #123', 'Santa Cruz, Bolivia']
    },
    {
      icon: 'phone',
      title: 'Teléfonos',
      details: ['+591 3 123-4567', '+591 7 987-6543']
    },
    {
      icon: 'mail',
      title: 'Email',
      details: ['info@gnosis.edu.bo', 'admisiones@gnosis.edu.bo']
    }
  ];

  quickLinks: QuickLink[] = [
    { text: 'Sobre la Carrera', link: '#' },
    { text: 'Cursos de Temporada', link: '#' },
    { text: 'Admisiones', link: '#' },
    { text: 'Reglamentos', link: '#' }
  ];

  socialNetworks = [
    { icon: 'facebook', link: '#' },
    { icon: 'instagram', link: '#' },
    { icon: 'youtube', link: '#' }
  ];
}
