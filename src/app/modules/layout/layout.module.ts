import {InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutConfig} from "./options.config";



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports:[HeaderComponent]
})
export class LayoutModule {

  static forRoot(options :LayoutConfig): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [{ provide: LayoutConfig, useValue: options }],
    };
  }

}
