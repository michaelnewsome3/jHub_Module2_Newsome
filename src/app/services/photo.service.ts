import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
         CameraPhoto, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalInputPage } from '../modal-input/modal-input.page';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
	
	public claimsLoaded:boolean=false;
	public claims: Claim[] = [];
	public claimsActive: Claim[]=[];
	public claimsArchive: Claim[]=[];
	private CLAIM_STORAGE: string = "claims";
	private platform: Platform;
	private claimData: Claim;
	public claimExistsActive: Boolean;
	public claimExistsArchive:Boolean;
	public claimTotActive: number;
	public claimTotArchive: number;
	public sortActive: string;
	public sortArchive: string;
	
//###############################################################################################################################
//constructor
//###############################################################################################################################
	constructor(platform: Platform, public toastController: ToastController, private modalController: ModalController) 
	{	
		this.platform = platform;
	}
	
//###############################################################################################################################
////loads saved claims data (on app load only)
//############################################################################################################################### 
	public async loadClaims() 
	{	
		if(!this.claimsLoaded)
		{			
			// Retreve claims data
			const claimstemp = await Storage.get({ key: this.CLAIM_STORAGE });
			this.claims = JSON.parse(claimstemp.value) || [];
			//only for web environment (not mobile)
			if (!this.platform.is('hybrid')) {
				// Read claim photos into base64 format
				for (let claim of this.claims) {
					// Read each saved photo's data from the Filesystem
					const readFile = await Filesystem.readFile(
						{
							path: claim.filepath,
							directory: FilesystemDirectory.Data
						}
					);
			
					//For displaying on web platform only.
					claim.base64 = `data:image/jpeg;base64,${readFile.data}`;
				}
			}
			this.claimsLoaded=true;
			for (let claim of this.claims){
				if(claim.archive===true)
				{
					this.claimsArchive.unshift(claim);
				}
				else
				{
					this.claimsActive.unshift(claim);
				}
			}
			this.calculateClaimTotal();
			this.sortActive="sortActiveName";
			this.sortArchive="sortArchiveName";
			this.presentToast("Claims Loaded");
			
		}
		
	}
	
//###############################################################################################################################
//Calculate total value of active claims
//###############################################################################################################################  
	public async calculateClaimTotal()
	{
		this.claimExistsActive=false;
		this.claimExistsArchive=false;
		if(this.claims.length!=0)
		{
			this.claimTotActive=0;
			this.claimTotArchive=0;
			
			for (let claim of this.claims)
			{
				if(claim.archive===false)
				{
					this.claimExistsActive=true;
					this.claimTotActive=this.claimTotActive+claim.amount;
				}
				else
				{
					this.claimExistsArchive=true;
					this.claimTotArchive=this.claimTotArchive+claim.amount;
				}
			}
		}
	}

//###############################################################################################################################
//Delete claim
//###############################################################################################################################  
public async deleteClaim(claim: Claim) 
	{	
		var Carray:Claim[]=[];
		var dv:any;
		
		//delete file
		if(this.platform.is('hybrid'))
		{
			const retFile = await Filesystem.deleteFile({
			path: claim.filepath,
			//directory: FilesystemDirectory.Data
			});
			
		}
		else
		{
			const retFile = await Filesystem.deleteFile({
			path: claim.filepath,
			directory: FilesystemDirectory.Data
			});
		}
		//remove from claims array
		for(dv in this.claims)
		{
			if(this.claims[dv]!=claim)
			{
				Carray.push(this.claims[dv]);
			}
		}
		this.claims=Carray;
		Carray=[];
		if(claim.archive===true)
		{
			for(dv in this.claimsArchive)
			{
				if(this.claimsArchive[dv]!=claim)
				{
					Carray.push(this.claimsArchive[dv]);
				}
			}
			this.claimsArchive=Carray;
		}
		else
		{
			for(dv in this.claimsActive)
			{
				if(this.claimsActive[dv]!=claim)
				{
					Carray.push(this.claimsActive[dv]);
				}
			}
			this.claimsActive=Carray;
		}
		
		
		//save photo array 
		Storage.set({
			key: this.CLAIM_STORAGE,
			value: this.platform.is('hybrid')
			? JSON.stringify(this.claims)
			: JSON.stringify(this.claims.map(p => {
				// Don't save the base64 representation of the photo data,
				// since it's already saved on the Filesystem
				const claimCopy = { ...p };
				delete claimCopy.base64;
				return claimCopy;
			}))
		});
		this.calculateClaimTotal();
		this.sortActiveFunction();
		this.sortArchiveFunction();
		this.presentToast("Deleted");
	}	

//###############################################################################################################################
//Update array (post name change)
//###############################################################################################################################  
public async updateClaim(name:string,amount:number,description:string, claim:Claim) 
	{	
		var dv:any;
			//change status in claims array
			for(dv in this.claims)
			{
				if(this.claims[dv]==claim)
				{
					this.claims[dv].name=name;
					this.claims[dv].amount=amount;
					this.claims[dv].description=description;
					break;
				}
			}
			
			//change status in claims array
			for(dv in this.claimsActive)
			{
				if(this.claimsActive[dv]==claim)
				{
					this.claimsActive[dv].name=name;
					this.claimsActive[dv].amount=amount;
					this.claimsActive[dv].description=description;
					break;
				}
			}

		//save photo array 
		Storage.set({
			key: this.CLAIM_STORAGE,
			value: this.platform.is('hybrid')
			? JSON.stringify(this.claims)
			: JSON.stringify(this.claims.map(p => {
				// Don't save the base64 representation of the photo data,
				// since it's already saved on the Filesystem
				const claimCopy = { ...p };
				delete claimCopy.base64;
				return claimCopy;
			}))
		});
		this.sortActiveFunction();
		this.calculateClaimTotal();
		this.presentToast("Updated");
	}	

//###############################################################################################################################
//Archive claim
//###############################################################################################################################  
public async archiveClaim(claim: Claim) 
	{	
		
		var Carray:Claim[]=[];
		var dv:any;
		const archived=new Date().getTime();
		
		//remove the claim from the active array
		for(dv in this.claimsActive)
		{

			if(this.claimsActive[dv]!=claim)
			{
				Carray.push(this.claimsActive[dv]);
			}
		}
		this.claimsActive=Carray;
		
		//change status in claims array
		for(dv in this.claims)
		{
			if(this.claims[dv]==claim)
			{
				this.claims[dv].archive=true;
				this.claims[dv].archive_date=archived;
				break;
			}
		}
		
		//add the claim to the archive array
		claim.archive=true;
		claim.archive_date=archived;
		this.claimsArchive.unshift(claim);
		
		//save photo array 
		Storage.set({
			key: this.CLAIM_STORAGE,
			value: this.platform.is('hybrid')
			? JSON.stringify(this.claims)
			: JSON.stringify(this.claims.map(p => {
				// Don't save the base64 representation of the photo data,
				// since it's already saved on the Filesystem
				const claimCopy = { ...p };
				delete claimCopy.base64;
				return claimCopy;
			}))
		});
		this.sortActiveFunction();
		this.sortArchiveFunction();
		this.calculateClaimTotal();
		this.presentToast("Archived");
		
	}	
		
//###############################################################################################################################
//UnArchive claim
//###############################################################################################################################  
public async unarchiveClaim(claim: Claim) 
	{	
		var Carray:Claim[]=[];
		var dv:any;
		const archived=new Date().getTime();
		
		//remove the claim from the active array
		for(dv in this.claimsArchive)
		{
			if(this.claimsArchive[dv]!=claim)
			{
				Carray.push(this.claimsArchive[dv]);
			}
		}
		this.claimsArchive=Carray;
		
		//change status in claims array
		for(dv in this.claims)
		{
			if(this.claims[dv]==claim)
			{
				this.claims[dv].archive=false;
				this.claims[dv].archive_date=archived;
				break;
			}
		}
		
		//add the claim to the archive array
		claim.archive=false;
		claim.archive_date=archived;
		this.claimsActive.unshift(claim);
		
		//save photo array 
		Storage.set({
			key: this.CLAIM_STORAGE,
			value: this.platform.is('hybrid')
			? JSON.stringify(this.claims)
			: JSON.stringify(this.claims.map(p => {
				// Don't save the base64 representation of the photo data,
				// since it's already saved on the Filesystem
				const claimCopy = { ...p };
				delete claimCopy.base64;
				return claimCopy;
			}))
		});
		this.sortActiveFunction();
		this.sortArchiveFunction();
		this.calculateClaimTotal();
		this.presentToast("Un-Archived");
		
	}	
	
//###############################################################################################################################
//Add new claim
//###############################################################################################################################  
public async addNewClaim() 
	{
		
		// Take a photo
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Uri, 
			source: CameraSource.Camera, 
			height: 960,
			width: 720,
			quality: 90 
		});
		
		
		//code for modal to enter name, amount and description of claim
		const modal=await this.modalController.create(
			{
				component: ModalInputPage,
				componentProps:{
					name_in:"",
					amount_in:0,
					description_in:""
				}
			}
		);
		await modal.present();
		await modal.onWillDismiss().then(dataReturned=>
			{
				this.claimData= dataReturned.data;
			}
		)
		
		//save claim data
		if(this.claimData)
		{
			this.claimData.date=new Date().getTime();
			this.claimData.archive=false;
			
			// Save the picture and add it to photo collection
			const saveData=await this.savePicture(capturedPhoto);
			this.claimData.filepath =saveData.filepath 
			this.claimData.webviewPath=saveData.webviewPath;
			this.claims.unshift(this.claimData);
			
			//updates archive/active claim array
			if(this.claimData.archive)
			{
				this.claimsArchive.unshift(this.claimData);
			}
			else
			{
				this.claimsActive.unshift(this.claimData);
			}
			//saves claims array to storage
			Storage.set(
			{
				key: this.CLAIM_STORAGE,
				value: this.platform.is('hybrid')
					? JSON.stringify(this.claims) //mobile (not web) just save the array
					: JSON.stringify(this.claims.map(p => 	 //web only: strip out the base 64 string
						{
							const photoCopy = { ...p };
							delete photoCopy.base64;
							return photoCopy;
						}))
			});
			
			this.sortActiveFunction();
			this.calculateClaimTotal();
			this.presentToast("Claim Saved");
		}
	}  
  
//###############################################################################################################################
//Delete entire arvhive
//###############################################################################################################################  
public async deleteArchive() 
	{ 
		var Carray:Claim[]=[];
		var dv:any;
		//Cycle through files
		for(dv in this.claimsArchive)
		{
			if(this.claims[dv].archive===true)
			{
				//delete file
				if(this.platform.is('hybrid')) //mobile version
				{
					const retFile = await Filesystem.deleteFile(
					{
						path: this.claims[dv].filepath
					});
			
				}
				else //web version
				{
					const retFile = await Filesystem.deleteFile(
					{
						path: this.claims[dv].filepath,
						directory: FilesystemDirectory.Data
					});
				}
			}
			else
			{
				Carray.unshift(this.claims[dv]);
			}
		}
		
		this.claims=Carray;
		this.claimsArchive=[];
				
		//save photo array 
		Storage.set(
		{
			key: this.CLAIM_STORAGE,
			value: this.platform.is('hybrid')
			? JSON.stringify(this.claims)
			: JSON.stringify(this.claims.map(p => {
				// Don't save the base64 representation of the photo data,
				// since it's already saved on the Filesystem
				const photoCopy = { ...p };
				delete photoCopy.base64;
				return photoCopy;
			}))
		});
		this.calculateClaimTotal();
		this.presentToast("Archive Deleted");
	}

//###############################################################################################################################
//sort active array
//###############################################################################################################################  
	public async sortActiveFunction() 
	{
		if(this.sortActive=="sortActiveName")
		{
			this.claimsActive.sort(function(a, b){
				var x = a.name.toLowerCase();
				var y = b.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			});
		}
		else
		{
			this.claimsActive.sort(function(a, b){return a.date - b.date});
		}
	}

//###############################################################################################################################
//sort archive array
//###############################################################################################################################  
	public async sortArchiveFunction() 
	{
		if(this.sortArchive=="sortArchiveName")
		{
			this.claimsArchive.sort(function(a, b){
				var x = a.name.toLowerCase();
				var y = b.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			});
		}
		else
		{
			this.claimsArchive.sort(function(a, b){return a.date - b.date});
		}
	}	
//###############################################################################################################################
//display toast
//###############################################################################################################################  
	public async presentToast(toastMessage: string) 
	{
	
		const toast = await this.toastController.create(
			{
				message: toastMessage,
				duration: 1000
			}
		);
		toast.present();
	}

//###############################################################################################################################
//Saves jpeg image to file structure
//###############################################################################################################################
	private async savePicture(cameraPhoto: CameraPhoto) 
	{
		// Convert photo to base64 format, required by Filesystem API to save
		const base64Data = await this.readAsBase64(cameraPhoto);

		// Write the file to the data directory
		const fileName = new Date().getTime() + '.jpeg';
		const savedFile = await Filesystem.writeFile(
		{
			path: fileName,
			data: base64Data,
			directory: FilesystemDirectory.Data
		});
		
		//mobile (not web)
		if (this.platform.is('hybrid')) 
		{
			return {
				filepath: savedFile.uri,
				webviewPath: Capacitor.convertFileSrc(savedFile.uri) //required because capacitor works as http server so cannot handle just the file name
			};
		}
		//web: much easier as the photo is in memory
		else 
		{
			return {
				filepath: fileName,
				webviewPath: cameraPhoto.webPath
			};
		}
		
	} 
	
//###############################################################################################################################
//functions to produce Base64 strings. Used for displaying images on web view only from ionic documentation
//###############################################################################################################################  	
	private async readAsBase64(cameraPhoto: CameraPhoto) 
	{
		// Convert photo of claim to base64 format
		const response = await fetch(cameraPhoto.webPath!);
		const blob = await response.blob();

		return await this.convertBlobToBase64(blob) as string;  
	}

	convertBlobToBase64 = (blob: Blob) => 
		new Promise((resolve, reject) => 
			{
				const reader = new FileReader;
				reader.onerror = reject;
				reader.onload = () => 
				{
					resolve(reader.result);
				};
			reader.readAsDataURL(blob);
			}
		);
  
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
