import { Injectable } from '@angular/core';
import { Goal } from '../../srcDB/model/dataModels';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'any' })
export class GoalService extends BaseService<Goal> {
	protected override endpoint: string = 'goal';
}