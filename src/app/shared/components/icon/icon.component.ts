import { Component, Input } from '@angular/core';
import { IconName, IconSize } from './icon.types';

@Component({
	selector: 'app-icon',
	standalone: true,
	templateUrl: './icon.component.html',
})

export class IconComponent {
	@Input({ required: true }) name!: IconName;

	@Input() size: IconSize = 24;

	@Input() customClass: string = '';
}