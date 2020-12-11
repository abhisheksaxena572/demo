public class Hopscotch {
    @AuraEnabled
    public static List<HopscotchTour__c> getHopscotch(){ 
        List<HopscotchTour__c> hopList = [select content__c,HopscotchTarget__r.Position__c,HopscotchTarget__r.Name,Title__c,
                                                 HopscotchTarget__r.page__c 
                                                 from HopscotchTour__c 
                                                 order by HopscotchTarget__r.Steps__c ]; 
        return hopList;
        
    }
}