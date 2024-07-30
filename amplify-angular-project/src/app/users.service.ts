import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  END_POINT="https://4hsn7rcvorgybllolith2flw3m.appsync-api.eu-west-2.amazonaws.com/graphql";
  constructor(private httpClient : HttpClient) {

   }

   addUser(name : string, email : string,tenantId : string) : Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': `da2-n6ggnhgq3fftlo2yh6vr5orivq` // Replace with your actual token if needed
    });

    const body = {
      query: `
        mutation {
           createUser(input: {email: "${email}", name: "${name}",tenantId : "${tenantId}"}) {
              createdAt
              email
              id
              tenantId
            }
        }
      `,
      variables: {}
    };
    return this.httpClient.post<any>(this.END_POINT, body, { headers });
   }

   listUsers() : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': `da2-n6ggnhgq3fftlo2yh6vr5orivq` // Replace with your actual token if needed
    });

    const body = {
      query: `
        query {
          listUsers {
            nextToken
            items {
              name
              createdAt
              email
              id
              tenantId
            }
          }
        }
      `,
      variables: {}
    };

    return this.httpClient.post<any>(this.END_POINT, body, { headers });
   }

   deleteUser(id : string) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': `da2-n6ggnhgq3fftlo2yh6vr5orivq` // Replace with your actual token if needed
    });

    const body = {
      query: `
        mutation {
           deleteUser(input: {id : "${id}"}) {
              createdAt
              email
              id
              tenantId
            }
        }
      `,
      variables: {}
    };
    return this.httpClient.post<any>(this.END_POINT, body, { headers });
   }
}
