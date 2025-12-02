import { Injectable } from '@angular/core';
import { Budget } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class BudgetService extends BaseService<Budget> {
	protected override endpoint: string = 'budget';
}