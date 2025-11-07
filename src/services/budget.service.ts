import { BaseService } from './base.service';
import { Budget } from '../../srcDB/model/dataModels';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class BudgetService extends BaseService<Budget> {
	protected override endpoint: string = 'budget';
}