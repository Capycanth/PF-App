import { BaseService } from './base.service';
import { Category } from '../../srcDB/model/dataModels';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export class CategoryService extends BaseService<Category> {
	protected override endpoint: string = 'category';
}