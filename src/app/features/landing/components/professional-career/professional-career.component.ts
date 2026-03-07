import { Component } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { TextComponent } from '../../../../shared/components/text/text.component';
import { IconName } from '../../../../shared/components/icon/icon.types';

interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

interface Benefit {
  icon: IconName;
  text: string;
}

@Component({
  selector: 'app-professional-career',
  standalone: true,
  imports: [IconComponent, TextComponent],
  templateUrl: './professional-career.component.html',
  styleUrl: './professional-career.component.css',
})
export class ProfessionalCareerComponent {
  features: Feature[] = [
    {
      icon: 'calendar',
      title: 'Duración',
      description: '6 semestres (3 años) de formación técnica superior',
    },
    {
      icon: 'clock',
      title: 'Horarios',
      description: 'Mañana (08:00-12:00), Tarde (14:00-18:00), Noche (18:30-22:00)',
    },
    {
      icon: 'award',
      title: 'Título',
      description: 'Técnico Superior en Autotrónica con reconocimiento oficial',
    },
  ];

  benefits: Benefit[] = [
    {
      icon: 'check-circle',
      text: 'Título Técnico Superior reconocido por el Ministerio de Educación',
    },
    { icon: 'check-circle', text: 'Docentes con experiencia en la industria automotriz' },
    { icon: 'check-circle', text: 'Bolsa de trabajo para egresados' },
    { icon: 'check-circle', text: 'Talleres equipados con tecnología automotriz moderna' },
    { icon: 'check-circle', text: 'Convenios con concesionarios y talleres para prácticas' },
    { icon: 'check-circle', text: 'Certificación en competencias laborales' },
  ];
}
