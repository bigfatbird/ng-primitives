/**
 * Copyright © 2024 Angular Primitives.
 * https://github.com/ng-primitives/ng-primitives
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, computed, Directive, HostListener, input } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpCanDisable, NgpDisabledToken } from 'ng-primitives/internal';
import { injectPagination } from '../pagination/pagination.token';
import { NgpPaginationPreviousToken } from './pagination-previous.token';

@Directive({
  standalone: true,
  selector: '[ngpPaginationPrevious]',
  exportAs: 'ngpPaginationPrevious',
  providers: [
    { provide: NgpPaginationPreviousToken, useExisting: NgpPaginationPrevious },
    { provide: NgpDisabledToken, useExisting: NgpPaginationPrevious },
  ],
  hostDirectives: [NgpButton],
  host: {
    '[tabindex]': 'disabled() ? -1 : 0',
    '[attr.data-disabled]': 'disabled()',
    '[attr.data-first-page]': 'pagination.firstPage()',
  },
})
export class NgpPaginationPrevious implements NgpCanDisable {
  /**
   * Access the pagination directive.
   */
  protected readonly pagination = injectPagination();

  /**
   * Whether the button is disabled.
   */
  readonly buttonDisabled = input<boolean, BooleanInput>(false, {
    alias: 'ngpPaginationPreviousDisabled',
    transform: booleanAttribute,
  });

  /**
   * Whether the button is disabled.
   */
  readonly disabled = computed(
    () => this.buttonDisabled() || this.pagination.disabled() || this.pagination.firstPage(),
  );

  /**
   * Go to the previous page.
   */
  @HostListener('click')
  goToPreviousPage() {
    if (this.disabled()) {
      return;
    }

    this.pagination.page.set(this.pagination.page() - 1);
  }
}
