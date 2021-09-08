public class feedItemClass {
    @AuraEnabled
    public static List<Feeditem> getFeedItem(){
        Set<Id> feeditemIds = new Set<Id>();  
        Id userId = UserInfo.getUserId();  
        List<feedItem> feeds = New List<feedItem>();  
        
        for(feedComment fc : [Select id,commentbody,FeedItemId from feedComment where createdbyid =:userId]){  
            feeditemIds.add(fc.FeedItemId);  //Adding feedItem id (commented on other user question) 
        }   
      	feeds = [select id,parentId,title,body,likecount,HasVerifiedComment,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                 from feeditem where bestcommentid=null  and title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by createdDate desc ]; 
        return feeds;
    }
    @AuraEnabled
    public static List<Feeditem> filterFeed(string selectedValue, string filterVal){
        Set<Id> feeditemIds = new Set<Id>();  
        Id userId = UserInfo.getUserId();  
        List<feedItem> feeds = New List<feedItem>();  
        
        for(feedComment fc : [Select id,commentbody,FeedItemId from feedComment where createdbyid =:userId]){  
            feeditemIds.add(fc.FeedItemId);  //Adding feedItem id (commented on other user question) 
        } 
        System.debug('feeditem id commented:'+feeditemIds);
        
        
        //System.debug('selectedValue:'+selectedValue +'----'+ 'filterValue:'+filterVal); 
        if(selectedValue == 'All Questions'){
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid,LastModifiedDate  
                         from feeditem where  title!=null AND (createdbyid =: userId Or Id in : feeditemids)order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid,LastModifiedDate  
                         from feeditem where  title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid,LastModifiedDate 
                         from feeditem where title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,commentcount,bestcommentid,createddate 
                         from feeditem where   title!=null AND (createdbyid =: userId Or Id in : feeditemids) ]; 
            }
        } 
        if(selectedValue == 'Unanswered Questions'){
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate  
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND   title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate  
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND  title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate  
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND  title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,commentcount,createddate 
                         from feeditem where Id NOT IN(Select FeedItemId From FeedComment) AND  title!=null AND (createdbyid =: userId Or Id in : feeditemids)]; 
            }
        } 
        if(selectedValue == 'Questions With Best Answers'){ 
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid!=null and title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid!=null  and title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid!=null  and title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid 
                         from feeditem where bestcommentid!=null and title!=null AND (createdbyid =: userId Or Id in : feeditemids) ]; 
            }
        }
        if(selectedValue == 'Questions With No Best Answers'){
            if(filterVal == 'Latest Posts'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid=null AND  title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by createdDate desc]; 
            }
            else if(filterVal == 'Top Questions'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid  
                         from feeditem where bestcommentid=null AND title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else if(filterVal == 'Most Recent Activity'){
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,LastModifiedDate,bestcommentid 
                         from feeditem where bestcommentid=null AND   title!=null AND (createdbyid =: userId Or Id in : feeditemids) order by LastModifiedDate desc ]; 
            }
            else{
                feeds = [select id,parentId,title,body,HasVerifiedComment,likecount,CreatedBy.Name,createddate,commentcount,bestcommentid 
                         from feeditem where bestcommentid=null and title!=null AND (createdbyid =: userId Or Id in : feeditemids) ]; 
            } 
        } 
        return feeds;
    }
}