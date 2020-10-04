import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {

	@Input() public claim;
	
	public activeDate;
	public archiveDate;
	
	constructor(private modalController: ModalController,private photoService: PhotoService) { }

	ngOnInit() 
	{
		this.activeDate=new Date(this.claim.date);
		this.archiveDate=new Date(this.claim.archive_date);
	}
	
	
	
//###############################################################################################################################
//Close
//###############################################################################################################################
	async CloseModal()
	{
		await this.modalController.dismiss();
	}
	
}
