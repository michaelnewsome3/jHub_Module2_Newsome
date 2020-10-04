import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

public tvar:boolean;

	constructor(public photoService: PhotoService) {
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
//Add a claim
//###############################################################################################################################
	addClaim()
	{
		this.photoService.addNewClaim();
	}
	
}