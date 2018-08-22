import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';


@Component({
  selector: 'app-generated-invoice',
  templateUrl: './generated-invoice.component.html',
  styleUrls: ['./generated-invoice.component.scss'],
  animations : fuseAnimations
})
export class GeneratedInvoiceComponent implements OnInit, OnDestroy
{
    invoice = {
    	from : {
    		title: 'LILLY 021 DOO NOVI SAD',
    		address: 'Mise Dimitrijevica 40A, 21000 Novi Sad',
    		PIB: '110570869',
    		MB: '21364096',
    		BA: '160-503215-42 Banca Intesa',
    		phone: '063/348-421',
    		email: 'nebojsa.bobic@lilly021.com'
    	}
    };



    constructor(
                private _fuseConfigService: FuseConfigService
    )
    {
                    // Configure the layout
                    this._fuseConfigService.config = {
                        layout: {
                            navbar : {
                                hidden: true
                            },
                            toolbar: {
                                hidden: true
                            },
                            footer : {
                                hidden: true
                            }
                        }
                    };
    }

    ngOnInit(): void
    {

    }

    ngOnDestroy(): void
    {

    }

    onPrint(){
    	window.print();

    }
}


