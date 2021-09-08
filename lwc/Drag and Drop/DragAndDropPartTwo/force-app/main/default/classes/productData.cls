public class productData { //Fetching data from object
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
    // Saving data to fields in opportunity object
    @AuraEnabled
    public static void oneYear(string prodName,id recordId) { 
        string prod = prodName;   
        List<opportunity> opList = New List<opportunity>();
        //System.debug('incoming prod Names:'+prod);
        //System.debug('incoming prod id:'+recordId);
        opportunity op = new opportunity(id=recordId);
        op.One_Year__c = prodName;
        opList.add(op);
         try{
            if(prodName!=null){
                update opList;
            }
        }
        catch(Exception e){
            System.debug('Exception occurs' + e);
        }
    }
    @AuraEnabled
    public static void twoYear(string prodName,id recordId) { 
        string prod = prodName;   
        List<opportunity> opList = New List<opportunity>();
        //System.debug('incoming prod Names:'+prod);
        //System.debug('incoming prod id:'+recordId);
        opportunity op = new opportunity(id=recordId);
        op.Two_Year__c = prodName;
        opList.add(op);
        //System.debug('opliost:'+opList);
        try{
            if(prodName!=null){
                update opList;
            }
        }
        catch(Exception e){
            System.debug('Exception occurs' + e);
        } 
    }
    @AuraEnabled
    public static void threeYear(string prodName,id recordId) { 
        string prod = prodName;   
        List<opportunity> opList = New List<opportunity>();
        //System.debug('incoming prod Names:'+prod);
        //System.debug('incoming prod id:'+recordId);
        opportunity op = new opportunity(id=recordId);
        op.Three_Year__c = prodName;
        opList.add(op);
        try{
            if(prodName!=null){
                update opList;
            }
        }
        catch(Exception e){
            System.debug('Exception occurs' + e);
        }
    }
}