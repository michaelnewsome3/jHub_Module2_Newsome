import { Component} from '@angular/core';
import { PhotoService } from '../services/photo.service';
//import { ModalActiveMenuPage } from '../modal-active-menu/modal-active-menu.page';
//import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';  
import { PopoverActiveMenuPage } from '../popover-active-menu/popover-active-menu.page';  


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page 
{
//###############################################################################################################################
//constructor
//###############################################################################################################################
	constructor(public photoService: PhotoService/*, private modalController: ModalController*/, private popover:PopoverController) {}

//###############################################################################################################################
//navigate to page
//###############################################################################################################################
	ngOnInit()
	{
		if(this.photoService.claimsLoaded===false)
		{
			this.photoService.loadClaims();
		}
		
	}
//###############################################################################################################################
//show menu modal window 
//###############################################################################################################################	
	public async showMenu(claim: Claim)
	{
		const popoverElement= await this.popover.create(
			{
				component:PopoverActiveMenuPage,
				showBackdrop:true,
				componentProps:{
					claimData: claim
				}
			}
		);
		
		await popoverElement.present();
		
	}

//###############################################################################################################################
//Sort change
//###############################################################################################################################	
	public async sortChange()
	{
		this.photoService.sortActiveFunction();
	}	
	
}


//###############################################################################################################################
//Claim structure prototype
//###############################################################################################################################
interface Claim 
{
	filepath: string;
	webviewPath: string;
	base64?: string;
	date:number;
	archive:boolean;
	archive_date: number;
	amount: number;
	name: string;
	description?: string;
}