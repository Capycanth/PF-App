import { Injectable } from '@angular/core';
import { Prepaid } from '../../shared/model/prepaid.model';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class PrepaidService extends BaseService<Prepaid> {
	protected override endpoint: string = 'prepaid';
}