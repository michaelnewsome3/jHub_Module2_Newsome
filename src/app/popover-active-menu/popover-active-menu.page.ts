import {PopoverController} from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';
import { ModalInputPage } from '../modal-input/modal-input.page';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-popover-active-menu',
  templateUrl: './popover-active-menu.page.html',
  styleUrls: ['./popover-active-menu.page.scss'],
})
export class PopoverActiveMenuPage implements OnInit {

	private claimDataModal;
	
	constructor(private popover:PopoverController,private photoService: PhotoService,private alertController: AlertController, private modalController_second: ModalController) { }
	
	@Input() public claimData;
	
	ngOnInit() 
	{
	}
	
//###############################################################################################################################
//Claim info
//###############################################################################################################################	
	async InfoClaimModal()
	{
		//code for modal to enter name, amount and description of claim
		const modal=await this.modalController_second.create(
			{
				component: ModalInfoPage,
				componentProps:{
					claim: this.claimData
				}
			}
		);
		await modal.present();
		
	}
	
	//entry function
	async InfoClaim()
	{
		this.InfoClaimModal();
		this.popover.dismiss();
	}	
	
//###############################################################################################################################
//Edit Claim
//###############################################################################################################################	
	async EditClaimModal()
	{
		//code for modal to enter name, amount and description of claim
		const modal=await this.modalController_second.create(
			{
				component: ModalInputPage,
				componentProps:{
					name_in: this.claimData.name,
					amount_in: this.claimData.amount,
					description_in: this.claimData.description
				}
			}
		);
		await modal.present();
		await modal.onWillDismiss().then(dataReturned=>
			{
				this.claimDataModal= dataReturned.data;
			}
		)
		
		if(this.claimDataModal)
		{
			this.photoService.updateClaim(this.claimDataModal.name,this.claimDataModal.amount,this.claimDataModal.description,this.claimData);
		}
		
	}
	
	//entry function
	async EditClaim()
	{
		this.EditClaimModal();
		this.popover.dismiss();
	}
	
	
//###############################################################################################################################
//Archive Claim
//###############################################################################################################################	
	async ArchiveClaim()
	{
		const alert=await this.alertController.create(
		{
			header: "Confirm Archive",
			message: "Are you sure you want to archive " + this.claimData.name,
			buttons: [
				{
					text:"Yes",
					handler: ()=>{
						this.photoService.archiveClaim(this.claimData);
						this.popover.dismiss();
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
//Delete Claim
//###############################################################################################################################	
	async DeleteClaim()
	{
		const alert=await this.alertController.create(
		{
			header: "Confirm Delete",
			message: "Are you sure you want to delete " + this.claimData.name,
			buttons: [
				{
					text:"Yes",
					handler: ()=>{
						this.photoService.deleteClaim(this.claimData);
						this.popover.dismiss();
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
//Close without selecting menu
//###############################################################################################################################		
	ClosePopover()
	{
		this.popover.dismiss();
	}
}

