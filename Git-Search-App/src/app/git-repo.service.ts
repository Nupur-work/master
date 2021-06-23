import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GitRepoService {

  serviceUrl = "https://api.github.com/search/repositories";

  constructor(private http:HttpClient) { }
  public searchText = "";
  public searchRepos = [];
  public perPage = 0;
  public start = 0; 


  getRepositories()       
  {
    let url =`${this.serviceUrl}?q=${this.searchText}&per_page=${this.perPage}`    
       
    let searchResult = this.http
      .get<any[]>(url)
      .pipe(
        debounceTime(500),
        map((data:any) => {
          if(data && data.items && data.items.length != 0) {
            return data.items as any[];
          }else{
            return [];
          }
        })
      );      
    searchResult.subscribe((result:any) => {this.searchRepos = result.map((a:any)=> {return a} )});
  }
}
