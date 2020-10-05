import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';
import { AlertController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal-archive-menu',
  templateUrl: './modal-archive-menu.page.html',
  styleUrls: ['./modal-archive-menu.page.scss'],
})
export class ModalArchiveMenuPage implements OnInit {

	private claimDataModal;
		
	constructor(private modalController: ModalController,private photoService: PhotoService,private alertController: AlertController, private modalController_second: ModalController) { }
	
	@Input() public claimData;
	
	ngOnInit() {}

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
		this.modalController.dismiss();
	}	
		
//###############################################################################################################################
//Un-Archive Claim
//###############################################################################################################################	
	async UnArchiveClaim()
	{
		const alert=await this.alertController.create(
		{
			header: "Confirm Un Archive",
			message: "Are you sure you want to un-archive " + this.claimData.name,
			buttons: [
				{
					text:"Yes",
					handler: ()=>{
						this.photoService.unarchiveClaim(this.claimData);
						this.modalController.dismiss();
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
						this.modalController.dismiss();
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
	async CloseModal()
	{
		await this.modalController.dismiss();
	}
}
