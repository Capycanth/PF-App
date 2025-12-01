import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DatabaseObject, ObjectId } from '../../srcDB/model/dataModels';

@Injectable({ providedIn: 'any' })
export abstract class BaseService<T extends DatabaseObject> {
	protected abstract endpoint: string;
	protected baseUrl: string = 'http://localhost:3000/api';

	constructor(protected http: HttpClient) { }

	public getAll(): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
	}

	public getById(id: ObjectId): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}

	public getByIdList(ids: ObjectId[]): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}?ids=${ids.join(',')}`);
	}

	public post(data: T): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data);
	}

	public put(data: T): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${data.id}`, data);
	}

	public delete(id: ObjectId): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}
}