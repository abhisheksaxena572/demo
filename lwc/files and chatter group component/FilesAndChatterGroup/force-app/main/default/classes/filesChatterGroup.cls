public with sharing class filesChatterGroup {
    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLink> getFiles(string recordId){
        //System.debug('recordId:'+recordId);
        return [SELECT Id,LinkedEntityId, ContentDocumentId, ContentDocument.Title,ContentDocument.contentsize,ContentDocument.description,ContentDocument.fileextension 
                FROM ContentDocumentLink WHERE LinkedEntityId=:recordId];
    }
    @AuraEnabled(cacheable=true)
    public static  List<ContentVersion> filterResult(string filterVal){ 
        List <ContentVersion> cvList = New List<ContentVersion>(); 
        String searchQuery = 'FIND \'' + filterVal + '\' IN ALL FIELDS RETURNING  ContentVersion(Id,ContentDocumentId,Title,Description,contentSize,fileextension,textpreview)';
        List<List <sObject>> searchList = search.query(searchQuery); 
        cvList  = ((List<ContentVersion>)searchList[0]); 
        return cvList;
    }
}