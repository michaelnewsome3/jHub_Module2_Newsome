import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.page.html',
  styleUrls: ['./modal-input.page.scss'],
})
export class ModalInputPage implements OnInit {
	
	constructor(private modalController: ModalController, private toastController: ToastController) { }
	
  	@Input() private name_in;
	@Input() private amount_in;
	@Input() private description_in;

	private claimData ={
		name: "",
		amount: 0,
		description: ""
	};
	
	private amountstr:string;
		
	ngOnInit() {
		
		this.claimData.name=this.name_in;
		this.claimData.amount=this.amount_in;
		this.claimData.description=this.description_in;
		if(this.claimData.amount!=0)
		{
			this.amountstr=this.claimData.amount.toString();
		}
	}
//###############################################################################################################################
//Close without saving (X)
//###############################################################################################################################	
	async CloseModal()
	{
		await this.modalController.dismiss();
	}

//###############################################################################################################################
//Save Claim
//###############################################################################################################################
	async passData()
	{
		if(this.claimData.name=="" && this.amountstr=="")
		{
			this.presentToast("No name or amount");
		}
		else
		{
			if(this.claimData.name=="")
			{
				this.presentToast("No Name");
			}
			else
			{
				if(this.amountstr=="")
				{
					this.presentToast("No Amount");
				}
				else
				{
					this.claimData.amount=parseFloat(this.amountstr);
					await this.modalController.dismiss(this.claimData);
				}
			}
		}
	}
	
	
//###############################################################################################################################
//display toast
//###############################################################################################################################  
	private async presentToast(toastMessage: string) 
	{
	
		const toast = await this.toastController.create(
			{
				message: toastMessage,
				duration: 2000
			}
		);
		toast.present();
	}
	
}


