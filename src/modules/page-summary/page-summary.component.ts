import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';

import { SkyPageSummaryAdapterService } from './page-summary-adapter.service';
import { SkyMediaQueryListenerArgs, SkyMediaQueryService } from '../media-queries';

@Component({
  selector: 'sky-page-summary',
  templateUrl: './page-summary.component.html',
  styleUrls: ['./page-summary.component.scss'],
  providers: [SkyMediaQueryService, SkyPageSummaryAdapterService]
})
export class SkyPageSummaryComponent implements OnDestroy, AfterViewInit {
  constructor(
    private elRef: ElementRef,
    private adapter: SkyPageSummaryAdapterService,
    private mediaQueryService: SkyMediaQueryService
  ) { }

  public ngAfterViewInit() {
    this.mediaQueryService.init(
      SkyMediaQueryService.xs,
      (args: SkyMediaQueryListenerArgs) => {
        this.adapter.updateKeyInfoLocation(this.elRef, args.matches);
      }
    );

    this.adapter.updateKeyInfoLocation(this.elRef, this.mediaQueryService.matches);
  }

  public ngOnDestroy() {
    this.mediaQueryService.destroy();
  }
}
