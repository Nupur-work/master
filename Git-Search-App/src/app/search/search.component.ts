import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '@angular/router';
import { Observable } from 'rxjs';
import { GitRepoService } from '../git-repo.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  @Output() searcherChange: EventEmitter<string> = new EventEmitter();
  searchText = "";
  constructor(private getRepoService: GitRepoService) {
  }

  get searchRepos() {
    return this.getRepoService.searchRepos;
  }
  search($event: any) {

    if (this.searchText != '' || this.searchText.trim() != '') {
      this.getRepoService.searchText = this.searchText;
      this.getRepoService.getRepositories();
    } else {
      this.getRepoService.searchText = "";
      this.getRepoService.searchRepos = [];
    }

  }


}
