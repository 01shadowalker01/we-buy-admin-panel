import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

@Pipe({
  name: "persianCurrency"
})
export class PersianCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}
  transform(value: string, currencyCode: any = "IRR"): string {
    if (currencyCode == "IRR") {
      let tmp = this.currencyPipe.transform(value, currencyCode);
      // if (tmp.localeCompare("0 IRR")) {
      //   console.log(value);
      //   return "0";
      // }
      if (tmp) {
        return tmp.replace(currencyCode, "تومان");
      }
    } else {
      return this.currencyPipe.transform(value, currencyCode);
    }
  }
}
