import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { UtilsHelper } from './utils';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [],
  exports: [],
})
export class HelpersModule {
  static forRoot(): ModuleWithProviders<HelpersModule> {
    return { ngModule: HelpersModule };
  }
}
