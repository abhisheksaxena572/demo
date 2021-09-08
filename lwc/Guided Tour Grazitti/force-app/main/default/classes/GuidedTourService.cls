/*
@description - This is a main class which is handling all the Guided Tour functionality.
@author Grazitti Interactive | Jan 2021
*/      
public class GuidedTourService {
/**
* @description - returns Guided Tour Steps via response 
* @params pageName  
* @params isguest (Boolean field tells us whether user is guest or not)
* @return Serialize Map  
*/ 
    @AuraEnabled
    public static String getTourDetails(Boolean isguest, String pageName) {    
        System.debug('isGuest:'+isGuest);
        System.debug('pageName:'+pageName);
        Map<Decimal, GuidedTourStep__c> stepMap = New Map<Decimal, GuidedTourStep__c>();
        Map<string, Object> tourMap = New Map<string, Object>();    
        if(String.isNotBlank(pageName)) {
        	List<GuidedTourPage__c> pgList = [Select Token__c, Name, SetTimeOut__c, isActive__c, 
                                         (Select id, order__c, Content__r.Description__c, Content__r.Name, Selector__r.Target__c, isActive__c, 
                                         Placement__c, ArrowOffset__c, XOffset__c, YOffset__c from GuidedTourSteps__r where isActive__c = True 
                                         order by order__c desc) from GuidedTourPage__c where name =: pageName  and isActive__c = True
                                         and isGuest__c =: isguest limit 1];
            
            tourMap.put('cookieName', (object)pgList[0].Token__c);
            tourMap.put('setTimeOut', (object)pgList[0].setTimeOut__c);  
            for(GuidedTourStep__c gt : pgList[0].GuidedTourSteps__r){
                stepMap.put(gt.Order__c, gt);  						  				// Tour step details are added into the Map   
            } 
            tourMap.put('tour', (object)stepMap);
        } 
        return String.valueOf(JSON.serialize(tourMap)); 
    } 
}