import { LightningElement,track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getFiles from '@salesforce/apex/filesChatterGroup.getFiles'; 
import getSeachResult from '@salesforce/apex/filesChatterGroup.filterResult';
export default class FilesSearch extends LightningElement {
    @api recordId     
    @track resultData 
    @track error
    @track files = []    
    @track contentId = []
    @track casesSpinner = false;

    @track page = 1; //this will initialize 1st page 
    @track startingRecord = 1; //start record position per page
    @track endingRecord = 0; //end record position per page
    @track pageSize = 2; //default value we are assigning
    @track totalRecountCount = 0; //total record count received from all retrieved records
    @track totalPage = 0; //total number of page is needed to display all records
    connectedCallback() { 
        getFiles({recordId : this.recordId})
        .then(result => { 
            this.resultData = result;    
            for(var i in this.resultData){ 
                var option=
                    { 
                        Title:this.resultData[i].ContentDocument.Title,
                        Description:this.resultData[i].ContentDocument.Description,
                        ContentSize:this.resultData[i].ContentDocument.ContentSize,
                        FileExtension:this.resultData[i].ContentDocument.FileExtension

                    };
                    this.files.push(option);
                    this.contentId.push(this.resultData[i].ContentDocumentId)
            }
            this.items = this.files;
            this.totalRecountCount = this.files.length;  
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            this.files = this.items.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;  
        })
        .catch(error => {
            this.error = error;
        });   
    }  
    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }
    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);            
        }             
    }
    displayRecordPerPage(page){ 
        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page); 
        this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                            ? this.totalRecountCount : this.endingRecord;  
        this.files = this.items.slice(this.startingRecord, this.endingRecord); 
        this.startingRecord = this.startingRecord + 1;
    } 
    handleClick(){ 
        this.files.splice(0, this.files.length)
        this.casesSpinner = true;
        console.log('files after filtertion---------:'+JSON.stringify(this.files)) 
        var filterbox = this.template.querySelector("lightning-input");
        console.log('entering values are here:'+filterbox.value)
        this.filterValue = filterbox.value;
        getSeachResult({filterVal : this.filterValue})
        .then(result => {  
            if(result.length !== 0){ 
                for(var i in result){  
                    if(this.contentId.includes(result[i].ContentDocumentId)){ 
                        var option=
                            {
                                Title:result[i].Title,
                                Description:result[i].Description,
                                ContentSize:result[i].ContentSize,
                                FileExtension:result[i].FileExtension
        
                            };
                            this.files.push(option);  
                    }
                    this.casesSpinner = false;
                }   
            } 
            else {
                this.casesSpinner = false;
                const evt = new ShowToastEvent({
                    title: 'Search Result',
                    message: 'No Data Found For Your Search Result',
                    variant: 'warning',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
           }
            this.items = this.files;
            this.totalRecountCount = this.files.length;  
            this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
            this.files = this.items.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize; 
        })
        .catch(error => {
            this.error = error;
        });   
    } 
}