import { LightningElement,wire,api,track } from 'lwc';
import subList from '@salesforce/apex/productData.subList'
import serviceList from '@salesforce/apex/productData.serviceList'
import inventList from '@salesforce/apex/productData.inventList'  
import oli from '@salesforce/apex/productData.oli' 
export default class DragAndDrop2 extends LightningElement {
    @wire(subList) subList; 
    @wire(serviceList) serviceList; 
    @wire(inventList) inventList; 
    @api prodNames; 
    @track isModalOpen = false;  
    @api recordId;
    @api listData1;
    @api listData2;
    @api listData3;
    @api combine=[]; 
    connectedCallback(){    
        var url=window.location.href;
        var arr = url.split('/');
        this.recordId=arr[arr.length-2];
        console.log('after filteration:'+this.recordId); 
    }
    constructor() {
        super(); 
        this.template.addEventListener('dragover', this.handleDragOver.bind(this)); 
    }
    handleDragStart(event) {
        event.dataTransfer.dropEffect = 'move';
        this.prodNames = (event.currentTarget.id).substring(0,(event.currentTarget.id).length - 4);   
    }

    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();       
    }  
    handleYear1(event){  
        this.listData1=event.detail
        console.log('Products List array for one year:'+JSON.stringify(this.listData1)); 
        //this.listData1=JSON.stringify(this.listData1); 
    } 
    handleYear2(event){  
        this.listData2=event.detail
        console.log('Products List array for two year:'+JSON.stringify(this.listData2)); 
        //this.listData2=JSON.stringify(this.listData2); 
     } 
    handleYear3(event){  
        this.listData3=event.detail
        console.log('Products List array for three year:'+JSON.stringify(this.listData3)); 
        //this.listData3=JSON.stringify(this.listData3); 
    } 
    saveProd(){ 
        console.log('Data sent'); 
         
        if(this.listData1 != null && this.listData2 != null && this.listData3 != null){
            this.combine = this.listData1.concat(this.listData2).concat(this.listData3);
        }
        else if(this.listData1 == null && this.listData2 == null){
            this.combine = this.listData3;
        }
        else if(this.listData2 == null && this.listData3 == null){
            this.combine = this.listData1;
        }
        else if(this.listData1 == null && this.listData3 == null){
            this.combine = this.listData2;
        }
        else if(this.listData1 == null){
            this.combine = this.listData2.concat(this.listData3);
        }
        else if(this.listData2 == null){
            this.combine = this.listData1.concat(this.listData3);
        }
        else if(this.listData3 == null){
            this.combine = this.listData1.concat(this.listData2);
        }
        console.log('After concatenation year 1 year 2 year 3:'+JSON.stringify(this.combine));  
        oli({ arr : this.combine, recordId : this.recordId}) 
            
        console.log('Data saved in fields')
        const closeQA = new CustomEvent('close');
        //Dispatches the event.
        this.dispatchEvent(closeQA);
        location.reload();
    }
 } 