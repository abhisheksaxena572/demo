import { LightningElement,wire,api,track } from 'lwc';
import subList from '@salesforce/apex/productData.subList'
import serviceList from '@salesforce/apex/productData.serviceList'
import inventList from '@salesforce/apex/productData.inventList' 
import oneYear from '@salesforce/apex/productData.oneYear'
import twoYear from '@salesforce/apex/productData.twoYear'
import threeYear from '@salesforce/apex/productData.threeYear' 
import oli from '@salesforce/apex/productData.oli' 
export default class DragAndDrop2 extends LightningElement {
    @wire(subList) subList; 
    @wire(serviceList) serviceList; 
    @wire(inventList) inventList; 
    @api prodNames; 
    @track isModalOpen = false; 
    @api year1Data;
    @api year2Data;
    @api year3Data;
    @api recordId;
    @api listData;
    connectedCallback(){ 
        console.log("Record id from url:"+this.recordId); 
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
    handleProdSub(event){ 
        this.year1Data = event.detail;
        console.log('Products in year1:'+this.year1Data); 
    } 
    
    handleProdService(event){ 
        this.year2Data=event.detail;
        console.log('Products in year2:'+this.year2Data);
    }
    handleProdInvent(event){ 
        this.year3Data=event.detail;
        console.log('Products in year3:'+this.year3Data);
    }
    handleProdSub1(event){  
        this.listData=event.detail
        console.log('Products List:'+JSON.stringify(this.listData)); 
        //this.listData=JSON.stringify(this.listData); 
    } 
    saveProd(){  
        oli({ arr : this.listData, recordId : this.recordId}) 
        console.log('Data sent');
        // if(this.year1Data!=null && this.year1Data!=''){
        //     oneYear({ prodName : this.year1Data,recordId : this.recordId}) 
        //     oli({ arr : this.listData,recordId : this.recordId}) 
        // }
        // if(this.year2Data!=null && this.year2Data!=''){
        //     twoYear({ prodName : this.year2Data,recordId : this.recordId}) 
        // }
        // if(this.year3Data!=null && this.year3Data!=''){
        //     threeYear({ prodName : this.year3Data,recordId : this.recordId}) 
        // } 
        console.log('Data saved in fields')
        const closeQA = new CustomEvent('close');
        // Dispatches the event.
        this.dispatchEvent(closeQA);
        //location.reload();
    }
 } 