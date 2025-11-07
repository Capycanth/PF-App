import { BaseService } from './base.service';
import { Goal } from '../../srcDB/model/dataModels';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class GoalService extends BaseService<Goal> {
	protected override endpoint: string = 'goal';
}