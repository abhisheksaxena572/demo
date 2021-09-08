import { LightningElement,api,track } from 'lwc';

export default class TwoYear extends LightningElement {
    @api prod;
    @track val =[]; 
    @track nam='';
    constructor() {
        super(); 
        this.template.addEventListener('dragover', this.handleDragOver.bind(this));
        this.template.addEventListener('drop', this.handleDrop.bind(this));        
      }
      handleDrop(event){
        //console.log('inside handle drop child component:'+this.prod);  
        if(!this.val.includes(this.prod)){
            var option = this.prod; 
            this.val.push(option);
         
            //console.log('----array-----:'+this.val);

            this.nam=this.val.toString();
            console.log('string of an array:'+this.nam);  
            var dataone = this.nam;
            const evt = new CustomEvent('press', {
                detail: dataone
                });
                this.dispatchEvent(evt);
            console.log("After dispatching detail contain:--------"+detail+"---------");
        }
    }
    handleDragOver(event){
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();       
    }
    handleDragStart1(event){ 
        //console.log('entering handles child:'); 
        var option = (event.currentTarget.id).substring(0,(event.currentTarget.id).length - 4);
        //console.log('entering handles child:'+ option);
        for( var i = 0; i < this.val.length; i++){
            if ( this.val[i] === option) {
                this.val.splice(i, 1); 
            }
         } 
        this.nam=this.val.toString(); 
        console.log('After removing products string:'+ this.nam);
        var dataone = this.nam;
        const evt = new CustomEvent('press', {
            detail: dataone
             });
             this.dispatchEvent(evt);
    }
   
}