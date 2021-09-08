import { LightningElement,api,track,wire } from 'lwc';
import allProd from '@salesforce/apex/productData.allProd'
export default class OneYear extends LightningElement {
    @wire(allProd) allProd; 
    @api prod; 
    @track val =[];
    @api quantity;
    @api price;
    @api lstproduct=[];  
    @track isModalOpen = false;
      
    constructor() {
        super(); 
        this.template.addEventListener('dragover', this.handleDragOver.bind(this));
        this.template.addEventListener('drop', this.handleDrop.bind(this));        
      }
    handleDrop(event){   
        if(!this.val.includes(this.prod)){
            this.isModalOpen = true;
        }
    }

    closeModal() { 
        this.isModalOpen = false;
    }
    submitDetails(event) { 
        var option = this.prod; 
        this.val.push(option);  
        this.isModalOpen = false;
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="input1")
                this.quantity=element.value;

            else if(element.name=="input2")
                this.price=element.value;
        },this); 
        var i;
        var id;
        var prodList = this.allProd.data;
        for(i in prodList){ 
            if(this.prod.includes(prodList[i].Name)){ 
                id = prodList[i].Id;
                break;
            }
        }
        var option=
        {
            id:id,
            prodName:this.prod,
            quantity:this.quantity,
            price:this.price
        };
        this.lstproduct.push(option);
        console.log('----array-----:'+JSON.stringify(this.lstproduct)); 
        const evt = new CustomEvent('select', {
            detail: this.lstproduct
            });
            this.dispatchEvent(evt);
    }
    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();       
    } 
    remove(event){    
        var option = (event.currentTarget.id).substring(0,(event.currentTarget.id).length - 4); 
        console.log('option:'+option); 
        for( var i = 0; i < this.val.length; i++){
            if ( this.val[i] === option) {
                this.val.splice(i, 1); 
            }
         }
         console.log('--val after removing--:'+this.val);
        // Removing values from an array if remove button click 
        for( var i = 0; i < this.lstproduct.length; i++){
            if ( this.lstproduct[i].prodName === option) {
                this.lstproduct.splice(i, 1); 
            }
        }
        console.log('----array-----:'+JSON.stringify(this.lstproduct));
        const evt1 = new CustomEvent('select', {
            detail: this.lstproduct
            });
            this.dispatchEvent(evt1);
    } 
}