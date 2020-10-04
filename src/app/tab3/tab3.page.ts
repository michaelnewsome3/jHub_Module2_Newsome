import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
//import { ModalArchiveMenuPage } from '../modal-archive-menu/modal-archive-menu.page';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
         CameraPhoto, CameraSource } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
//import { ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';  
import { PopoverArchiveMenuPage } from '../popover-archive-menu/popover-archive-menu.page';  
		 
const { Camera, Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

	private CLAIM_STORAGE: string = "claims";
	private platform:Platform;
	
	constructor(platform: Platform, private photoService: PhotoService,  private popover:PopoverController, private alertController: AlertController) 
	{
		this.platform = platform;
	}

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
				component:PopoverArchiveMenuPage,
				showBackdrop:true,
				componentProps:{
					claimData: claim
				}
				
			}
		);
		
		await popoverElement.present();
	}		

//###############################################################################################################################
//Delete all archive claims
//###############################################################################################################################	
	public async delAll()
	{
		
		const alert=await this.alertController.create(
		{
			header: "Confirm Delete",
			message: "Are you sure you want delete the entire archive (there is no going back)",
			buttons: [
				{
					text:"Yes",
					handler: ()=>{
						this.photoService.deleteArchive();
					}
				},		
				{	
					text: "No"
				}
			]
		}
		);
		await alert.present();
	}	
	
//###############################################################################################################################
//Sort change
//###############################################################################################################################	
	public async sortChange()
	{
		this.photoService.sortArchiveFunction();
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
