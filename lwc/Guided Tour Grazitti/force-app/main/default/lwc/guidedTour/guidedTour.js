import { LightningElement, api } from 'lwc'; 
import isguest from '@salesforce/user/isGuest';  
import getTourDetails from '@salesforce/apex/GuidedTourService.getTourDetails'; 
export default class GuidedTour extends LightningElement {
    @api tourMap;
    @api pathName
    @api title
    @api bgTile; 
    @api bgStepNext
    @api textContent
    @api textStepNext
    @api pageName; 
    isguest = isguest; 
    constructor(){ 
        super()
        window.onload = function() {  
            this.pageName = document.title     
            getTourDetails({ isguest : isguest, pageName : this.pageName })
                .then(result => { 
                    this.tourMap = result;   
                    window.dispatchEvent(new CustomEvent("tourInitialization", {
                                        detail : {value : this.tourMap}                 
                                        }));
                })
                .catch(error => {
                    this.error = error;
                });  
        }
    }
    renderedCallback(){   
        if(this.bgTile == null || this.bgTile == ''){
            this.bgTile = 'teal'
        }
        window.dispatchEvent(new CustomEvent("tourColorVariants", {
            detail : {bgTile : this.bgTile, bgStepNext : this.bgStepNext, textContent : this.textContent, textStepNext : this.textStepNext  }                 
            }));  
    }
    
}