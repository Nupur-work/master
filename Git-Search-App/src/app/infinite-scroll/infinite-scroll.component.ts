import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { GitRepoService } from '../git-repo.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
})

export class InfiniteScrollComponent implements OnInit, OnChanges {

  @Input() searchData = [];
  array = [];
  constructor(private getRepoService: GitRepoService) { }

  ngOnInit(): void {
    this.setArray(this.getRepoService.start);
  }

  ngOnChanges(): void {
    console.log("InfiniteScroll:", this.searchData);
  }
  onScrollDown() {

    this.getRepoService.perPage += 30;
    this.getRepoService.start = this.getRepoService.perPage;
    this.getRepoService.getRepositories();

  }

  setArray(index: number) {

    for (let i = index; i < this.getRepoService.perPage; ++i) {

      this.searchData[i] ? this.array.push(this.searchData[i]) : "";
      console.log(this.array);

    }
    this.array.push()
  }

}
