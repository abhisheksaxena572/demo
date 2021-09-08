public class productData { //Fetching data from object
    @AuraEnabled(Cacheable=true) 
    public static List<Product2> allProd() {  
        List<Product2> allProd= New List<Product2>([select id,name,ProductCode from product2]);
        //System.debug('allProd:'+allProd); 
        return allProd;
    }
    @AuraEnabled(Cacheable=true) 
    public static List<Product2> subList() {  
        List<Product2> plist= New List<Product2>([select id,name,ProductCode from product2 where Family = 'Subscription']);
        //System.debug('plist:'+plist); 
        return plist;
    }
    
    @AuraEnabled(Cacheable=true) 
    public static List<Product2> serviceList() {
        List<Product2> plist= New List<Product2>([select id,name,ProductCode from product2 where Family = 'Service']);
        //System.debug('plist:'+plist);
        return plist;
    }
    @AuraEnabled(Cacheable=true) 
    public static List<Product2> inventList() {
        List<Product2> plist= New List<Product2>([select id,name,ProductCode from product2 where Family = 'Inventory']);
        //System.debug('plist:'+plist);
        return plist;
    }
    
    public class prodData{ 
        @AuraEnabled
        public String prodName {get;set;}
        @AuraEnabled
        public Integer quantity {get;set;}
        @AuraEnabled
        public Integer price {get;set;}
        @AuraEnabled
        public ID id {get;set;}
    }
    @AuraEnabled
    public static void oli(List<prodData> arr,id recordId) {
        System.debug('arr:'+arr);
        List<opportunitylineitem> oliList = New  List<opportunitylineitem>();
        List<id> proId = New List<id>();
        Map<id,id> proPbeMap = New Map<id,id>(); //Map for productid and pricebookentry
        for(prodData pr : arr){
            proId.add(pr.id);
        } 
        for(PricebookEntry pbe : [Select id,product2id from PricebookEntry]){
            if(proId.contains(pbe.product2id)){
                proPbeMap.put(pbe.product2id,pbe.id); 
            }
        }
        List<id>idProd= New List<id>();
        for(opportunityLineItem oliOldList : [ Select id,name,PricebookEntryId,product2id from opportunityLineItem where opportunityid =: recordId]){
            idProd.add(oliOldList.product2id);
        }
        List<id>incomingProdId = New List<id>();
        System.debug('Map for id s of product and pbe: '+proPbeMap);
        for(prodData pr : arr){
            if(proPbeMap.ContainsKey(pr.id)){
                if(!idProd.contains(pr.id) && !incomingProdId.contains(pr.id)){
                    opportunityLineItem oli = new opportunityLineItem(opportunityid = recordId);
                    oli.PricebookEntryId = proPbeMap.get(pr.id);
                    oli.Quantity = pr.quantity;
                    oli.UnitPrice = pr.price; 
                    incomingProdId.add(pr.id);
                    oliList.add(oli);
                }
            }
        }
        
        System.debug('oliList:'+oliList);
        try{
            if(!oliList.isEmpty()){ 
                insert oliList; 
            }
        }
        catch(Exception e){
            System.debug('Exception occurs' + e);
        }
    } 
}