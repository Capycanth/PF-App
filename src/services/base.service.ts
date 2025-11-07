import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseObject, ObjectId } from '../../srcDB/model/dataModels';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'any' })
export abstract class BaseService<T extends DatabaseObject> {
	protected abstract endpoint: string;
	protected baseUrl: string = 'http://localhost:3000/api';

	constructor(protected http: HttpClient) { }

	getAll(): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
	}

	getById(id: ObjectId): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}

	getByIdList(ids: ObjectId[]): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}?ids=${ids.join(',')}`);
	}

	post(data: T): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data);
	}

	put(data: T): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${data.id}`, data);
	}

	delete(id: ObjectId): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}
}