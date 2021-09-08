({
    doInit:function(component,event,helper){
        var action = component.get("c.getFeedItem"); 
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            var result = response.getReturnValue();
            if(state == "SUCCESS"){  
                component.set("v.showSuccess", response.getReturnValue()); 
                component.set("v.totalPages", Math.ceil(result.length/component.get("v.pageSize"))); 
                var pageNumber = component.get("v.currentPageNumber"); 
                var totalPages = component.get("v.totalPages"); 
                var allData = component.get("v.showSuccess"); 
                var pageSize = component.get("v.pageSize"); 
                var x = 0;
                var data = [];
                for(; x<(pageNumber)*pageSize; x++){
                    if(allData[x]){
                        data.push(allData[x]);
                    }
                }
                component.set("v.comments",data);
                var a=component.get("v.comments");
                console.log('aa',a);
                if(allData.length > (pageNumber)*pageSize){
                    component.set("v.hasNext",true);
                }else{
                    component.set("v.hasNext",false);
                }
            }
            else {
                console.log('There was a problem : ',response.getError());
            }
            var data = component.get("v.showSuccess"); 
            component.set("v.showSuccess",data);
            
        });
        $A.enqueueAction(action); 
    },
    filterChange: function (component, event, helper) {   
        var filter = component.find('filter').get('v.value');    
        //console.log('filter:'+filter); 
        var selectedMenuItemValue = event.getParam("value");   
        var old='';
        if(selectedMenuItemValue !='Top Questions' &&  selectedMenuItemValue !='Latest Posts' && selectedMenuItemValue !='Most Recent Activity'){
            var menuItems = component.find("menuItems");
            menuItems.forEach(function (menuItem) { 
                if (menuItem.get("v.checked")) { 
                    menuItem.set("v.checked", false);
                } 
                if (menuItem.get("v.value") === selectedMenuItemValue) {
                    menuItem.set("v.checked", true); 
                    old = menuItem.get('v.value');
                } 
            });
        }
        else{
            var menuItems = component.find("menuItems");
            menuItems.forEach(function (menuItem) { 
                if (menuItem.get("v.checked")) { 
                    old = menuItem.get('v.value');
                    menuItem.set("v.checked", true);
                }  
            });
        }
        //console.log('iconvalue:'+old)
        var action = component.get("c.filterFeed"); 
        action.setParams({"selectedValue": old,"filterVal":filter}); 
        action.setCallback(this, function(response) { 
            var state = response.getState();   
            var result = response.getReturnValue(); 
            //console.log('return value:'+JSON.stringify(result)) 
            if(state == "SUCCESS"){  
                component.set("v.showSuccess", response.getReturnValue()); 
                component.set("v.totalPages", Math.ceil(result.length/component.get("v.pageSize"))); 
                var pageNumber = component.get("v.currentPageNumber"); 
                var totalPages = component.get("v.totalPages"); 
                var allData = component.get("v.showSuccess"); 
                var pageSize = component.get("v.pageSize"); 
                var x = 0;
                var data = [];
                for(; x<(pageNumber)*pageSize; x++){
                    if(allData[x]){
                        data.push(allData[x]);
                    }
                }
                component.set("v.comments",data);
                var a=component.get("v.comments");
                console.log('aa',a);
                if(allData.length > (pageNumber)*pageSize){
                    component.set("v.hasNext",true);
                }else{
                    component.set("v.hasNext",false);
                }
            }
            else {
                console.log('There was a problem : ',response.getError());
            }
            var data = component.get("v.showSuccess"); 
            component.set("v.showSuccess",data);
            
        });
        $A.enqueueAction(action); 
    },
    nextPage : function(component, event, helper) { 
        var currentPage = component.get("v.currentPageNumber");
        var totalPages = component.get("v.totalPages");
        
        if(currentPage < totalPages){
            component.set("v.currentPageNumber",currentPage+1);
            var pageNumber = component.get("v.currentPageNumber");
            var totalPages = component.get("v.totalPages");
            var allData = component.get("v.showSuccess");
            var pageSize = component.get("v.pageSize");
            var x = 0;
            var data = [];
            for(; x<(pageNumber)*pageSize; x++){
                if(allData[x]){
                    data.push(allData[x]);
                }
            }
            component.set("v.comments",data);
            if(allData.length > (pageNumber)*pageSize){
                component.set("v.hasNext",true);
            }else{
                component.set("v.hasNext",false);
            }
        }
    },
    handleClick: function (component, event, helper){
        var id = event.target.getAttribute("data-recId") || event.target.parentNode.getAttribute("data-recId"); 
        var title = event.target.getAttribute("data-recId1") || event.target.parentNode.getAttribute("data-recId1"); 
        console.log('Selected question id = ' + id);  
        console.log('Selected title= ' + title);   
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({ "url": "question/"+id });   // Passing to standard component 
        urlEvent.fire();
    }
})