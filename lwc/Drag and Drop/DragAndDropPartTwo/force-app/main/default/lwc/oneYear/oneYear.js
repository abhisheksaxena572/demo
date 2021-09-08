import { LightningElement,api,track } from 'lwc';

export default class OneYear extends LightningElement {
    @api prod;
    @track val =[];
    @track lstproduct=[];
    @track size='0';
    @track nam='';
    @track isModalOpen = false;
    @track quantity;
    @track price;
    @api numberFieldValue;
    constructor() {
        super(); 
        this.template.addEventListener('dragover', this.handleDragOver.bind(this));
        this.template.addEventListener('drop', this.handleDrop.bind(this));        
      }
      handleDrop(event){
        this.isModalOpen = true; 
        //console.log('inside handle drop child component:'+this.prod);  
        if(!this.val.includes(this.prod)){
            var option = this.prod; 
            this.val.push(option);
         
            //console.log('----array-----:'+this.val);

            this.nam=this.val.toString();
            console.log('string of an array:'+this.nam); 
            var dataone = this.nam;
            const evt = new CustomEvent('select', {
                detail: dataone
                });
                this.dispatchEvent(evt);
            console.log("After dispatching detail contain:--------"+detail+"---------");
            
        }
    }
    closeModal() { 
        this.isModalOpen = false;
    }
    submitDetails(event) { 
        this.isModalOpen = false;
        var inp=this.template.querySelectorAll("lightning-input");
        inp.forEach(function(element){
            if(element.name=="input1")
                this.quantity=element.value;

            else if(element.name=="input2")
                this.price=element.value;
        },this); 
        var option=
        {
            prodName:this.prod,
            quantity:this.quantity,
            price:this.price
        };
        this.lstproduct.push(option);
         console.log('----array-----:'+JSON.stringify(this.lstproduct));
        // console.log("------product name:"+this.prod)  
        // console.log("------quantity:"+this.quantity)  
        // console.log("------price:"+this.price)  
        const evt = new CustomEvent('selectlist', {
            detail: this.lstproduct
            });
            this.dispatchEvent(evt);
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
        this.size = this.val.length;
        this.nam=this.val.toString(); 
        console.log('After removing products string:'+ this.nam);
        var dataone = this.nam;
        const evt = new CustomEvent('select', {
            detail: dataone
             });
             this.dispatchEvent(evt);
    } 
}