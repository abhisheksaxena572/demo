public class feedItemClass {
    @AuraEnabled
    public static List<Feeditem> getFeedItem(){
        Set<Id> feeditemIds = new Set<Id>();  
        Id userId = UserInfo.getUserId();  
        List<FeedItem> questions = [SELECT Id,title,createdById from FeedItem where title != null];  
        List<feedItem> feeds = New List<feedItem>();
        for(FeedItem fi : questions){ 
            if(fi.Createdbyid == userId){
                feeditemIds.add(fi.Id);
            } 
        } 
        List<FeedComment> feedcommentList = [Select id,commentbody,FeedItemId from feedComment where createdbyid =:userId AND FeedItemId NOT IN: feeditemIds];
        for(feedComment fc : feedcommentList){  
            if(!feeditemIds.contains(fc.FeedItemId)){
                feeditemIds.add(fc.FeedItemId); 
            }   
        }  
        
        feeds = [select id,parentId,title,body,likecount,HasVerifiedComment,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                 from feeditem where bestcommentid=null  and id=:feeditemIds order by createdDate desc ]; 
        return feeds;
    }
    @AuraEnabled
    public static List<Feeditem> filterFeed(string selectedValue, string filterVal){
        Set<Id> feeditemIds = new Set<Id>();  
        Id userId = UserInfo.getUserId();  
        List<FeedItem> questions = [SELECT Id,title,createdById from FeedItem where title != null];  
        List<feedItem> feeds = New List<feedItem>();
        for(FeedItem fi : questions){ 
            if(fi.Createdbyid == userId){
                feeditemIds.add(fi.Id);
            } 
        } 
        List<FeedComment> feedcommentList = [Select id,commentbody,FeedItemId from feedComment where createdbyid =:userId AND FeedItemId NOT IN: feeditemIds];
        for(feedComment fc : feedcommentList){  
            if(!feeditemIds.contains(fc.FeedItemId)){
                feeditemIds.add(fc.FeedItemId); 
            }   
        }     
        //System.debug('selectedValue:'+selectedValue +'----'+ 'filterValue:'+filterVal); 
        if(selectedValue == 'All Questions'){
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid,LastModifiedDate  
                         from feeditem where   id=:feeditemIds order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid,LastModifiedDate  
                         from feeditem where  id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid,LastModifiedDate 
                         from feeditem where  id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,commentcount,bestcommentid,createddate 
                         from feeditem where   id=:feeditemIds ]; 
            }
        } 
        if(selectedValue == 'Unanswered Questions'){
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate  
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND   id=:feeditemIds order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate  
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND   id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate  
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND  id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,commentcount,createddate 
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND  id=:feeditemIds]; 
            }
        } 
        if(selectedValue == 'Questions With Best Answers'){ 
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid!=null and id=:feeditemIds order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid!=null  and id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid!=null  and id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid 
                         from feeditem where bestcommentid!=null and id=:feeditemIds ]; 
            }
        }
        if(selectedValue == 'Questions With No Best Answers'){
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid=null AND  id=:feeditemIds order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid=null AND  id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid 
                         from feeditem where bestcommentid=null AND   id=:feeditemIds order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid 
                         from feeditem where bestcommentid=null and id=:feeditemIds ]; 
            } 
        } 
        return feeds;
    }
}