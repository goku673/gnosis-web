import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

interface Caracteristica {
  icono: string;
  titulo: string;
  descripcion: string;
}

interface Beneficio {
  icono: string;
  texto: string;
}

@Component({
  selector: 'app-carrera-profesional',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './carrera-profesional.component.html',
  styleUrl: './carrera-profesional.component.css'
})
export class CarreraProfesionalComponent {
  caracteristicas: Caracteristica[] = [
    {
      icono: 'calendar',
      titulo: 'Duración',
      descripcion: '6 semestres (3 años) de formación técnica superior'
    },
    {
      icono: 'clock',
      titulo: 'Horarios',
      descripcion: 'Mañana (08:00-12:00), Tarde (14:00-18:00), Noche (18:30-22:00)'
    },
    {
      icono: 'award',
      titulo: 'Título',
      descripcion: 'Técnico Superior en Autotrónica con reconocimiento oficial'
    }
  ];

  beneficios: Beneficio[] = [
    {
      icono: 'check-circle',
      texto: 'Título Técnico Superior reconocido por el Ministerio de Educación'
    },
    {
      icono: 'check-circle',
      texto: 'Docentes con experiencia en la industria automotriz'
    },
    {
      icono: 'check-circle',
      texto: 'Bolsa de trabajo para egresados'
    },
    {
      icono: 'check-circle',
      texto: 'Talleres equipados con tecnología automotriz moderna'
    },
    {
      icono: 'check-circle',
      texto: 'Convenios con concesionarios y talleres para prácticas'
    },
    {
      icono: 'check-circle',
      texto: 'Certificación en competencias laborales'
    }
  ];
}
