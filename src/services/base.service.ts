import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DatabaseObject, ObjectId } from '../../srcDB/model/dataModels';

@Injectable({ providedIn: 'any' })
export abstract class BaseService<T extends DatabaseObject> {
	protected abstract endpoint: string;
	protected baseUrl: string = 'http://localhost:3000/api';

	constructor(protected http: HttpClient) { }

	protected abstract deserialize(data: any): T;
	protected abstract deserializeMany(data: any[]): T[];

	public getAll(): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`).pipe(
			map(json => this.deserializeMany(json))
		);
	}

	public getById(id: ObjectId): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`).pipe(
			map(json => this.deserialize(json))
		);
	}

	public getByIdList(ids: ObjectId[]): Observable<T[]> {
		return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}?ids=${ids.join(',')}`).pipe(
			map(json => this.deserializeMany(json))
		);
	}

	public post(data: T): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data).pipe(
			map(json => this.deserialize(json))
		);
	}

	public put(data: T): Observable<T> {
		return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${data.id}`, data).pipe(
			map(json => this.deserialize(json))
		);
	}

	public delete(id: ObjectId): Observable<void> {
		return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
	}

	protected safeDeserializeMap(data: string): Map<any, any> {
		try {
			return new Map(JSON.parse(data));
		} catch {
			console.warn('Failed to deserialize map:', data);
			return new Map();
		}
	}

	protected safeDeserializeArray(data: string): any[] {
		try {
			return JSON.parse(data);
		} catch {
			console.warn('Failed to deserialize array:', data);
			return [];
		}
	}

	protected safeDeserializeNestedMap(data: string): Map<any, Map<any, any>> {
		try {
			const parsed = JSON.parse(data);
			const result = new Map<string, Map<string, any>>();
			for (const [key, value] of parsed) {
				result.set(key, new Map(value));
			}
			return result;
		} catch {
			console.warn('Failed to deserialize nested map:', data);
			return new Map<string, Map<string, any>>();
		}
	}
}